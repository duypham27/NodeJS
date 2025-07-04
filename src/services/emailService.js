require('dotenv').config()
import nodemailer from 'nodemailer';

let sendASimpleEmail = async (dataSend) => {
    // create
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // Wrap in an async IIFE so we can use await.
    let info = await transporter.sendMail({
        from: '"Duypham27 🗡️" <onetexthack@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên Duypham27</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng nhấp vào đường dẫn bên dưới này
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>


        <div>Xin chân thành cảm ơn</div>
        `, // HTML body
    });
}

module.exports = {
    sendASimpleEmail: sendASimpleEmail
}