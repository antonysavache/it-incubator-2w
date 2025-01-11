import {blogsRepository} from "../blogs/blogs.repo";

export const testingController = {
    deleteAll(req, res) {
        blogsRepository.clearAll();
        res.status(204).send();
    }
}