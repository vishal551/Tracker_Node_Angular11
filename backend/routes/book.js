var express = require("express");
const BookController = require("../controllers/BookController");
const roles = require("../helpers/roles");
const authorize = require("../middlewares/jwt");

var router = express.Router();

router.get("/", authorize(roles.Company), BookController.bookList);
router.get("/:id", authorize(roles.Company), BookController.bookDetail);
router.post("/", BookController.bookStore);
router.put("/:id", BookController.bookUpdate);
router.delete("/:id", BookController.bookDelete);

module.exports = router;
