import JWT from 'jsonwebtoken'
import userModel from "../models/userModel.js";


//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

// ฟังก์ชันนี้จะทำการตรวจสอบว่ามีการส่ง Token ผ่าน header "authorization" และถูกเข้ารหัสด้วย JWT (JSON Web Token) 
// และถูกเซ็นต์ด้วยรหัสลับ (secret key) ที่กำหนดไว้ในไฟล์ .env หาก Token ถูกต้อง และสามารถถูกตรวจสอบได้ 
// ฟังก์ชันจะไม่มีการเรียกใช้ฟังก์ชัน next() ทำให้ผู้ใช้ไม่สามารถเข้าถึงการดำเนินการต่อไปได้ แต่ถ้า Token ไม่ถูกต้อง
//  หรือไม่สามารถตรวจสอบได้ ฟังก์ชันจะ log error และไม่เรียกใช้ฟังก์ชัน next() ด้วย 
//  ทำให้ผู้ใช้ไม่สามารถเข้าถึงการดำเนินการต่อไปได้เช่นเดียวกัน


//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};


// } catch (error) {
//     console.log(error)
//     res.status(500).send({
//         success: false,
//         message: 'Error in login',
//         error
//     });
// }
// }