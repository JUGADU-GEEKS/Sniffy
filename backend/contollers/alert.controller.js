import { Alert } from "../models/Alert.js";
import { User } from "../models/User.js";
import { sendAlertEmail } from "../utils/nodemailer.js";

export const receiveAlert = async (req, res) => {
    const { deviceCode, alertType, message } = req.body;

    if (!deviceCode || !alertType || !message) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    try {
        const user = await User.findOne({ deviceCode });
        if (!user) {
            return res.status(404).json({ success: false, message: "Device not registered" });
        }
        // Always update liveStatus
        user.liveStatus = alertType;

        if (alertType !== "Normal") {
            const newAlert = await Alert.create({
                deviceCode,
                type: alertType,
                message,
            });
            user.alerts.push(newAlert);
            await sendAlertEmail(user.email, `🚨 Alert: ${alertType}`, message);
        }

        await user.save();

        res.status(200).json({ success: true, message: "Alert processed" });
    } catch (error) {
        console.error("Alert error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const last5Alerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            alerts,
            message: "Fetched Successffully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch alerts", error: error.message });
    }
};