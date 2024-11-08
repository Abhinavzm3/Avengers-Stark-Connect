import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo-no-background.svg";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/lib/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 bg-opacity-80 p-5 shadow-lg sticky h-16 z-50 ">
     
     <Link to='/'><div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" className="h-20 w-20" />
        <span className="text-white text-lg font-semibold">
          S.T.A.R.K Connect
        </span>
      </div></Link>
      

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex font-medium items-center gap-5">
        {user && user.role === "recruiter" ? (
          <>
            <li>
              <Link to="/admin/companies">
                <Button variant="link">Companies</Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/jobs">
                <Button variant="link">Jobs</Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">
                <Button variant="link">Home</Button>
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <Button variant="link">Jobs</Button>
              </Link>
            </li>
            <li>
              <Link to="/browse">
                <Button variant="link">Browse</Button>
              </Link>
            </li>
            <li>
              <Link to="/blog">
                <Button variant="link">Blogs</Button>
              </Link>
            </li>
            <li>
              <Link to="/our-team">
                <Button variant="link">Our Team</Button>
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* User Avatar (Visible on all screen sizes) */}
      <div className="flex items-center gap-4">
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer md:ml-4">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 translate-y-1">
              <div className="flex gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-gray-300 my-2">
                {user && user.role === "student" && (
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="outline">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Link to="/login" className="hidden md:block">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup" className="hidden md:block">
              <Button>SignUp</Button>
            </Link>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="text-white h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-3/4 bg-gray-900 text-white shadow-lg p-4 flex flex-col gap-4 md:hidden">
          <ul className="flex flex-col items-start gap-3">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/browse" onClick={() => setIsMobileMenuOpen(false)}>
                Browse
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/our-team" onClick={() => setIsMobileMenuOpen(false)}>
                Our Team
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3 mt-4">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button>SignUp</Button>
                </Link>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
