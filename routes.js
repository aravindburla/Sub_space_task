import express from "express";
const router = express.Router();
import * as blogController from "./controllers.js"

router
    .route("/blog-stats")
    .get(blogController.getBlogStats)


router
    .route("/blog-search")
    .get(blogController.search)



export default router;