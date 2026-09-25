const express = require("express");
const router = express.Router();
const data = require("../data.json");

router.get("/", (req, res) => {
  try {
    res.status(200).json(data.comments);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const comment = data.comments.find(
      (item) => item.id === Number(req.params.id),
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const { articleId, author, content, date } = req.body;

    if (!articleId || !author || !content || !date) {
      return res
        .status(400)
        .json({ message: "Missing required comment fields" });
    }

    const articleExists = data.articles.some(
      (article) => article.id === Number(articleId),
    );
    if (!articleExists) {
      return res
        .status(404)
        .json({ message: "Article not found for this comment" });
    }

    const id = data.comments.length
      ? data.comments[data.comments.length - 1].id + 1
      : 1;
    const newComment = {
      id,
      articleId: Number(articleId),
      author,
      content,
      date,
    };

    data.comments.push(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const commentIndex = data.comments.findIndex((c) => c.id === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const { articleId, author, content, date } = req.body;
    data.comments[commentIndex] = {
      id: commentId,
      articleId: Number(articleId),
      author,
      content,
      date,
    };

    res.status(200).json(data.comments[commentIndex]);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const commentIndex = data.comments.findIndex((c) => c.id === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const deletedComment = data.comments.splice(commentIndex, 1);
    res.status(200).json(deletedComment[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
