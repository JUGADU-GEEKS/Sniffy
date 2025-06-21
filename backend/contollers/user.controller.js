import { User } from '../models/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    console.log("Register endpoint hit. Request body:", req.body);
    const { deviceCode, email, phone, password } = req.body;
    try {
        if (!deviceCode || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            deviceCode,
            email,
            phone,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account Created Succesfully",
            success: true
        })
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: "Server error during registration.",
            error: e.message,
            success: false
        });
    }
}

export const login = async (req, res) => {
    console.log("Login endpoint hit. Request body:", req.body);
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found, Signup !",
                success: false
            })
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({
                message: "Something is wrong",
                success: false
            })
        }
        const tokenData = {
            userid: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '15d' })
        
        const userResponse = {
            _id: user._id,
            email: user.email,
            deviceCode: user.deviceCode,
            phone: user.phone
        }

        return res.status(200).cookie("token", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back`,
            user: userResponse,
            success: true
        })
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Server error during login.",
            error: e.message,
            success: false
        });
    }
}

export const liveStatusById = async (req, res) => {
    const { id: deviceCode } = req.params;
    try {
        const user = await User.findOne({ deviceCode });
        if (!user) {
            return res.status(400).json({
                message: "Wrong device ID",
                success: false
            })
        }
        const liveStatus = user.liveStatus;
        return res.status(200).json({
            liveStatus,
            message: "Live Status Sent",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const previousAlertsById = async (req, res) => {
  const { id: deviceCode } = req.params;

  try {
    const user = await User                       
      .findOne({ deviceCode })
      .select('alerts')
      .lean();                                    

    if (!user) {
      return res.status(404).json({
        message : 'Wrong device ID',
        success : false,
      });
    }

    // convert the alerts array → dictionary of dictionaries
    const alertDict = Object.fromEntries(
      user.alerts.map((alert, idx) => [idx, alert])
    );
    /*  ―― same result with reduce:
        const alertDict = user.alerts.reduce((o,a,i)=>(o[i]=a,o),{});
    */

    return res.status(200).json({
      alerts  : alertDict,
      message : 'All alerts sent',
      success : true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message : 'Server error',
      success : false,
    });
  }
};``