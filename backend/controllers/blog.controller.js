import {Blog} from '../models/blog.model.js'
// add new blog


export const createPost = async (req, res) => {
    try {
        const { title, content, authorId, tags, categories } = req.body;

        if (!title || !content || !authorId) {
            return res.status(400).json({ message: 'Title, content, and authorId are required.' });
        }

        
        const post = new Blog({
            title,
            content,
            authorId,
            tags: tags || [],  
            categories: categories || [],  
            createdAt: new Date(),  
        });

        const savedPost = await post.save();

        res.status(201).json({ message: 'Post created successfully', data: savedPost, success:true });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
};





// deleteblog
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body; 

        const post = await BlogPost.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

       
        if (post.authorId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await BlogPost.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
};

//like karo na plz....
export const like = async (req, res) => {
    const { id } = req.params;  
    const { like,userId} = req.body;   
  
    try {
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).send({ success: false, message: "Blog post not found" });
      }
  
      if (like) {
        if (!blog.likedBy.includes(userId)) {
          blog.likes += 1;  
          blog.likedBy.push(userId);
        }
      } else {
        if (blog.likedBy.includes(userId)) {
          blog.likes -= 1; 
          blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId.toString()); 
        }
      }
  
      await blog.save();
      res.send({ success: true, likes: blog.likes });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Server error" });
    }
  };
  
//update blog

export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, title, content, tags, categories } = req.body;

        const post = await BlogPost.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to updte' });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = tags;
        if (categories) post.categories = categories;

        const updatedPost = await post.save();

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ' error occurred  in updating post' });
    }
};

// get all blog
export const getAllPost= async(req,res)=>{


    try {

        const blogs= await Blog.find({}).sort({createdAt:-1})

        if(!blogs) {

            return res.status(500).send({
                message:"No post Yet!",
                success:false
            })

        }


        return res.status(200).send({
            message:"Post Fetched Successfully",
            data:blogs,
            success:true,

        })
        
    } catch (error) {

        console.log(error)
        
    }


}

import {User} from '../models/user.model.js'
//get blog by id
export const getPostbyId=async (req,res)=>{

const {id}=req.params

try {

    const blog=await Blog.findOne({_id:id})

    const author=await User.findOne({_id:blog.authorId})

    
    if(!blog) {

        return res.status(500).send({
            message:"blog not exist",
            success:false
        })

    }


    return res.status(200).send({
        message:"blog Fetched Successfully",
        data:blog,
        author:author.fullname,
        success:true,

    })

    
} catch (error) {

    console.log(error)
    
}



}