import express from "express";
import { receiveAlert } from "../contollers/alert.controller.js";

const router = express.Router();

router.post("/alert", receiveAlert);

export default router;
