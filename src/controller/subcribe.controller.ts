import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Subcribe, SubcribeDocument } from "../model/subcribe.model";
import { OrderManagement } from "../model/orderMangement.model";
import * as TokenManager from "../utils/tokenManager";

var activity = "Subcribe";

/**
 * @author Mohanraj V
 * @date  19-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save new subcriber.
 */

export let saveSubcribe = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const data= await Subcribe.findOne({$and:[{isDeleted:false},{custEmail:req.body.custEmail}]})
            const cusData= await OrderManagement.findOne({$and:[{isDeleted:false},{custEmail:req.body.custEmail}]},{customerAddress:1})
            const address=cusData?.customerAddress;
            const user = await OrderManagement.findOne({ $and: [{ isDeleted: false }, { _id: { $ne: cusData?._id } }, { customerAddress: cusData?.customerAddress }] });

            if(!data){
                const subcribeData: SubcribeDocument = req.body;
               const code= `Cust${Math.floor(100 + Math.random() * 900)}`;
               subcribeData.custId=code;
               console.log(code);
               
                          
            const createSubcribe = new Subcribe(subcribeData);
            let insertSubcribe = await createSubcribe.save();

               const orderData = await OrderManagement.findOneAndUpdate({ _id: req.body.orderId }, { 
                    $set: { orderStatus: req.body.orderStatus, 
                        subscribeDate:Date.now()
                    } }, { new: true });

                const plan=orderData?.plan;                
               const renewalDate= await  DateClaculate(plan?.planName)
                    await Subcribe.findByIdAndUpdate({_id:insertSubcribe._id},{$set:{renewalDate:renewalDate}})
                    response(req, res, activity, 'Level-2', 'Save-Subcribe', true, 200,insertSubcribe , clientError.success.registerSuccessfully);
            }
            // else if(){

            // }
            else{
            const subcribeData: SubcribeDocument = req.body;
            subcribeData.custId = data?.custId;
            const createSubcribe = new Subcribe(subcribeData);
            let insertSubcribe = await createSubcribe.save();

            const orderData =  await OrderManagement.findOneAndUpdate({ _id: req.body.orderId }, { 
                    $set: { orderStatus: req.body.orderStatus, 
                        subscribeDate:Date.now()
                    } }, { new: true });
                    const plan=orderData?.plan                   
                    const renewalDate= await  DateClaculate(plan?.planName)
                    await Subcribe.findByIdAndUpdate({_id:insertSubcribe._id},{$set:{renewalDate:renewalDate}})
            response(req, res, activity, 'Level-2', 'Save-Subcribe', true, 200,insertSubcribe , clientError.success.registerSuccessfully);
                }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Subcribe', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
    }


    function DateClaculate(plan){
        console.log(plan);
        
    const durationMatch = plan.match(/(\d+)([mMdYyDd])$/); // Extract digits and unit
    
    if (durationMatch) {
        const value = parseInt(durationMatch[1], 10);
        const unit = durationMatch[2].toLowerCase();
        console.log(unit);
        
        let renewalDate = new Date();
    
        if (unit === 'm') {
            renewalDate.setMonth(renewalDate.getMonth() + value);
        } else if (unit === 'y') {
            renewalDate.setFullYear(renewalDate.getFullYear() + value);
        } else if (unit === 'd') {
        console.log("date working");
        
            renewalDate = new Date(renewalDate.getTime() + value * 24 * 60 * 60 * 1000);
        }
    
        console.log("Renewal Date:", renewalDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
        return  renewalDate.toISOString().split("T")[0]
    }
}
    
    

/**
 * @author Mohanraj V
 * @date  19-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all subcriber.
 */


export let getAllSubcribe = async (req, res, next) => {
    try {       
        const subcribe = await Subcribe.find({ isDeleted: false }).populate({ path: 'orderId', model: 'OrderMangement' })
        response(req, res, activity, 'Level-2', 'Get-All-Subcribe', true, 200, subcribe, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/**
 * @author Mohanraj V
 * @date  19-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single subcriber.
 */


export let getSingleSubcribe = async (req, res, next) => {
    try {
        const subcribe = await Subcribe.findById({ _id: req.query._id }).populate({ path: 'orderId', });
        response(req, res, activity, 'Level-2', 'Get-Single-Subcribe', true, 200, subcribe, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);
    }
};              


/**
 * @author Mohanraj V
 * @date  19-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update subcriber.
 */

export let updateSubcribe = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const subcribeData: SubcribeDocument = req.body;
            const updateSubcribe = await Subcribe.findOneAndUpdate({ _id: req.body._id }, {
                $set:{
                    subscribeStatus:subcribeData.subscribeStatus

            }}, { new: true });
            response(req, res, activity, 'Level-2', 'Update-Subcribe', true, 200, updateSubcribe, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Subcribe', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


/**
 * @author Mohanraj V
 * @date  19-0-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delele subcriber.
 */

export let deleteSubcribe = async (req, res, next) => {
    try {
        const deleteSubcribe = await Subcribe.findOneAndUpdate({ _id: req.query._id }, { $set: { isDeleted: true } }, { new: true });
        response(req, res, activity, 'Level-2', 'Delete-Subcribe', true, 200, deleteSubcribe, clientError.success.deleteSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);
    }
};




export let endingPlan = async (req, res, next) =>{
    try{
const today = new Date();
const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000; 

const subscriptions = await Subcribe.find({
    renewalDate: { $ne: "" }, //check the empty date
    isDeleted: false, 
    subscribeStatus: "active", // Only active subscriptions
    $expr: {
        $lte: [
            { $subtract: ["$renewalDate", today] }, // renewalDate - today
            tenDaysInMillis
        ]
    }});
    response(req, res, activity, 'Level-2', 'expireding-Subcribe', true, 200, subscriptions, clientError.success.fetchedSuccessfully);
   }
    catch(err:any){
        response(req, res, activity, 'Level-3', 'expireding-Subcribe', false, 500, {}, errorMessage.internalServer, err.message);

    }
}

export async function planExpired(){
    const today = new Date();
    const result = await Subcribe.updateMany(
        { 
            renewalDate: { $lt: today },  
            subscribeStatus: "active"     
        },
        { $set: { subscribeStatus: "expired" } } 
    );
}
