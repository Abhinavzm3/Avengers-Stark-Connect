import { BLOG_END_POINT } from "@/lib/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const UpdateBlogPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [categories, setCategories] = useState("");
    const {user} = useSelector(store=>store.auth);

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
            
        } catch (error) {
            console.error("Backend error response:", error.response.data); // Logs more error details
            
        }
        // setTitle("");
        // setContent("");
        // setTags("");
        // setCategories("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
            <div className="w-full max-w-lg lg:max-w-3xl bg-gray-800/50 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-center">
                    <div className="space-y-4 flex flex-col items-center lg:items-start w-full lg:w-1/2">
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="title" className="block text-gray-400 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="tags" className="block text-gray-400 mb-1">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="Enter tags (comma-separated)"
                            />
                        </div>
                        <div className="w-full text-center lg:text-left">
                            <label htmlFor="categories" className="block text-gray-400 mb-1">
                                Categories
                            </label>
                            <input
                                type="text"
                                id="categories"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="Enter categories (comma-separated)"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                        <label htmlFor="content" className="block text-gray-400 mb-1 text-center lg:text-left">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 h-[200px] md:h-[300px] lg:h-[400px] bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-purple-500 text-white"
                            placeholder="Write your post content here..."
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full lg:w-auto mt-4 py-2 bg-green-500 text-black rounded-sm font-semibold hover:bg-green-800"
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlogPost;
