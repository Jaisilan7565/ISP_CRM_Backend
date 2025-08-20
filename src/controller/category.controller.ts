import { express } from "express";
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Category, CategoryDocument } from "../model/category.model";
import * as TokenManager from "../utils/tokenManager";

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

export let saveCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const categoryData: CategoryDocument = req.body;
            const createCategory = new Category(categoryData);
            let insertCategory = await createCategory.save();
            response(req, res, activity, 'Level-2', 'Create-Category', true, 200, insertCategory, clientError.success.savedSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Create-Category', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Create-Category', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all  category
 */

export let getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-All-Category', true, 200, category, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Category', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single category
 */

export let getSingleCategory = async (req, res, next) => {
    try {
        const category = await Category.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-Category', true, 200, category, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Category', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create category
 */

export let updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const categoryData: CategoryDocument = req.body;
            const updateCategory = await Category.findOneAndUpdate({ _id: req.query._id },{
                $set: {
                    category: req.body.category,
                    description: req.body.description,
                    modifiedOn: new Date(),
                }
            });
            response(req, res, activity, 'Level-2', 'Update-Category', true, 200, updateCategory, clientError.success.updateSuccess);
        } catch (err: any) {            
            response(req, res, activity, 'Level-3', 'Update-Category', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Category', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create category
 */

export let deleteCategory = async (req, res, next) => {
    try {        
        const deleteCategory = await Category.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        });
        response(req, res, activity, 'Level-2', 'Delete-Category', true, 200, deleteCategory, clientError.success.deleteSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Category', false, 500, {}, errorMessage.internalServer, err.message);
    }
}