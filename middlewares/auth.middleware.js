import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

/**PURPOSE/DEFINITON
 * some routes such as user details should be private, so we need to check if the user is authenticated or not. For this, we create a middleware that will check if the user is authenticated or not.
 * 
 * AUTHORIZATION MIDDLEWARE can be also used for admin roles to check if the user is admin or not
 *  */  

/**let token AMACI:
 * Önce değişken tanımla, sonra koşula göre ata
 * let token; → “token adında bir değişkenim olacak ama şimdilik değeri yok” demek.
 * Eğer koşul sağlanmazsa token undefined olarak kalır.
 * Eğer koşul sağlanırsa, token'a header içindeki gerçek token değeri atanır.
 * Böylece if bloğundan sonra da token değişkenine erişebilirsin. 
 * */

/**EXAMPLE USAGE OF AUTHORIZE MIDDLEWARE
 * someone making a request get user details -> authorize middleware -> verify ("who is trying to get user details?") -> if valid -> next -> get user details
 */

const authorize = async (req, res, next) => {
    try {
        
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; //Bearer:[0] token:[1]
        }

        if(!token) return res.status(401).json({message: "Unauthorized"}); 

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if(!user) return res.status(401).json({message: "Unauthorized"});

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({message: "Unauthorized", error: error.message}) //401: unauthorized
    }
}

export default authorize;