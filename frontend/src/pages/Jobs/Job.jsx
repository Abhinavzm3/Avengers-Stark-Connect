import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BOOK_MARK_END_POINT } from "@/lib/utils/constant";
import { useSelector } from "react-redux";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // Bookmark handler
  const bookmarkHandler = async () => {
    try {
      const response = await axios.post(`${BOOK_MARK_END_POINT}/add`, {
        userId: user._id,
        jobId: job._id,
      });
      
      if (response.status === 200) {
        setIsBookmarked(true); // Mark as bookmarked
        console.log("Job successfully bookmarked!");
      }
    } catch (error) {
      console.error("Failed to bookmark the job", error);
    }
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-[#070310] border border-[#085765]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-300">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icons" onClick={bookmarkHandler}>
          <Bookmark className={isBookmarked ? "text-yellow-500" : ""} />
        </Button>
      </div>

      <div className="flex items-center gap-8 my-2">
        <Avatar className="h-20 w-20 rounded-full">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-400">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-400">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-[#FFD700] font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#FF6347] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#DA70D6] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button className="bg-[#FFD700]" onClick={bookmarkHandler}>
          {isBookmarked ? "Bookmarked" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
