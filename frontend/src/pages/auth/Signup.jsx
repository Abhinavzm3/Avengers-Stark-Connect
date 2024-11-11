import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_API_END_POINT } from "@/lib/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { RadioGroup } from "@radix-ui/react-radio-group";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector(store => store.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">SignUp</h1>
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={input.fullname}
            name="fullname"
            onChange={handleChange}
            placeholder="Spooder-Man"
          />
        </div>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={handleChange}
            placeholder="Spooderman@gmail.com"
          />
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            pattern="^\d{10}$"
            placeholder="10 digits Mobile No..."
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={handleChange}
            placeholder="Spooderman@123"
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role.toLowerCase() === "student"}
                onChange={handleChange}
                className="cursor-pointer h-5 w-5"
              />
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role.toLowerCase() === "recruiter"}
                onChange={handleChange}
                className="cursor-pointer h-5 w-5"
              />
              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>
        {loading ? (
          <Button>
            {" "}
            <Loader2 className="mr-2 h-4 w-full animate-spin" />
            Thoda rukna...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            SignUp
          </Button>
        )}
        <div className="text-sm">
          Already have an Account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
