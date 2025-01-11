import express from "express";
import {SETTINGS} from "./settings";
import {testingRouter} from "./core/routes/testing/testing.router";

export const app = express();
app.use(express.json());

app.use(SETTINGS.PATH.TESTING, testingRouter)