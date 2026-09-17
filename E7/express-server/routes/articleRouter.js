const express = require("express");
const articleRouter = express.Router();
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));
articleRouter
  .route("/")
  .get(async (req, res) => {
    try {
      res.status(200).end("Will send all the articles to you!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  // POST a new article
  .post(async (req, res) => {
    try {
      res
        .status(201)
        .json(
          "Will add the article: " +
            req.body.title +
            " with details: " +
            req.body.text +
            " and " +
            req.body.date,
        );
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  // PUT a new article
  .put(async (req, res) => {
    try {
      res.status(403).json("PUT operation not supported on /articles");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  // DELETE all articles
  .delete(async (req, res) => {
    try {
      res.status(200).json("Deleting all articles");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

articleRouter
  .route("/:id")
  // GET a specific article
  .get(async (req, res) => {
    try {
      res
        .status(200)
        .end("Will send details of the article: " + req.params.id + " to you!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  // POST a specific article
  .post(async (req, res) => {
    try {
      res
        .status(403)
        .end("POST operation not supported on /articles/" + req.params.id);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  // PUT a new article
  .put(async (req, res) => {
    try {
      res.write("Updating the article: " + req.params.id + "\n");

      res
        .status(201)
        .end("Will update the article: " + req.body.title + " with details: ");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  // DELETE an article
  .delete(async (req, res) => {
    try {
      res.status(200).end("Deleting article: " + req.params.id);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = articleRouter;
