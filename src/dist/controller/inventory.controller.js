"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.getSingleInventory = exports.getAllInventory = exports.saveInventory = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const inventory_model_1 = require("../model/inventory.model");
var activity = "Inventory";
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create inventory
 */
let saveInventory = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const inventoryData = req.body;
            const createInventory = new inventory_model_1.Inventory(inventoryData);
            let insertInventory = await createInventory.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Create-Inventory', true, 200, insertInventory, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Inventory', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Inventory', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveInventory = saveInventory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all  inventory
 */
let getAllInventory = async (req, res, next) => {
    try {
        const inventoryList = await inventory_model_1.Inventory.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-Inventory', true, 200, inventoryList, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Inventory', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllInventory = getAllInventory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to  get single inventory
 */
let getSingleInventory = async (req, res, next) => {
    try {
        const inventory = await inventory_model_1.Inventory.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Single-Inventory', true, 200, inventory, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Single-Inventory', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleInventory = getSingleInventory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update inventory
 */
let updateInventory = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const inventoryData = req.body;
            const updateInventory = await inventory_model_1.Inventory.findByIdAndUpdate({ _id: req.body._id }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    image: req.body.image
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Inventory', true, 200, updateInventory, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Inventory', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Inventory', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateInventory = updateInventory;
/**
 *
 * @author Mohanraj V
 * @date 13-0-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete inventory
 */
let deleteInventory = async (req, res, next) => {
    try {
        const inventory = await inventory_model_1.Inventory.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Inventory', true, 200, inventory, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Inventory', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteInventory = deleteInventory;
//# sourceMappingURL=inventory.controller.js.map