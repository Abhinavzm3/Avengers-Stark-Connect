import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

//adding bookmark
export const AddBookMark = async (req, res) => {
  const { jobId, userId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { "bookMark.job": jobId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({
        message: "user not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "job added to book mark",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "bookmark not added",
    });
  }
};

//remoing bookmark

export const RemoveBookMark = async (req, res) => {
  const { jobId, userId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { "bookMark.job": jobId } },
      { new: true }
    ).populate({path:"bookMark.job",
        model:"Job" , populate:{path:"company", model:"Company" }});

    if (!updatedUser) {
      return res.status(500).send({
        message: "user not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "job removed from book mark",
      success: true,
      data:updatedUser.bookMark.job
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "bookmark not removed",
    });
  }
};








export const GetAllBookMark = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate({
      path: "bookMark.job",
      model: "Job", 
      populate: { path: "company", model: "Company" }, 
    });

    if (!user) {
      return res.status(500).send({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Fetched bookmarked jobs",
      data: user.bookMark.job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching bookmarks",
    });
  }
};
