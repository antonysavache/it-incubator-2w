import {postsRepository} from "./posts.repo";
import {blogsRepository} from "../blogs/blogs.repo";
import {postsValidation} from "./posts-validation.middleware";

export const postsController = {
    getPosts(req, res) {
        res.status(200).json(postsRepository.findAllPosts());
    },

    createPost(req, res) {
        const {title, shortDescription, content, blogId} = req.body

        const blog = blogsRepository.findBlogById(blogId)
        if (!blog) {
            return res.status(400).json({
                errorMessages: [{
                    message: "Blog not found",
                    field: "blogId"
                }]
            })
        }

        const newPost = postsRepository.createPost(
            title,
            shortDescription,
            content,
            blogId,
            blog.name
        )

        res.status(201).json(newPost)
    },
}