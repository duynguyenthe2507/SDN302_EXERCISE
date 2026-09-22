const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const articleRouter = express.Router();
const dataPath = path.join(__dirname, "..", "data.json");

async function readData() {
  const fileContent = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(fileContent);
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

articleRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await readData();
      return res.status(200).json(data.articles);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, content, author, date } = req.body;
      if (!title || !content || !author || !date) {
        return res.status(400).json({
          message: "title, content, author and date are required",
        });
      }

      const data = await readData();
      const newId = data.articles.reduce(
        (maxId, article) => Math.max(maxId, Number(article.id) || 0),
        0
      ) + 1;
      const newArticle = { id: newId, title, content, author, date };

      data.articles.push(newArticle);
      await writeData(data);
      return res.status(201).json(newArticle);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .put((req, res) => {
    return res.status(403).json({ message: "PUT operation not supported on /articles" });
  })
  .delete((req, res) => {
    return res.status(403).json({ message: "DELETE operation not supported on /articles" });
  });

articleRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await readData();
      const article = data.articles.find((item) => item.id === id);

      if (!article) return res.status(404).json({ message: "Article not found" });
      return res.status(200).json(article);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { title, content, author, date } = req.body;

      if (title === undefined && content === undefined && author === undefined && date === undefined) {
        return res.status(400).json({
          message: "Provide at least one field: title, content, author or date",
        });
      }

      const data = await readData();
      const article = data.articles.find((item) => item.id === id);
      if (!article) return res.status(404).json({ message: "Article not found" });

      if (title !== undefined) article.title = title;
      if (content !== undefined) article.content = content;
      if (author !== undefined) article.author = author;
      if (date !== undefined) article.date = date;

      await writeData(data);
      return res.status(200).json(article);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await readData();
      const articleIndex = data.articles.findIndex((item) => item.id === id);

      if (articleIndex === -1) {
        return res.status(404).json({ message: "Article not found" });
      }

      const deletedArticle = data.articles.splice(articleIndex, 1)[0];
      data.comments = data.comments.filter((comment) => comment.articleId !== id);

      await writeData(data);
      return res.status(200).json({
        message: "Article deleted successfully",
        article: deletedArticle,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  })
  .post((req, res) => {
    return res.status(403).json({
      message: `POST operation not supported on /articles/${req.params.id}`,
    });
  });

module.exports = articleRouter;
