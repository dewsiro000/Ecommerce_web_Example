import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        //⁡⁣⁢⁣ เปรียบเสมือน Table ต่างๆ⁡
        name: {
            type: String,
            required: true, // กำหนดว่า field นี้เป็น required คือต้องมีค่าเสมอ เพื่อป้องกันการบันทึกข้อมูลที่ไม่มีค่านี้
            trim: true, /*กำหนดว่าข้อมูลที่เก็บใน field นี้ต้องถูกตัดช่องว่างหน้าและหลังข้อความออก 
            ก่อนที่จะถูกบันทึกลงในฐานข้อมูลซึ่งช่วยลดความผิดพลาดในการกรอกข้อมูลของผู้ใช้
            และทำให้การค้นหาข้อมูลเป็นไปได้ง่ายขึ้น */
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
    // timestamps ไว้ดูว่าข้อมูลนี้ถูกเพิ่มถูกอัพเดตเมื่อเวลาเท่าไหร่?
);

export default mongoose.model('users', userSchema)
// export ออกไปชื่อว่า users


