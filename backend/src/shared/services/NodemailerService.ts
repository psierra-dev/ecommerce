import nodemailer from "nodemailer"
import { Service } from "typedi";
import config from "@/config";
import { IEmailProvider } from "../interfaces/nodemailer";


@Service()
export default class NodeMailerService implements IEmailProvider {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail,
                pass: config.pass_mail
            }
        })
    }

    async sendVerificationEmail(to: string, name: string, token: string): Promise<void> {
        const verificationUrl = `http://localhost:3001/api/v1/auth/verify/${token}`;
        const mailOptions = {
            from: '"Your App" <noreply@example.com>',
            to,
            subject: "Verify your email address",
            text: `Hi ${name},\n\nPlease verify your email address by clicking the link below:\n\n${verificationUrl}`,
            html: `<p>Hi ${name},</p><p>Please verify your email address by clicking the link below:</p><p><a href="${verificationUrl}">Verify Email</a></p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Verification email sent successfully.");
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw new Error("Failed to send verification email.");
        }
    }

}