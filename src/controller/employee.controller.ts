import { express } from "express";
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response} from "../helper/commonResponseHandler";
import { hashPassword ,decrypt,encrypt} from "../helper/Encryption";
import *  as TokenManager from "../utils/tokenManager";
import { Employee,EmployeeDocument } from "../model/employee.model";

var activity='Employee';


/**
 * @author Mohanraj V 
 * @date 25-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create employee as a User.
 */
export let saveEmployee = async (req, res, next) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
        try {
            const usersData = await Employee.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }, { contact: req.body.contact }] });
           
            if (!usersData ) {
                req.body.password = await encrypt(req.body.password)
                const employeeDetails: EmployeeDocument = req.body;
                const createData = new Employee(employeeDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                
                const result = {}
                result['_id'] = insertData._id
                result['name'] = insertData.name;
                result['employeeRole'] = insertData.employeeRole;
               
                let finalResult = {};
                finalResult["loginType"] = 'Employee';
                finalResult["employeeDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-Employees', true, 200, result, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Employees', true, 422, {}, 'Mobilenumber (or) Email already registered');
            }

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Employees', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Employees', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Mohanraj V 
 * @date 27-02-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Login employees
 */
export let loginEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
                   
            const user = await Employee.findOne({ $and: [{ email: req.body.email }, { isDeleted: false }] }, { email: 1, password: 1,name:1, status: 1,employeeRole:1,employeeId:1 });
            if (user) {
                const newHash = await decrypt(user.password);
                console.log(user.password, req.body.password,newHash);
                
                if (user["status"] === 2) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, clientError.account.inActive);
                } else if (newHash != req.body.password) {
                    response(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                }
                 else {
                    const token = await TokenManager.CreateJWTToken({
                        id: user["_id"],
                        name: user["name"],
                        loginType: 'employee'
                    });                    
                    const details = {}
                    details['_id'] = user._id
                    details['email'] = user.email;
                    details['employeeId'] = user.employeeId;
                    details['name'] = user.name;
                    details['employeeRole'] = user.employeeRole;

                    let finalResult = {};
                    finalResult["loginType"] = 'employee';
                    finalResult["employeeDetails"] = details;
                    finalResult["token"] = token;
                    response(req, res, activity, 'Level-2', 'Login-employee', true, 200, finalResult, clientError.success.loginSuccess);
                }
            }else{
                response(req, res, activity, 'Level-3', 'Login-Employees', true, 422, {}, 'Email Not Registered');
            }
        }catch (err: any) {
        response(req, res, activity, 'Level-3', 'Login-employee', false, 500, {}, errorMessage.internalServer, err.message);
 }}else{
    response(req, res, activity, 'Level-3', 'Login-Employees', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
 }
};


/**
 * @author Mohanraj V 
 * @date 03-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all employees
 */
export let getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find({ isDeleted: false },{password:0});
        response(req, res, activity, 'Level-2', 'Get-All-Employees', true, 200, employees, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Employees', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/**
 * @author Mohanraj V
 * @date 03-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single employee.
 */

export let getSingleEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById({ _id: req.query._id });
        response(req, res, activity, 'Level-2', 'Get-Single-Employees', true, 200, employee, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Employees', false, 500, {}, errorMessage.internalServer, err.message);
    }   
};

/**
 * @author Mohanraj V
 * @date 03-03-2025
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update employee
 */

export let updateEmployee = async (req, res, next) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
    try {
        const employee = await Employee.findByIdAndUpdate({ _id: req.body._id },{
            $set: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                employeeRole: req.body.employeeRole
            }
        });
        response(req, res, activity, 'Level-2', 'Update-Employee', true, 200, employee, clientError.success.updateSuccess);

    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-Employee', false, 500, {}, errorMessage.internalServer, err.message);
    }
}else{
    response(req, res, activity, 'Level-3', 'Update-Employee', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
}
};

export let updateEmployeePassword = async (req, res, next) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
    try {
        req.body.password = await encrypt(req.body.password)
        const employee = await Employee.findByIdAndUpdate({ _id: req.body._id },{
            $set: {
                password: req.body.password,
            }
        });
        response(req, res, activity, 'Level-2', 'Update-Employee', true, 200, employee, clientError.success.updateSuccess);

    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-Employee', false, 500, {}, errorMessage.internalServer, err.message);
    }
}else{
    response(req, res, activity, 'Level-3', 'Update-Employee', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
}
};

export let deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        }, { new: true });
        response(req, res, activity, 'Level-2', 'Delete-Employee', true, 200, employee, clientError.success.deleteSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Employee', false, 500, {}, errorMessage.internalServer, err.message);
    }
};