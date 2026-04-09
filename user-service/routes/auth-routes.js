import express from "express";

import { handleLogin, handleVerifyToken } from "../controller/auth-controller.js";
import { sendOtp, verifyOtp } from "../controller/otp-controller.js";
import { forgotPassword, resetPassword } from "../controller/password-reset-controller.js";
import { verifyAccessToken } from "../middleware/basic-access-control.js";

const router = express.Router();

router.post("/login", handleLogin);

router.get("/verify-token", verifyAccessToken, handleVerifyToken);

// F1.1.2 – OTP email verification
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// F3.3 – Password reset via OTP
// F3.3.1: forgot-password is accessible without authentication (login screen)
// F3.3.2: OTP is validated before the password is changed
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
