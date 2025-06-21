import express from "express";
import { last5Alerts, receiveAlert } from "../contollers/alert.controller.js";

const router = express.Router();

router.post("/alert", receiveAlert);
router.get('/getLastAlerts', last5Alerts);


export default router;