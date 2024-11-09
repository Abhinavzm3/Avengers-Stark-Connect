import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/lib/utils/constant";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // get token from URL parameters

  const submitHandler = async (e) => {
    e.preventDefault(); // prevent page refresh on form submission

    if (!password) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/reset/${token}`, {newPassword:
        password,
      });

      if (res.data.success) {
        toast.success("New Password Set Successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Reset Password</h1>

        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter New Password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPass;
