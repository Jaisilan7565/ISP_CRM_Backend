"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategory = exports.saveCategory = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const category_model_1 = require("../model/category.model");
var activity = "Category";
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create category
 */
let saveCategory = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const categoryData = req.body;
            const createCategory = new category_model_1.Category(categoryData);
            let insertCategory = await createCategory.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Create-Category', true, 200, insertCategory, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Category', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Category', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveCategory = saveCategory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all  category
 */
let getAllCategory = async (req, res, next) => {
    try {
        const category = await category_model_1.Category.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-Category', true, 200, category, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Category', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllCategory = getAllCategory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single category
 */
let getSingleCategory = async (req, res, next) => {
    try {
        const category = await category_model_1.Category.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Single-Category', true, 200, category, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Single-Category', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleCategory = getSingleCategory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create category
 */
let updateCategory = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const categoryData = req.body;
            const updateCategory = await category_model_1.Category.findOneAndUpdate({ _id: req.query._id }, {
                $set: {
                    category: req.body.category,
                    description: req.body.description,
                    modifiedOn: new Date(),
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Category', true, 200, updateCategory, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Category', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Category', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateCategory = updateCategory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create category
 */
let deleteCategory = async (req, res, next) => {
    try {
        const deleteCategory = await category_model_1.Category.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Category', true, 200, deleteCategory, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Category', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map