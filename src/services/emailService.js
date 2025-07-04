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
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên Duypham27</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng nhấp vào đường dẫn bên dưới này
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Nhấp vào đây</a>
        </div>


        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You have received this email because you have booked an online medical appointment on Duypham27</p>
        <p>Appointment information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is correct, please click on the link below to confirm and complete the appointment booking process.</p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>


        <div>Thank you very much</div>
        `
    }

    return result;
}

module.exports = {
    sendASimpleEmail: sendASimpleEmail
}