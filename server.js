import express from "express";  //นำโมดูล express เข้ามาเพื่อสร้าง object ของ แอพลิเคชั่น
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js"; //เชื่อม Database ที่ MongoDB
import cors from "cors";
//var cors = require('cors')
//const cors = require('cors');

// ⁡⁣⁣⁢Routes ⁡⁣⁢จะใช้อะไรต้อง import เข้ามาก่อน⁡⁡⁡
import authRoutes from './routes/authRoute.js';
//import categoryRoutes from './routes/categoryRoutes.js'

// ⁡⁢⁣⁡⁢⁣⁣configure env⁡⁡
dotenv.config();
// >>   you can load the environment variables from the 
//.env file by calling the config method on the dotenv package

//⁡⁣⁢⁡⁣⁢⁣database config⁡⁡
connectDB();

//rest object
const app = express() //เก็บตัวแปรแอปมารับค่า


// ⁡⁢⁣⁣ ​‌‌‍ᵐᶦᵈᵈᵉˡʷᵃʳᵉ
app.use(cors())
app.use(express.json());  //แปลง request body ของ HTTP Request ที่เป็น JSON ให้กลายเป็น JavaScript object ⁡
//และเพิ่ม property body ใน object ของ HTTP Request 
app.use(morgan("dev"));   //เรียกใช้ morgan จัดการ log


//⁡⁢⁢  ⁡⁢⁢⁢routes⁡⁡
app.use("/api/v1/auth", authRoutes);
//app.use("/api/v1/category", categoryRoutes);
//กำหนด path แสดงหัวข้อกันมึน !!



const PORT = process.env.PORT || 8080;
// process.env.PORT มีประโยชน์สำหรับการดูแลรักษาและเปิดเว็บเซิร์ฟเวอร์
// ที่มีการจัดการโดยสามารถระบุพอร์ตผ่าน environment variable ได้ เ
// พื่อสามารถกำหนดพอร์ตได้อย่างยืดหยุ่นโดยไม่ต้องแก้ไขโค้ดของแอปพลิเคชัน
/*---------------------------------------------------------------
 >> แอปพลิเคชันจะใช้พอร์ตที่กำหนดใน process.env.PORT หากมีการกำหนด 
 หรือใช้พอร์ต 3000 หากไม่มีการกำหนด โดย || คือการใช้ค่าเริ่มต้น 
 ในกรณีที่ process.env.PORT ไม่ได้ระบุค่าใดๆ จะใช้ค่าเริ่มต้นเป็น 3000 แทน.
----------------------------------------------------------------*/

//rest api >> รับคำขอที่ส่งเข้ามาทาง sever
app.get('/', (req, res) => {   // req = รับค่า, res = ส่งกลับค่า
    res.send(`<h1> Welcome to ecommerce app ${PORT} test</h1>`);
});



//run listen >> process.env.DEV_MODE เพื่อเช็คว่าโหมดการทำงานของแอปพลิเคชันเป็นโหมดการพัฒนาหรือไม่ 
app.listen(PORT, () => {
    console.log(
        `Sever Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.
            red
    );
});