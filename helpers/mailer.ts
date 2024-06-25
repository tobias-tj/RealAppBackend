import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

interface EmailParams {
    to: string
    subject: string
    html: string
}

const sendEmail = async({to, subject, html} : EmailParams) => {
    try{
        const result = await transporter.sendMail({
            from: `Company <${process.env.EMAIL}>`, // sender address
            to, // list of receivers
            subject, // Subject Line
            html,  // html body
        })
        console.log({result})
        return {ok : true, message: "Excelente, mail enviado con exito!"}
    }catch (error){
        console.log({error})
        return{
            ok: false,
            message: "hubo un problema al enviar el email",
            err: error,
        }
    }
}
export default sendEmail;