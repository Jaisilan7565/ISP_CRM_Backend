import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import {Enquiry,EnquiryDocument } from "../model/enquiryForm.model";
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";

var activity = "Enquiry"

/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Enquiry Form.
 */
export let saveEnquiryData = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const EnquiryData = await Enquiry.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!EnquiryData) {
                const EnquiryDetails: EnquiryDocument = req.body;
                const createData = new Enquiry(EnquiryDetails);
                let insertData = await createData.save();
                response(req, res, activity, 'Level-2', 'Save-Enquiry', true, 200, {}, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Enquiry', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Enquiry', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Enquiry', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to view all enquery Form.
 */

export let getAllEnquiry = async (req, res, next) => {
    try {
        const showData = await Enquiry.find({isDeleted:false})
        response(req, res, activity,'Level-1','GetAll-Enquiry', true, 200, showData, clientError.success.fetchedSuccessfully)
    } catch (err:any){
        response(req, res, activity,'Level-3','GetAll-Enquiry', false, 500, {}, errorMessage.internalServer, err.message)
    }
}

/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update Enquiry Form.
 */

export let updateEnquiry = async (req, res, next) => {
    try{
        const updateEnquiry = await Enquiry.findOneAndUpdate({_id:req.body._id},{
            $set:{
                enquiryStatus:req.body.updateStatus
            }
        })
        response(req, res, activity,'Level-1','Update-Enquiry', true, 200, updateEnquiry, clientError.success.updateSuccess)
    } catch (err:any){
        response(req, res, activity,'Level-3','Update-Enquiry', false, 500, {}, errorMessage.internalServer, err.message)
    }
}