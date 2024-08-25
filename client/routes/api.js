const express = require("express");
const request = require("request");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");

// @route   GET /api/current_user
// @desc    Get current logged in user
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

// @route   GET /api/resume
// @desc    Get user's resume
router.get("/resume", (req, res) => {
  if (req.user) {
    res.send(req.user.resume);
  } else {
    res.status(401).send("Unauthorized");
  }
});

// @route   POST /api/update_resume
// @desc    Update user's resume with new data
router.post("/update_resume", (req, res) => {
  if (req.user) {
    User.findById(req.user.id, (err, user) => {
      if (err) return res.status(500).send(err);
      user.resume = req.body;
      user.save((err) => {
        if (err) return res.status(500).send(err);
        res.send(user.resume);
      });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});
// routes/api.js (continued)
const {
  fetchCodeChefData,
  fetchHackerRankData,
  fetchGitHubData,
  fetchLinkedInData,
} = require("../utils/fetchData");

router.post("/update_resume", async (req, res) => {
  if (req.user) {
    const { codechef, hackerrank, github, linkedin } = req.body;

    try {
      const codechefData = await fetchCodeChefData(codechef);
      const hackerrankData = await fetchHackerRankData(hackerrank);
      const githubData = await fetchGitHubData(github);
      const linkedinData = await fetchLinkedInData(linkedin);

      User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send(err);
        user.resume = {
          ...user.resume,
          codechef: codechefData,
          hackerrank: hackerrankData,
          github: githubData,
          linkedin: linkedinData,
        };
        user.save((err) => {
          if (err) return res.status(500).send(err);
          res.send(user.resume);
        });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
