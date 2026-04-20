import rateLimit from 'express-rate-limit'


// 🌍 GLOBAL (light — apply to all routes)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
 handler: (req, res) => {
    console.log("LIMIT HIT 🚫");
    res.status(429).json({ error: "Too many requests, slow down" });
  }
});



// 🔐 AUTH (login/register)
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 5,
//   message: {
//     success: false,
//     message: "Too many login attempts, please try again later"
//   }
 handler: (req, res) => {
    console.log("LIMIT HIT 🚫");
    res.status(429).json({ error: "Too many login attempts, please try again later" });
  }
});


// 📱 OTP VERIFY (very strict)
export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 5,
//   message: {
//     success: false,
//     message: "Too many OTP attempts, please wait"
//   }
 handler: (req, res) => {
    console.log("LIMIT HIT 🚫");
    res.status(429).json({ error: "Too many OTP attempts, please wait" });
  }
});


