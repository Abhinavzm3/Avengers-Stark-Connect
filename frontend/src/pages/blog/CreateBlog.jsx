import { BLOG_END_POINT } from "@/lib/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBlogPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [categories, setCategories] = useState("");
    const {user} = useSelector(store=>store.auth);
const navigate=useNavigate()
    const handleSubmit =async (e) => {
        e.preventDefault();

        const newPost = { title, content,authorId:user._id, tags: tags.split(","), categories: categories.split(",") };
        
        console.log("Blog post created:", newPost);


        try {

            const res=await axios.post(`${BLOG_END_POINT}/create`,{ title, content,authorId:user._id, tags:tags.split(","), categories: categories.split(",") },{
                headers: {
                    'Content-Type':'application/json' 
                },
                withCredentials: true
            })
            console.log(res.data.data)
        if(res.data.success){   navigate('/blog')
            toast.success(res.data.message);}
             

            else{
                toast.error(res.data.message);

            }    
        
            
        } catch (error) {

            console.error("Backend error response:", error.response.data); // Logs more error details
            
        }
        // setTitle("");
        // setContent("");
        // setTags("");
        // setCategories("");
    };

    if(!user) return (<p className="text-center text-2xl flex mt-32 justify-center ">Signup/Login Please ....</p>)
        return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12"  >
            <div className="w-full max-w-lg lg:max-w-3xl bg-gray-800/70 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-center">
                    <div className="space-y-4 flex flex-col items-center  lg:items-start w-full lg:w-1/2">
                    <h1 className="text-center text-3xl text-cyan-400 "> Blog... </h1>
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="title" className="block text-cyan-400 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-gray-900 text-cyan-400"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="tags" className="block text-cyan-400 mb-1">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-gray-900 text-cyan-400"
                                placeholder="Enter tags (comma-separated)"
                            />
                        </div>
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="categories" className="block text-cyan-400 mb-1">
                                Categories
                            </label>
                            <input
                                type="text"
                                id="categories"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-gray-900 text-cyan-400"
                                placeholder="Enter categories (comma-separated)"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                        <label htmlFor="content" className="block text-cyan-400 mb-1 text-center lg:text-left">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 h-[200px] md:h-[300px] lg:h-[400px] bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-gray-900 text-cyan-400"
                            placeholder="Write your post content here..."
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full  lg:w-auto mt-4 py-2 bg-gray-600 text-white rounded-lg  font-semibold hover:bg-gray-800"
                           
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPost;
