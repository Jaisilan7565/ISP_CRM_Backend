import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import {RazorpayPayment,PaymentDocument} from "../model/razorpay.model";
// import Razorpay from "razorpay";
const Razorpay = require("razorpay");
//import * as Razorpay from "razorpay";

var activity = "PaymentLink";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @author Jaisilan
 * @date 31-03-2025
 * @description Create a new Razorpay order
 */
export const createPaymentLink = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const paymentDetails:PaymentDocument = req.body;
      // Create a new Razorpay payment link
      const paymentData = await razorpay.paymentLink.create({
                          amount: req.body.amount * 100 , // Razorpay expects amount in paise
                          currency: "INR",
                          accept_partial: false,
                          description: `Internet Bill for ${req.body.customerName} - ${new Date().toLocaleDateString()}`,
                          customer: {
                            name: req.body.customerName,
                            email: req.body.customerEmail,
                            contact: req.body.customerContact,
                          },
                          notify: { sms: true, email: true },
                          reminder_enable: true,
                          callback_url: "https://localhost:3000/payment-success",
                          callback_method: "get",
                        });

     paymentDetails.paymentLink = paymentData?.short_url,
     paymentDetails.dueDate = new Date(new Date().setDate(new Date().getDate() + 10));

             const  createPayment = new RazorpayPayment(paymentDetails);
                  let insertPayment = await createPayment.save();
                  
            const details = {};
           details["_id"] = insertPayment["_id"];
           details["paymentLink"] = insertPayment["paymentLink"];

   response(req, res, activity, 'Level-2', 'Create-Payment', true, 200, details, clientError.success.registerSuccessfully);
      
    } catch (err: any) {
                 response(req, res, activity, 'Level-3', 'Create-Payment', false, 500, {}, errorMessage.internalServer, err.message);
    }
  } else {
           response(req, res, activity, 'Level-3', 'Create-Payment', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
   
  }
};


/**
 * @author Mohanraj V   
 * @date 10-04-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update the payment status and activate the date
 */

export const updatePaymentStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const payment = await RazorpayPayment.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            paymentStatus: req.body.paymentStatus,
            //activateDate: req.body.activateDate, // if we need we can enable 
          },
        },{new:true}
      );
      response(req, res, activity, 'Level-2', 'Create-Payment', true, 200, payment, clientError.success.registerSuccessfully);
    } catch (err: any) {
      response(req, res, activity, 'Level-3', 'Create-Payment', false, 500, {}, errorMessage.internalServer, err.message);
    }
  } else {
    response(req, res, activity, 'Level-3', 'Create-Payment', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  }
};