import { exxpress } from "express";
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Ticket, TicketDocument } from "../model/ticket.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "Ticket";


/** 
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create ticket
 */


export let saveTicket = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ticketData: TicketDocument = req.body;
            const ticketId = await generateTicketId(req.body.state, req.body.pincode)
            ticketData.ticketId=ticketId;
            const createTicket = new Ticket(ticketData);
            let insertTicket = await createTicket.save();
            response(req, res, activity, 'Level-2', 'Create-Ticket', true, 200, insertTicket, clientError.success.registerSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Create-Ticket', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Create-Ticket', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/** 
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all  ticket
 */
export let getAllTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-All-Ticket', true, 200, ticket, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Ticket', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/** 
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single  ticket
 */
export let getSingleTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-Ticket', true, 200, ticket, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Ticket', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/** 
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  ticket
 */
export let updateTicket = async (req, res, next) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
    try {
        const ticket = await Ticket.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                ticketStatus: req.body.ticketStatus
            }
        });
        response(req, res, activity, 'Level-2', 'Update-Ticket', true, 200, ticket, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-Ticket', false, 500, {}, errorMessage.internalServer, err.message);
    }
}else{
    response(req, res, activity, 'Level-3', 'Update-Ticket', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
}
};


/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete  ticket
 */

export let deleteTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findOneAndUpdate({ _id: req.query._id },{
            $set: {
                isDeleted: true
            }
        });
        response(req, res, activity, 'Level-2', 'Delete-Ticket', true, 200, ticket, clientError.success.deleteSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Ticket', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


function generateTicketId(stateName, pincode) {
    const stateCodes = {
        andhra_pradesh: 'AP',  arunachal_pradesh: 'AR',  assam: 'AS',bihar: 'BR',    chhattisgarh: 'CG',
        goa: 'GA',        gujarat: 'GJ',        haryana: 'HR',        himachal_pradesh: 'HP',        jharkhand: 'JH',
        karnataka: 'KA',        kerala: 'KL',        madhya_pradesh: 'MP',        maharashtra: 'MH',        manipur: 'MN',
        meghalaya: 'ML',        mizoram: 'MZ',        nagaland: 'NL',        odisha: 'OR',        punjab: 'PB',
        rajasthan: 'RJ',        sikkim: 'SK',        tamilnadu: 'TN',        telangana: 'TG',        tripura: 'TR',
        uttar_pradesh: 'UP',        uttarakhand: 'UK',        west_bengal: 'WB',        delhi: 'DL',        jammu_kashmir: 'JK'
      };
  
    const stateCode = stateCodes[stateName.toLowerCase()] || 'XX'; // fallback to 'XX' if not found
    const lastTwoDigits = String(pincode).slice(-2);
  
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const datePart = `${yyyy}${mm}${dd}`;
  
    const serialPart = Ticket.countDocuments().then(count => count + 1)
  
    return `IN-${stateCode}${lastTwoDigits}-${datePart}-${serialPart}`;
  }
  