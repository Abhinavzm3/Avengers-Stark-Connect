import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/lib/utils/constant";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Forgot_Password = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter a valid email.");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email:email });
console.log(email)
      if (res.data.success) {
        toast.success("Email sent successfully for password reset.");
        navigate('/login');
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    }
     catch (error) {
      toast.error("Error sending reset email. Please try again later.");
      console.log(error);
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
        <h1 className="font-bold text-xl mb-5">Forgot Password</h1>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Spooderman@gmail.com"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Send Reset Email"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Forgot_Password;
