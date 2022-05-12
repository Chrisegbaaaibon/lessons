const nodemailer = require('nodemailer');


const sendMail = async (options) => {
  
    const  transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            
          user: 'hivendtech@gmail.com',
          pass: process.env.PASS
        }
      });
    
      let message = {
        from: 'Hivend <hivendtech@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.text,
        html: options.html
      }
  
      const info = await transporter.sendMail(message)
      console.log('Message sent: %s', info.messageId);
  }
  

  module.exports = sendMail;