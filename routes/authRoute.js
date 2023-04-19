import express from 'express';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router()  //เป็นฟังก์ชันที่ใช้สร้าง Router ของ Express.js

//routing
// REGISTER || METHOD POST
//console.log("test in routes");
router.post('/register', registerController)
// router.get('/', testGet)

//LOGIN || POST
router.post('/login', loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', requireSignIn, isAdmin, testController)

//protected User-route-auth
router.post('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected Admin-route-auth
router.post('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;
// เปรียบเสมือนเขียนฟังก์ชันให้ module อื่น เรียกใช้งาน