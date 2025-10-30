const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Caminho correto da pasta uploads dentro de src
const uploadPath = path.join(__dirname, "uploads"); 

// Cria a pasta caso não exista
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
