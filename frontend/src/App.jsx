import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home/Home";
import AppLayout from "./layout/app-layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Jobs from "./pages/Jobs/Jobs";
import OurTeam from "./pages/OurTeam";
import Browse from "./pages/Browse/Browse";
import Profile from "./pages/Profile/Profile";
import JobDescription from "./pages/Jobs/JobDescription";
import Companies from "./pages/admin/Companies";
import CompanyCreate from "./pages/admin/CompanyCreate";
import CompanySetup from "./pages/admin/CompanySetup";
import AdminJobs from "./pages/admin/AdminJobs";
import PostJob from "./pages/admin/PostJob";
import Applicants from "./pages/admin/Applicants";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import Error404 from './pages/Error'
import  Blogs from "./pages/blog/Blogs";
import BlogDetail from "./pages/blog/BlogDetail";
import CreateBlogPost from "./pages/blog/CreateBlog";
import TrendingBlogs from "./pages/blog/Trendings.blog";
import Forgot_Password from "./pages/auth/forgot-password";
import ResetPass from "./pages/auth/resetPassword";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <Forgot_Password />,
      },
      {
        path: "/reset/:token",
        element: <ResetPass />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/description/:id",
        element: <JobDescription />,
      },
      {
        path: "/our-team",
        element: <OurTeam />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      //blog
      {
        path: "/blog",
        element: <Blogs/>,
      },
      {
        path: "/blogdetail/:id",
        element: <BlogDetail/>,
      },
    

      {
        path: "blog/trending",
        element: <TrendingBlogs/>,
      },
      {
        path: "/blog/upload",
        element: <CreateBlogPost/>,
      },

     
      {
        path: "*",
        element: <Error404 />,
      },

      // admins ke liye yaha se start hoga 

      {
        path: "/admin/companies",
        element: <ProtectedRoute><Companies /></ProtectedRoute>,
      },
      {
        path: "/admin/companies/create",
        element: <CompanyCreate />,
      },
      {
        path: "/admin/companies/:id",
        element: <CompanySetup />,
      },
      {
        path: "/admin/jobs",
        element: <AdminJobs />,
      },
      {
        path: "/admin/jobs/create",
        element: <PostJob />,
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <Applicants />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
