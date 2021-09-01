import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import fs from 'fs'

const Validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
	  if(req.file && req.file.path){
		  fs.unlinkSync(req.file.path)
	  }
	  return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export default Validate
