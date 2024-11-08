import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access URL parameters
import axios from "axios"; // Assuming you use axios to make API requests
import { BLOG_END_POINT } from "@/lib/utils/constant";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
const BlogDetail = () => {
  const {user} = useSelector(store=>store.auth);

  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState("");
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0); // Initial likes state

  const { id } = useParams();

  useEffect(() => {
    const BlogPost = async () => {
      try {
        const response = await axios.get(`${BLOG_END_POINT}/${id}`);
        setBlog(response.data.data);
        setAuthor(response.data.author);
        setLikes(response.data.data.likes); 
        setLike(response.data.data.likedByUser); 
      } catch (error) {
        console.error("Error fetching the blog post:", error);
      }
    };

    BlogPost();
  }, [id]);

  const LikeHandler = async () => {
    try {
      const response = await axios.post(
        `${BLOG_END_POINT}/liked/${id}`,
        { like: !like,userId:user._id },  // Toggle like state
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setLike(!like); 
        setLikes(response.data.likes); 
      }
    } catch (error) {
      console.error("Error liking the blog post:", error);
    }
  };

  if (!blog) return <p className="text-3xl text-center mt-[300px]">Loading...</p>;

  return (
    <div className="min-h-screen w-auto text-white px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-sm mt-4">
          Posted on:{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <section className="bg-gray-800/60 p-6 m-12 w-auto rounded-lg shadow-lg">
        <p className="text-gray-300 mb-4 flex ">{author}:  <button
            onClick={LikeHandler}
            className={`text-sm text-black ml-auto ${like ? 'bg-red-600 hover:bg-white' : 'bg-white hover:bg-red-600'} px-3 py-1 rounded-full`}
          >
            <Heart /> {likes}
          </button></p>
        <p className="text-gray-300 mb-4  "  style={{ whiteSpace: "pre-wrap" }}>{blog.content}</p>

        <div className="flex justify-between items-center mt-8">
          <span className="text-cyan-500 text-sm font-semibold">
            Tags: {blog.tags.join(", ")}
          </span>
         
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
