const router = require("express").Router();
// const Project = require('../models/Project');

router.get("/", async (_req, res) => {
  try {
    res.status(200).json({ message: "Tudo funcionando" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
