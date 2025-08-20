import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Invoice, InvoiceDocument } from "../model/invoice.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "Invoice";

/**
 * @author Mohanraj V
 * @date  02-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save new invoice.
 */

export let saveInvoice = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const invoiceData: InvoiceDocument = req.body;
            const createInvoice = new Invoice(invoiceData);
            let insertInvoice = await createInvoice.save();
            response(req, res, activity, 'Level-2', 'Save-Invoice', true, 200, insertInvoice, clientError.success.registerSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Invoice', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Invoice', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


/**
 * @author Mohanraj V
 * @date  02-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all invoice.
 */

export let getAllInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-All-Invoice', true, 200, invoice, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Invoice', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/**
 * @author Mohanraj V
 * @date  02-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single invoice.
 */

export let getSingleInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-Invoice', true, 200, invoice, clientError.success.fetchedSuccessfully);
    } catch (err: any) {        
        response(req, res, activity, 'Level-3', 'Get-Single-Invoice', false, 500, {}, errorMessage.internalServer, err.message);
    }
};