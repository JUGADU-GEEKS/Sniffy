import express from "express";
import { receiveAlert } from "../contollers/alert.controller.js";

const router = express.Router();

router.post("/alert", receiveAlert);
router.get("/ping", (req, res) => {
  res.send("Alert router is working ✅");
});


export default router;
