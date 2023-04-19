import bcrypt from "bcrypt";

export const hashPassword = async (password) => {  //ฟังก์ชันรับค่า password
    try {
        const saltRounds = 10; // จำนวนรอบที่ bcrypt จะทำการเพิ่มความปลอดภัยในการเข้ารหัส โดยสร้าง salt ขึ้นมาใหม่ในแต่ละรอบ
        const hashedPassword = await bcrypt.hash(password, saltRounds); //bcrypt.hash เป็นฟังก์ชันที่ใช้ในการเข้ารหัสข้อมูลด้วย bcrypt
        //เป็น parameter และ return เป็น Promise ที่ resolve ค่าเป็น hashed password ที่ถูกเข้ารหัสด้วย bcrypt
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
    //password และ hashedPassword เป็น parameter และ return เป็น Promise 
    //ที่ resolve เป็น boolean ว่า password ที่รับเข้ามาตรงกับ hashed password หรือไม่
}