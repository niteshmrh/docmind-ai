import rateLimit from "express-rate-limit";

// 100 requests / 15 minutes
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// 10 request / 15 min
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

// 5 requests / 60 minutes
const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

// 10 requests / 15 minutes
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// 30 messages / minute / IP
const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user!.id;
  },
  message: {
    success: false,
    message: "Too many chat requests. Please slow down.",
  },
});

// 10 requests / 15 minutes
const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user!.id;
  },
  message: {
    success: false,
    message: "Too many upload requests. Please try again later.",
  },
});

export {
  generalRateLimiter,
  authRateLimiter,
  registerRateLimiter,
  loginRateLimiter,
  chatRateLimiter,
  uploadRateLimiter,
};

/**
 * General API       → 100 / 15 min
 * Register          →   5 / hour
 * Login             →  10 / 15 min
 * Refresh token     →  10 / 15 min
 * Chat messages     →  30 / min / user
 * Uploads           →  10 / 15 min / user
 */
