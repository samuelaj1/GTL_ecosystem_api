const { Router } = require("express");
const router = Router();
const blogsControllers = require("../controllers/blogs");
const categoryControllers = require("../controllers/category");

router.get("/", (req, res) => res.send("Getting started..."));

//blogs
router.post("/create-blog", blogsControllers.createBlog);
router.get("/blogs", blogsControllers.getAllBlogs);
router.get("/blog/:id", blogsControllers.getBlogById);
router.put("/blogs/:id", blogsControllers.updateBlog);
router.delete("/blogs/:id", blogsControllers.deleteBlog);

//category
router.post("/category", categoryControllers.createCategory);
router.get("/category", categoryControllers.getAllCategories);
router.get("/category/:id", categoryControllers.getCategoryById);
router.delete("/category/:id", categoryControllers.deleteCategory);

module.exports = router;
