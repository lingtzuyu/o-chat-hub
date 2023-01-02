require('dotenv').config();

const { RATE_LIMIT_WINDOW, RATE_LIMIT_COUNT } = process.env;

const WINDOW = RATE_LIMIT_WINDOW || 1;
const QUOTA = RATE_LIMIT_COUNT;

async function rateLimiter(token) {
  const replies = await Cache.multi()
    .set(token, 0, { EX: WINDOW, NX: true })
    .incr(token)
    .exec();

  const reqCount = replies[1];
  if (reqCount > QUOTA) {
    return {
      status: 429,
      message: `Quota of ${QUOTA} per ${WINDOW}sec exceeded`,
    };
  }
  return { status: 200, message: 'OK' };
}

const rateLimiterRoute = async (req, res, next) => {
  if (!Cache.ready) {
    // Redis is not connected
    return next();
  }
  try {
    const token = req.ip;
    const result = await rateLimiter(token);
    if (result.status == 200) {
      return next();
    } else {
      res.status(result.status).send(result.message);
      return;
    }
  } catch (e) {
    return next();
  }
};

module.exports = { rateLimiterRoute };
