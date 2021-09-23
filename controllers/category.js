const { QueryTypes } = require("sequelize");
const db = require("../models");

const Category = db.ecosystem_media_category;

const createCategory = async (req, res) => {
  try {
    const field = req.body;
    const name = field.name;

    const newCategory = await Category.create({
      name,
    });

    if (newCategory) {
      return res
        .status(201)
        .json({
          success: true,
          message: "Category created",
          data: newCategory,
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Could not create Category." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const Categorys = await Category.findAll();

    if (Categorys) {
      return res
        .status(200)
        .json({
          success: true,
          message: "list of Categorys..",
          data: Categorys,
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Could not get list of Categorys." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await Category.findOne({ where: { id } });

    if (Category) {
      const response = await Category.destroy({ where: { id } });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Category deleted.",
        });
      } else {
        return res
          .status(400)
          .json({ success: true, message: "Could not delete Category." });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Category with specified ID not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await Category.findOne({ where: { id } });

    if (Category) {
      return res
        .status(200)
        .json({ success: true, message: "Category details", data: Category });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Category with specified ID not found.",
        });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
};
