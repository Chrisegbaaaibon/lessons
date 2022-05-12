let Student = require('../database/schema');
const jwt = require('jsonwebtoken');
const sendMail = require('../mail/mailer');
require('dotenv').config();


exports.createStudent = async(req, res) => {
    try {
        let { name, email, phonenumber, username, address, password } = req.body;
        console.log(req.body)
        let oldStudent = await Student.findOne({email: email});
        let oldName = await Student.findOne({username: username });
        if (!req.body){
            return res.status(400).json({
                message: 'Please fill in all the fields'
            })
        }

        if (oldStudent){
             res.status(400).json({
                message: "This email is already registered. Please use another email"
            });
        }
        if (oldName){
             res.status(400).json({
                message: "This username is already registered. Please use another username"
            })
        }
         // Hashing the password 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw (err)
            })
        })

        let token = jwt.sign(
            {name, email, phonenumber, username, address, password, confirmPassword },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        let url = `${req.protocol}://${req.get('host')}/api/authentication/activate?token=${token}`;

        await sendMail({
            email: email,
              subject: 'Email Verification',
              html:  `<p>You </p>
              <p>Please click the link below to verify your email</p>
              <a href=${url}>Verify</a>`
        })

        res.header('x-auth-token', token)

        return res.json({
            message: 'OTP will be sent to your email id please kindly check it',
          })

    } catch (error) {
        console.log(error)
    }
}