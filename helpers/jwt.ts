import jwt from "jsonwebtoken";

interface Payload {
    email: string;
    id: number;
}

const DEFAULT_OPTIONS = {
    expiresIn: '5h'
}

export const signInJwtAuth = (payload: Payload, options=DEFAULT_OPTIONS) => {
    const secretKey = process.env.SECRET as string;
    const token = jwt.sign(payload, secretKey, options)
    return token;
}

export const JwtVerify = (token:string) => {
    try {
        const secretKey = process.env.SECRET as string;
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}