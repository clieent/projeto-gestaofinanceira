import * as nodemailer from 'nodemailer'
import * as ejs from 'ejs'
import * as path from 'path'

export class EmailService {
    async sendResetPassword(email: string, mensagem: string, token: string) {
        ejs.renderFile(
            path.join(__dirname, `templates/layouts/resetPasswordInEmail.ejs`),
            { username: 'Usuário', link: `http://localhost:3000/auth/forgotPassword/resetPassword?token=${token}` },
            async (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    const transporter = nodemailer.createTransport({
                        host: process.env.HOST_MAIL,
                        port: 2525,
                        secure: false,
                        auth: {
                            user: process.env.USER_MAIL,
                            pass: process.env.PASSWORD_MAIL,
                        },
                        ignoreTLS: true,
                    })

                    try {
                        const mailResponse = await transporter.sendMail({
                            to: email,
                            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_URL}>`,
                            subject: 'Recuperação de senha!',
                            text: `Link para recuperação de senha!`,
                            html: data,
                        })
                        console.log('EMAIL ENVIADO')
                        return mailResponse
                    } catch (error) {
                        console.log(error)
                        return false
                    }
                }
            }
        )
    }
}
