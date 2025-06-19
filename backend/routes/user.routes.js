import express from 'express'
import { register, login, liveStatusById, previousAlertsById } from '../contollers/user.controller.js'

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/liveStatusById/:id").get(liveStatusById)
router.route("/allAlertsById/:id").get(previousAlertsById)

export default router;