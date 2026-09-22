const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const commentRouter = express.Router();
const dataPath = path.join(__dirname, "..", "data.json");

async function readData() {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(fileContent);
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

commentRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await readData();
      return res.status(200).json(data.comments);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { articleId, author, content, date } = req.body;
      if (!articleId || !author || !content || !date) {
        return res.status(400).json({
          message: "articleId, author, content and date are required",
        });
      }

      const data = await readData();
      const articleExists = data.articles.some(
        (article) => article.id === Number(articleId)
      );
      if (!articleExists) {
        return res.status(404).json({ message: "Article not found" });
      }

      const newId = data.comments.reduce(
        (maxId, comment) => Math.max(maxId, Number(comment.id) || 0),
        0
      ) + 1;
      const newComment = {
        id: newId,
        articleId: Number(articleId),
        author,
        content,
        date,
      };

      data.comments.push(newComment);
      await writeData(data);
      return res.status(201).json(newComment);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .put((req, res) => {
    return res.status(403).json({ message: "PUT operation not supported on /comments" });
  })
  .delete((req, res) => {
    return res.status(403).json({ message: "DELETE operation not supported on /comments" });
  });

commentRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await readData();
      const comment = data.comments.find((item) => item.id === id);

      if (!comment) return res.status(404).json({ message: "Comment not found" });
      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { articleId, author, content, date } = req.body;
      if (articleId === undefined && author === undefined && content === undefined && date === undefined) {
        return res.status(400).json({
          message: "Provide at least one field: articleId, author, content or date",
        });
      }

      const data = await readData();
      const comment = data.comments.find((item) => item.id === id);
      if (!comment) return res.status(404).json({ message: "Comment not found" });

      if (articleId !== undefined) {
        const articleExists = data.articles.some(
          (article) => article.id === Number(articleId)
        );
        if (!articleExists) return res.status(404).json({ message: "Article not found" });
        comment.articleId = Number(articleId);
      }
      if (author !== undefined) comment.author = author;
      if (content !== undefined) comment.content = content;
      if (date !== undefined) comment.date = date;

      await writeData(data);
      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await readData();
      const commentIndex = data.comments.findIndex((item) => item.id === id);

      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const deletedComment = data.comments.splice(commentIndex, 1)[0];
      await writeData(data);
      return res.status(200).json({
        message: "Comment deleted successfully",
        comment: deletedComment,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .post((req, res) => {
    return res.status(403).json({
      message: `POST operation not supported on /comments/${req.params.id}`,
    });
  });

module.exports = commentRouter;
