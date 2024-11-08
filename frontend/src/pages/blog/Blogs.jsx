import { BLOG_END_POINT } from "@/lib/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Blogs = () => {
    
      
      const navigate=useNavigate()

        const [BlogData,setBlogData]=useState([])


        useEffect(()=>{

            const fetchblogs=async()=>{


                try {

                    const res=await axios(`${BLOG_END_POINT}/get`)
console.log(res.data.data)

setBlogData(res.data.data)
                    
                } catch (error) {
                    
                    console.log(error)
                }
            }

            fetchblogs();
        

        },[])


if(!BlogData[0]) return (<p className="text-center text-2xl flex mt-32 justify-center ">Loading....</p>)

    return (
        <div className="min-h-screen  text-white px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white tracking-wide">
                    Blog Posts
                </h1>
                <div  className="mt-4 mb-6  bg-cyan-800/30  rounded-lg">
                <ul className="flex flex-row p-2 justify-center  gap-32">
                <li>
                            <button
                                className="text-cyan-400 hover:text-cyan-400 transition-colors duration-200 font-semibold"
                                onClick={() => navigate('/blog')}
                            >
                                Latest
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-cyan-400 hover:text-cyan-400 transition-colors duration-200 font-semibold"
                                onClick={() => navigate('/blog/trending')}
                            >
                                Trending
                            </button>
                        </li>
                        <li>
                            <button
                                className="text-cyan-400 hover:text-cyan-400 transition-colors duration-200 font-semibold"
                                onClick={() => navigate('/blog/upload')}
                            >
                                Upload Your's Blogs
                            </button>
                        </li>


            </ul>
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    Explore the latest insights, tips, and stories.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {BlogData.map((blog, index) => (
                    <div key={index} className="bg-gray-800/60 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ">
                        <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>
                        <p className="text-gray-400 text-sm mb-4">
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <p className="text-gray-300 mb-4">
                            {blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-cyan-400 border-lg text-sm font-semibold">{blog.tags.join(", ")}</span>
                            <button className="text-sm text-black bg-yellow-500 hover:bg-yellow-800 px-3 py-1 rounded-full">
                                <Link to={`/blogdetail/${blog._id}`}>                                Read More
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Blogs;
