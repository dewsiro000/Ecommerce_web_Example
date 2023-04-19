import status from "statuses";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
// const userModel = require("../models/userModel.js")
import JWT from "jsonwebtoken";


// export const testGet = async (req, res) => {
//     //------------------------------------------------------------------------------------------------------//   
//     console.log('reponse', req?.body);
//     res.status(200).send({
//         success: true,
//         message: "test"
//     })
// };

export const registerController = async (req, res) => {
    //------------------------------------------------------------------------------------------------------//   
    console.log('reponse', req?.body);
    // return res.status(200).send({
    //     success: true,
    //     message: 'Already Register please login',
    // });
    try {
        const { name, email, password, phone, address, answer } = req.body; //req.body =  ข้อมูลที่ส่งมากับ body
        //validations การตรวจสอบ!
        if (!name) {
            return res.send({ message: "Name is Required" });
        } if (!email) {
            return res.send({ message: "Email is Required" });
        } if (!password) {
            return res.send({ message: "Password is Required" });
        } if (!phone) {
            return res.send({ message: "Phone is Required" });
        } if (!address) {
            return res.send({ message: "Address is Required" });
        } if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        // userModel คือ Mongoose model ที่ถูกสร้างขึ้นเพื่อใช้ในการเข้าถึงฐานข้อมูล 
        // MongoDB โดยใช้ Schema ที่กำหนดไว้

        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please login',
            });
        }
        // register user
        const hashedPassword = await hashPassword(password);

        console.log("hashedPassword", hashedPassword);
        //save 
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();
        // userData.save();//เมื่อส่งข้อมูลมาแล้วก็กด save 

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        })
        //------------------------------------------------------------------------------------------------------//
    } catch (error) {
        console.log(error)
        res.status(500).send({ //การตั้งค่า HTTP status code ให้เป็น 500 หมายถึง Internal Server Error
            success: false,
            message: 'Error in Registeration', //Register ไม่สำเร็จ !!
            error,
        })
    }
};
//------------------------------------------------------------------------------------------------------//

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(200).send({
            success: true,
            message: "login successsfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
}

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'newPassword is required' })
        }
        // check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully!',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong ',
            error
        })
    }
}


//test Controller
export const testController = (req, res) => {
    res.send("Routes Protected")
}