import {Router} from "express";
import {db} from "../../../shared/db/db";
import {SETTINGS} from "../../../settings";

export const testingRouter = Router({});

export const testingController = {
    deleteAll(req, res) {
        db.posts = [];
        db.videos = [];
        res.status(204).send();
    }
}

testingRouter.delete(SETTINGS.PATH.ALL_DATA, testingController.deleteAll)