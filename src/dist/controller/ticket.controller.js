"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.getSingleTicket = exports.getAllTicket = exports.saveTicket = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ticket_model_1 = require("../model/ticket.model");
var activity = "Ticket";
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create ticket
 */
let saveTicket = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const ticketData = req.body;
            const createTicket = new ticket_model_1.Ticket(ticketData);
            let insertTicket = await createTicket.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Create-Ticket', true, 200, insertTicket, ErrorMessage_1.clientError.success.registerSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Ticket', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Ticket', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveTicket = saveTicket;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all  ticket
 */
let getAllTicket = async (req, res, next) => {
    try {
        const ticket = await ticket_model_1.Ticket.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-Ticket', true, 200, ticket, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Ticket', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllTicket = getAllTicket;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single  ticket
 */
let getSingleTicket = async (req, res, next) => {
    try {
        const ticket = await ticket_model_1.Ticket.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Single-Ticket', true, 200, ticket, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Single-Ticket', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleTicket = getSingleTicket;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update  ticket
 */
let updateTicket = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const ticket = await ticket_model_1.Ticket.findByIdAndUpdate({ _id: req.body._id }, {
                $set: {
                    ticketStatus: req.body.ticketStatus
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Ticket', true, 200, ticket, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Ticket', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Ticket', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateTicket = updateTicket;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete  ticket
 */
let deleteTicket = async (req, res, next) => {
    try {
        const ticket = await ticket_model_1.Ticket.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Ticket', true, 200, ticket, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Ticket', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteTicket = deleteTicket;
//# sourceMappingURL=ticket.controller.js.map