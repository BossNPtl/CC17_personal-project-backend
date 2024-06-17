const multer = require('multer');

// multer.diskStorage or memoryStorage
// destination - เป็นการบอกว่าให้อัพโหลดไปที่โฟลเดอร์ไหน
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images');
    },
    // filename - function ที่ให้เรากำหนดชื่อไฟล์ได้ โดย return เป็น callback กลับไป
    filename: (req, file, cb) => {
        const filename = `${new Date().getTime()}${Math.round(Math.random() * 1000000)}.${file.mimetype.split('/')[1]}`;

        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;