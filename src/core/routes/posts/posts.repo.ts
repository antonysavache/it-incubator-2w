export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export class PostsRepository {
    private posts: PostType[] = []

    createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): PostType {
        const newPost: PostType = {
            id: (+new Date()).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt: new Date().toISOString()
        }
        this.posts.push(newPost)
        return newPost
    }

    findAllPosts(): PostType[] {
        return this.posts
    }

    findPostById(id: string): PostType | null {
        const post = this.posts.find(post => post.id === id)
        return post || null
    }

    findPostsByBlogId(blogId: string): PostType[] {
        return this.posts.filter(post => post.blogId === blogId)
    }

    updatePost(id: string, title: string, shortDescription: string, content: string): boolean {
        const post = this.posts.find(p => p.id === id)
        if (!post) return false

        post.title = title
        post.shortDescription = shortDescription
        post.content = content

        return true
    }

    deletePost(id: string): boolean {
        const postIndex = this.posts.findIndex(p => p.id === id)
        if (postIndex === -1) return false

        this.posts.splice(postIndex, 1)
        return true
    }

    clearAll(): void {
        this.posts = []
    }
}

export const postsRepository = new PostsRepository()