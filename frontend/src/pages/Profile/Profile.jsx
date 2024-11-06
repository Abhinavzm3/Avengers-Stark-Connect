import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import BookMarkList from "./bookmarkList";

// const skills = ["HTML", "CSS", "JavaScript", "ReactJS"];
const isResume = true;
const Profile = () => {

  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.auth);
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-[#040108] border border-gray-600 rounded-2xl my-5 p-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname} </h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button variant="outline" className="text-right" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email} </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber} </span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {
            user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-700 w-full hocer:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-black rounded-2xl">
        <h1 className="font-bold m-4 p-4 text-lg my-5">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable  />
        <BookMarkList></BookMarkList>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
