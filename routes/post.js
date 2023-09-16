require("dotenv").config();

const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");

router.post("/", verifyToken, async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(404).send("Text is required");
      return;
    }

    post = await Post.create({ text: req.body.text });
    res.status(200).send({ post: post });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send({ post: posts });
  } catch (error) {
    console.error(error);
  }
});
    
module.exports = router;
