const { QueryTypes } = require("sequelize");
const db = require("../models");

const Blog = db.ecosystem_media_blogs;

const createBlog = async (req, res) => {
  try {
    const field = req.body;

    const title = field.title;
    const published_date = field.published_date;
    const image = field.image;
    const blog = field.blog;
    const author = field.author;
    const category_id = field.category_id;

    const newBlog = await Blog.create({
      title,
      published_date,
      blog,
      author,
      image,
      category_id,
    });

    if (newBlog) {
      return res
        .status(201)
        .json({ success: true, message: "Blog created", data: newBlog });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Could not create blog." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    if (blogs) {
      return res
        .status(200)
        .json({ success: true, message: "list of blogs..", data: blogs });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Could not get list of blogs." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const field = req.body;
    const title = field.title;
    const published_date = field.published_date;
    const image = field.image;
    const blog = field.blog;
    const author = field.author;
    const category = field.category;

    const oldBlog = await Blog.findOne({ where: { id } });

    if (oldBlog) {
      const response = await oldBlog.update({
        title: title || oldBlog.title,
        published_date: published_date || oldBlog.published_date,
        image: image || oldBlog.image,
        blog: blog || oldBlog.blog,
        author: author || oldBlog.author,
        category: category || oldBlog.category,
      });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Blog updated.",
          data: oldBlog,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Could not update blog." });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "blog with specified ID not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ where: { id } });

    if (blog) {
      const response = await Blog.destroy({ where: { id } });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Blog deleted.",
        });
      } else {
        return res
          .status(400)
          .json({ success: true, message: "Could not delete blog." });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Blog with specified ID not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({ where: { id }, include: ["category"] });

    if (blog) {
      return res
        .status(200)
        .json({ success: true, message: "Blog details", data: blog });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Blog with specified ID not found." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
};
