// import userModel from "../../MODELS/userAuthModel.js"
// import { transporter } from "../../ROUTES/mailconfig.js"
// let myOtp = new Map()

// export let userRegister = async (req, res) => {
//     try {
//         console.log(req.body)
//         let { userEmail, userAddressh, userPhone, userPassword } = req.body
//         let obj = {
//             userEmail,
//             userAddressh,
//             userPhone,
//             userPassword
//         }
//         let otp = String(Math.random() * 9999).slice(0, 4)
//         myOtp.set("otp",otp)
//         const info = await transporter.sendMail({
//             from: '"OTP" <er.farhannagori@gmail.com>',
//             to: userEmail,
//             subject: "Hello ✔ OTP",
//             text: "OTP", // plain‑text body
//             html: `<b>OTP</b>,${otp}`, // HTML body
//         });
//         res.send({
//             status: 1,
//             massage: "send otp"
//         })
//     } catch (error) {
//         res.send(error)
//         console.log(error)
//     }
// }

// export let checkOtp = async (req, res) => {
//     try {
//          let { userName, userEmail, userAddressh, userPhone, userPassword,otp } = req.body
//         console.log(req.body)
//         let storeotp = myOtp.get("otp")
//         let obj = {
//             userName,
//             userEmail,
//             userAddressh,
//             userPhone,
//             userPassword
//         }
      
//         if(storeotp==otp){
//             let user = await userModel(obj)
//             let userres = await user.save()
 
//             res.send({
//                      status:1,
//                      masssage:"user register",
//                      userres
//                  })
//         }
//         else{
//             res.send({
//                 status:0,
//                 masssage:"user otp not valid",
//                 error
//             })

//         }
        

//     } catch (error) {
//         res.send({
//                 status:0,
//                 masssage:"user register error",
//                 error
//             })
//     }
// }

import userModel from "../../MODELS/userAuthModel.js";
import bcrypt from "bcrypt";
import { transporter } from "../../ROUTES/mailconfig.js";

let myOtp = new Map();

export const userRegister = async (req, res) => {
  try {
    const { userEmail, userAddressh, userPhone, userPassword } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    myOtp.set("otp", otp);

    await transporter.sendMail({
      from: '"OTP" <er.farhannagori@gmail.com>',
      to: userEmail,
      subject: "Registration OTP",
      html: `<b>Your OTP is: ${otp}</b>`,
    });

    res.send({
      status: 1,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.send({
      status: 0,
      message: "OTP send failed",
      error,
    });
  }
};

export const checkOtp = async (req, res) => {
  try {
    const { userName, userEmail, userAddressh, userPhone, userPassword, otp } =
      req.body;

    const storedOtp = myOtp.get("otp");
    if (storedOtp !== otp) {
      return res.send({
        status: 0,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = new userModel({
      userName,
      userEmail,
      userAddressh,
      userPhone,
      userPassword: hashedPassword,
    });

    const userRes = await user.save();

    res.send({
      status: 1,
      message: "User registered successfully",
      data: userRes,
    });
  } catch (error) {
    res.send({
      status: 0,
      message: "Registration failed",
      error,
    });
  }
};

export let login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Check user exists
    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.send({
        status: 0,
        message: "Email not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.send({
        status: 0,
        message: "Incorrect password",
      });
    }

    res.send({
      status: 1,
      message: "Login successful",
      data: user,
    });

  } catch (error) {
    res.send({
      status: 0,
      message: "Login error",
      error,
    });
  }
};