export const postsMock = {
    correct: {
        title: "Test Post",
        shortDescription: "Test Description",
        content: "Test Content",
        blogId: ""
    },
    incorrectTitle: {
        title: "a".repeat(31),
        shortDescription: "Test Description",
        content: "Test Content",
        blogId: "any"
    },
    incorrectDescription: {
        title: "Test Post",
        shortDescription: "a".repeat(101),
        content: "Test Content",
        blogId: "any"
    },
    incorrectContent: {
        title: "Test Post",
        shortDescription: "Test Description",
        content: "a".repeat(1001),
        blogId: "any"
    },
    nonexistentBlogId: {
        title: "Test Post",
        shortDescription: "Test Description",
        content: "Test Content",
        blogId: "nonexistentId"
    },
    allFieldsEmpty: {
        title: "",
        shortDescription: "",
        content: "",
        blogId: ""
    }
}