import jwt from 'jsonwebtoken';
import { userTokenSchema } from '../validation/toke.validation.js';
const JWT_TOKEN = process.env.JWT_TOKEN;

export const createUserToken = async (payload) => {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if(validationResult.error) throw new Error(validationResult.error.message);

    const payloadValidatedData = validationResult.data;
    const token = jwt.sign(payloadValidatedData, JWT_TOKEN);

    return token;
}

export const validateToken = (token) => {
    try {
        const payload = jwt.verify(token, JWT_TOKEN); 
        return payload;
    } catch(error) {
        return null;
    }
}