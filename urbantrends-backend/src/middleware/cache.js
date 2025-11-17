import redis from "../redis.js";

export const cacheMiddleware = (key, ttl = 60) => async (req, res, next) => {
    try {
        const cached = await redis.get(key);
        if (cached) return res.json(JSON.parse(cached));

        res.sendResponse = res.json;
        res.json = (body) => {
            redis.set(key, JSON.stringify(body), 'EX', ttl);
            res.sendResponse(body);
        };
        next();
    } catch (err) {
        console.error(err);
        next();
    }
};