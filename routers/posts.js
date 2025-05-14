const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const postsController = require("../controllers/postsController");

// INDEX

router.get("", postsController.index);

// SHOW

router.get("/:id", postsController.show);

// STORE

router.post("", postsController.store);

// UPDATE

router.put("/:id", postsController.update);

// MODIFY

router.patch("/:id", postsController.modify);

// DESTROY

router.delete("/:id", postsController.destroy);

// EXPORTING

module.exports = router;
