const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');


module.exports = (formulario) => {
    let transporter = nodemailer.createTransport(smtpTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'toucanairit@gmail.com', //  email
        pass: 'Toucanairllc2019.' //  password
    },
    tls:{
        rejectUnauthorized:false
    }
    }));
   let mailOptions = {
    from: 'toucanairit@gmail.com', //'"${formulario.nombre}” <${formulario.email}>',
    to: "barbara29rp@gmail.com,sales@toucanair.com", //  destinatario
    subject: "NewPage Contact Request",
    html: `
        <p> You have a New Contact Request </p>
        <ul>
            <li><strong>Name:</strong> ${formulario.name}</li>
            <li><strong>E-mail:</strong> ${formulario.email}</li>
            <li><strong>Phone:</strong> ${formulario.phone}</li>
            <li><strong>Company:</strong> ${formulario.company}</li>
        </ul>
        <h3><strong>Message:</strong> ${formulario.message}</h3>
        `};


   transporter.sendMail(mailOptions, function (err, info) {
    if (err)
    console.log(err)
    else
    console.log('Email sent: ' + info.response);
    });
   }