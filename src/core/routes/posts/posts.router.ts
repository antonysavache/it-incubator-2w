import {Router} from "express";
import {SETTINGS} from "../../../settings";
import {authMiddleware} from "../../../shared/middlewares/auth.middleware";
import {handleValidationErrors} from "../../../shared/middlewares/error-handler.middleware";
import {postsController} from "./posts.controller";
import {postsValidation} from "./posts-validation.middleware";


export const postsRouter = Router({});

postsRouter.get(SETTINGS.PATH.ROOT, postsController.getPosts);
postsRouter.post(SETTINGS.PATH.ROOT, postsValidation, authMiddleware, handleValidationErrors, postsController.createPost);
// postsRouter.get(SETTINGS.PATH.ROOT_ENTITY, blogsController.getBlog);
// postsRouter.put(SETTINGS.PATH.ROOT_ENTITY, blogsValidation, authMiddleware, handleValidationErrors, blogsController.updateBlog)
// postsRouter.delete(SETTINGS.PATH.ROOT_ENTITY, authMiddleware, blogsController.deleteBlog)