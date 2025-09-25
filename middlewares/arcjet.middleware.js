import aj from "../config/arcjet.js";

// KULLANICININ SINIRSIZ SAYIDA İSTEK ATMASINI ENGELLEYECEK, VİRÜS VE BENZERİ SALDIRILARA KARŞI GÜVENLİK (RATE LIMIT, BOT PROTECTION)

const arjectMiddleware = async (req, res, next) => {
    try {
        
        const decision = await aj.protect(req);

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) return res.status(429).json({error: "Rate limit exceeded"});

            if(decision.reason.isBot()) return res.status(403).json({error: "Bot detected"});

            return res.status(403).json({error: "Access denied"});
        }

        next();

    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
}

export default arjectMiddleware;