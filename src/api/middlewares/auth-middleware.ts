import { JWT_SECRET } from '@config/environment';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyAuthToken = (token: string) => {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    return jwt.verify(token, JWT_SECRET);
}

const Authorize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return res.status(403).json({ status: 403, message: 'Unauthorized' });

    let token: string = req.headers.authorization;
	let user: any;
	try{
		user = verifyAuthToken(token);
	}catch(err){
		return res.status(403).json({ status: 403, message: 'Unauthorized' });
	}

    if (!user)
      return res.status(403).json({ status: 403, message: 'Unauthorized' });

    req.user = user;
    next();
  };
};

export default Authorize;

