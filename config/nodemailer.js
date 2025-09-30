import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD } from './env.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'u.beyza.simsek@gmail.com',
        pass: EMAIL_PASSWORD
    }
})