import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Isp, IspDocument } from "../model/isp.model"; // Assuming this is the model file
import * as TokenManager from "../utils/tokenManager";

const activity = "ISP";

/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to create ISP
 */
export let saveIsp = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const ispData: IspDocument = req.body;
      const createIsp = new Isp(ispData);
      const insertIsp = await createIsp.save();
      response(
        req,
        res,
        activity,
        "Level-2",
        "Save-ISP",
        true,
        200,
        insertIsp,
        clientError.success.registerSuccessfully
      );
    } catch (err: any) {
      response(
        req,
        res,
        activity,
        "Level-3",
        "Save-ISP",
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
      "Save-ISP",
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
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get all ISPs
 */
export let getAllIsp = async (req, res, next) => {
  try {
    const ispList = await Isp.find({ isDeleted: false });
    response(
      req,
      res,
      activity,
      "Level-2",
      "Get-All-ISP",
      true,
      200,
      ispList,
      clientError.success.fetchedSuccessfully
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Get-All-ISP",
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
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get single ISP
 */
export let getSingleIsp = async (req, res, next) => {
  try {
    const isp = await Isp.findOne({$and: [{ isDeleted: false }, { _id: req.query._id }], });
  response(req,res,activity,"Level-2","Get-Single-ISP",true,200,isp,clientError.success.fetchedSuccessfully);
  } catch (err: any) {
    response(req,res,activity,"Level-3","Get-Single-ISP",false,500,{},errorMessage.internalServer,err.message );
  }
};

/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to update ISP
 */
export let updateIsp = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const ispmData = await Isp.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            ispName: req.body.ispName,
            email: req.body.email,
            address: req.body.address,
            pinCode: req.body.pinCode,
            staticIpCharge: req.body.staticIpCharge,
            contacts: req.body.contacts,
            plans: req.body.plans,
            modifiedOn: new Date(),
          },
        }
      );

      response(
        req,
        res,
        activity,
        "Level-2",
        "Update-ISP",
        true,
        200,
        ispmData,
        clientError.success.updateSuccess
      );
    } catch (err: any) {
      response(
        req,
        res,
        activity,
        "Level-3",
        "Update-ISP",
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
      "Update-ISP",
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
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to delete ISP
 */
export let deleteIsp = async (req, res, next) => {
  try {
    const isp = await Isp.findOneAndUpdate(
      { _id: req.query._id },
      {
        $set: {
          isDeleted: true,
          modifiedOn: new Date(),
        },
      },
      { new: true }
    );
    response(
      req,
      res,
      activity,
      "Level-2",
      "Delete-ISP",
      true,
      200,
      isp,
      clientError.success.deleteSuccess
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Delete-ISP",
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
 * @date 19-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get the data in pincode wise
 */
export let getIspByPincode = async (req, res, next) => {
  try {
    const isp = await Isp.find({
      $and: [{ isDeleted: false }, { pinCode: req.query.pinCode }],
    });
    response(
      req,
      res,
      activity,
      "Level-2",
      "Get-ISP-by-Pincode",
      true,
      200,
      isp,
      clientError.success.fetchedSuccessfully
    );
  } catch (err: any) {
    response(
      req,
      res,
      activity,
      "Level-3",
      "Get-ISP-by-Pincode",
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};
