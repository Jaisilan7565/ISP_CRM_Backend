import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import {
  OrderManagement,
  OrderMangementDocument,
} from "../model/orderMangement.model";
import { Inventory } from "../model/inventory.model";
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";

var activity = "OrderManagement";

/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create employee orders.
 */
export let saveOrderData = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const orderData = await OrderManagement.findOne({
        $and: [{ isDeleted: false }, { customerEmail: req.body.customerEmail }],
      });
      if (!orderData) {
        const orderDetails: OrderMangementDocument = req.body;
        const createData = new OrderManagement(orderDetails);
        let insertData = await createData.save();

        const inventoryItems: any = createData.inventory;

        for (const item of inventoryItems) {
          const value = item.quantity;

          await Inventory.findOneAndUpdate(
            { productId: item.productId },
            { $inc: { quantity: -value } }
          );
          console.log("modifyed");
        }
        response(
          req,
          res,
          activity,
          "Level-2",
          "Save-OrderManagement",
          true,
          200,
          insertData,
          clientError.success.registerSuccessfully
        );
      } else {
        response(
          req,
          res,
          activity,
          "Level-3",
          "Save-OrderManagement",
          true,
          422,
          {},
          "customerEmail already registered"
        );
      }
    } catch (err: any) {
      response(
        req,
        res,
        activity,
        "Level-3",
        "Save-OrderManagement",
        false,
        500,
        {},
        errorMessage.internalServer,
        err.message
      );
    }
  } else {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Save-OrderManagement",
      false,
      422,
      {},
      errorMessage.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }
};

/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to view all   Orders.
 */

export let getAllOrderManagement = async (req, res, next) => {
  try {
    const showData = await OrderManagement.find({ isDeleted: false });
    response(
      req,
      res,
      activity,
      "Level-1",
      "GetAll-OrderManagement",
      true,
      200,
      showData,
      clientError.success.fetchedSuccessfully
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "GetAll-OrderManagement",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};

/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update Order Form.
 */

export let updateOrderManagement = async (req, res, next) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
    try{
        const updateOrderManagement = await OrderManagement.findOneAndUpdate({_id:req.body._id},{
            $set:{
                orderStatus:req.body.orderStatus,
                bundled: req.body.bundled,
                customerName:req.body.customerName,
                customerEmail:req.body.customerEmail,
                customerContact:req.body.customerContact
                
            }
        })
        response(req, res, activity,'Level-1','Update-OrderManagement', true, 200, updateOrderManagement, clientError.success.updateSuccess)
    } catch (err:any){
        response(req, res, activity,'Level-3','Update-OrderManagement', false, 500, {}, errorMessage.internalServer, err.message)
    }
  } else {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Update-OrderManagement",
      false,
      422,
      {},
      errorMessage.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }
};
/**
 * @author Mohanraj V
 * @date  26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single employee orders.
 */

export let getSingleEmployeeOrders = async (req, res, next) => {
  try {
    const getEmployeeOrders = await OrderManagement.find({
      $and: [{ isDeleted: false }, { employeeId: req.query.employeeId }],
    });
    response(
      req,
      res,
      activity,
      "Level-1",
      "Get Single-OrderManagement",
      true,
      200,
      getEmployeeOrders,
      clientError.success.updateSuccess
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Get Single-OrderManagement",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};

/**
 * @author Mohanraj V
 * @date  26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete employee orders.
 */

export let deleteOrderManagement = async (req, res, next) => {
  try {
    const deleteOrderManagement = await OrderManagement.findOneAndUpdate(
      { _id: req.query._id },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
    response(
      req,
      res,
      activity,
      "Level-1",
      "Delete-OrderManagement",
      true,
      200,
      deleteOrderManagement,
      clientError.success.updateSuccess
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Delete-OrderManagement",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};

/**
 * @author Mohanraj V
 * @date  19-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single order.
 */

export let getSingleOrderManagement = async (req, res, next) => {
  try {
    const getSingleOrderManagement = await OrderManagement.find({
      $and: [{ isDeleted: false }, { _id: req.query._id }],
    });
    response(
      req,
      res,
      activity,
      "Level-1",
      "Get Single-OrderManagement",
      true,
      200,
      getSingleOrderManagement,
      clientError.success.updateSuccess
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Get Single-OrderManagement",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
