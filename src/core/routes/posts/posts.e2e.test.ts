import request from "supertest";
import {app} from "../../../app";
import {SETTINGS} from "../../../settings";
import {blogsMock, getBasicAuthHeader} from "../blogs/blogs.mock";
import {postsMock} from "./posts.mock";

describe('posts testing', () => {
    let createdBlog: any = null

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204)

        const createBlogResponse = await request(app)
            .post(SETTINGS.PATH.BLOGS)
            .set('Authorization', getBasicAuthHeader())
            .send(blogsMock.correct)
            .expect(201)

        createdBlog = createBlogResponse.body
        postsMock.correct.blogId = createdBlog.id
    })

    describe('GET /posts', ()=> {
        describe('20*', () => {
            it('should return all posts', async () => {
                await request(app)
                    .get(SETTINGS.PATH.POSTS)
                    .expect(200)
                    .expect(res => {
                        expect(res.body).toEqual([])
                    })
            });
        })
    })

    describe('POST /posts', () => {
        describe('20*', () => {
            it('should create post with correct data', async () => {
                const response = await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send(postsMock.correct)
                    .expect(201)

                expect(response.body).toEqual({
                    id: expect.any(String),
                    title: postsMock.correct.title,
                    shortDescription: postsMock.correct.shortDescription,
                    content: postsMock.correct.content,
                    blogId: createdBlog.id,
                    blogName: createdBlog.name,
                    createdAt: expect.any(String)
                })
            })
        })

        describe('40*', () => {
            it('should return 400 with empty fields', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send(postsMock.allFieldsEmpty)
                    .expect(400)
                    .expect(res => {
                        expect(res.body).toEqual({
                            errorMessages: expect.arrayContaining([
                                {
                                    message: expect.any(String),
                                    field: "title"
                                },
                                {
                                    message: expect.any(String),
                                    field: "shortDescription"
                                },
                                {
                                    message: expect.any(String),
                                    field: "content"
                                },
                                {
                                    message: expect.any(String),
                                    field: "blogId"
                                }
                            ])
                        })
                    })
            })

            it('should return 400 with too long title', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send(postsMock.incorrectTitle)
                    .expect(400)
                    .expect(res => {
                        expect(res.body).toEqual({
                            errorMessages: [{
                                message: expect.any(String),
                                field: "title"
                            }]
                        })
                    })
            })

            it('should return 400 with too long description', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send(postsMock.incorrectDescription)
                    .expect(400)
                    .expect(res => {
                        expect(res.body).toEqual({
                            errorMessages: [{
                                message: expect.any(String),
                                field: "shortDescription"
                            }]
                        })
                    })
            })

            it('should return 400 with too long content', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send(postsMock.incorrectContent)
                    .expect(400)
                    .expect(res => {
                        expect(res.body).toEqual({
                            errorMessages: [{
                                message: expect.any(String),
                                field: "content"
                            }]
                        })
                    })
            })

            it('should return 400 with non-existent blogId', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .set('Authorization', getBasicAuthHeader())
                    .send({...postsMock.correct, blogId: "nonexistentId"})
                    .expect(400)
                    .expect(res => {
                        expect(res.body).toEqual({
                            errorMessages: [{
                                message: expect.any(String),
                                field: "blogId"
                            }]
                        })
                    })
            })

            it('should return 401 without authorization', async () => {
                await request(app)
                    .post(SETTINGS.PATH.POSTS)
                    .send(postsMock.correct)
                    .expect(401)
            })
        })
    })
})