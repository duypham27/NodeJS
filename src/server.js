import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();

// Cấu hình CORS chính xác
app.use(cors({
    origin: "http://localhost:3000", // Chỉ cho phép frontend chạy trên cổng 3000 truy cập
    credentials: true,  // Cho phép gửi cookie & token
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

// Middleware xử lý dữ liệu từ client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine
viewEngine(app);

// Khởi tạo routes
initWebRoutes(app);

// Kết nối database
connectDB();

// Khởi động server
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("✅ Backend NodeJS is running on PORT: " + port);
});
