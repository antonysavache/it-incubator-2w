import request from 'supertest';
import {app} from "../src/app";
import {SETTINGS} from "../src/settings";

describe('testing DELETE /testing/all-data', ()=> {
    it('should clear all data and return 204 status', () => {
        return request(app)
            .delete(SETTINGS.PATH.TESTING_DELETE)
            .expect(204);
    });
});