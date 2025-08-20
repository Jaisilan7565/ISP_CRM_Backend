import {express  } from "express";
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler"; 
import { Inventory, InventoryDocument } from "../model/inventory.model";
import * as TokenManager from "../utils/tokenManager";  

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

export let saveInventory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const inventoryData: InventoryDocument = req.body;
            const createInventory = new Inventory(inventoryData);
            let insertInventory = await createInventory.save();
            response(req, res, activity, 'Level-2', 'Create-Inventory', true, 200, insertInventory, clientError.success.savedSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Create-Inventory', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Create-Inventory', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));    
    }
};

/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all  inventory 
 */

export let getAllInventory = async (req, res, next) => {
    try {
        const inventoryList = await Inventory.find({ isDeleted: false }).populate('CategoryId');
        response(req, res, activity, 'Level-2', 'Get-All-Inventory', true, 200, inventoryList, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Inventory', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/** 
* @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to  get single inventory
 */


export let getSingleInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.findById({ _id: req.query._id }).populate('category');
        response(req, res, activity, 'Level-2', 'Get-Single-Inventory', true, 200, inventory, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Inventory', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/**
 * 
 * @author Mohanraj V   
 * @date 13-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update inventory
 */


export let updateInventory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const inventoryData: InventoryDocument = req.body;
            const updateInventory = await Inventory.findByIdAndUpdate({ _id: req.body._id }, {
                 $set:{
                     name: req.body.name,
                     description: req.body.description,
                     quantity: req.body.quantity,
                     price: req.body.price,
                     image: req.body.image
                 }
                });
            response(req, res, activity, 'Level-2', 'Update-Inventory', true, 200, updateInventory, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Inventory', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {    
        response(req, res, activity, 'Level-3', 'Update-Inventory', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Mohanraj V   
 * @date 13-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete inventory
 */


export let deleteInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        }, { new: true });
        response(req, res, activity, 'Level-2', 'Delete-Inventory', true, 200, inventory, clientError.success.deleteSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Inventory', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/**
 * @author Mohanraj V   
 * @date 18-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update the inventry
 */

export let updateInventoryQuantity = async (req, res, next) => {
    try {
        const inventory = await Inventory.findOneAndUpdate({ _id: req.body._id }, {
            $inc: {
                quantity: req.body.quantity,
            }
        }, { new: true });
        response(req, res, activity, 'Level-2', 'Update-Inventory-Quantity', true, 200, inventory, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-Inventory-Quantity', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


