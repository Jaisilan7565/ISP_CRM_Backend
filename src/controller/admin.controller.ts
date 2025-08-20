import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import {Admin, } from "../model/admin.model";
import * as TokenManager from "../utils/tokenManager";

var activity = "Admin";


/**
 * 
 * @author Mohanraj V   
 * @date 01-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to login admin
 */

export let loginAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const user = await Admin.findOne({ $and: [{ email: req.body.email }, { isDeleted: false }] }, { email: 1, password: 1, userName: 1});
            if (user) {
                if (user.password != req.body.password) {
                    response(req, res, activity, 'Level-3', 'Login-Admin', false, 403, {}, clientError.password.invalidPassword);
                } else {
                    const token = await TokenManager.CreateJWTToken({
                        id: user["_id"],
                        name: user["userName"],
                    });
                    console.log(user);
                    
                    const details = {};
                    details["_id"] = user["_id"];
                    details["loginType"] ="Admin";
                    details["email"] = user["email"];
                    details["userName"] = user["userName"];
                    details["token"] = token;
                    response(req, res, activity, 'Level-3', 'Login-Admin', true, 200, details, clientError.success.loginSuccess);
                }
            } else {
                response(req, res, activity, 'Level-3', 'Login-Admin', false, 404, {}, clientError.email.emailUserNotFound);
                }
            } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Login-Admin', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Login-Admin', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Mohanraj V   
 * @date 01-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update admin detail with address & bank
 */

export let updateAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const admin = await Admin.findByIdAndUpdate({ _id: req.body._id }, {
                $set: {
                    orgName: req.body.orgName,
                    userName: req.body.userName,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    address: req.body.address,
                    bankDetails: req.body.bankDetails
                }
            });
            response(req, res, activity, 'Level-2', 'Update-Admin', true, 200, admin, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Admin', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Admin', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


/**
 * @author Mohanraj V   
 * @date 01-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get admin details
 */


export let getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Admin', true, 200, admin, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Admin', false, 500, {}, errorMessage.internalServer, err.message);
    }
};