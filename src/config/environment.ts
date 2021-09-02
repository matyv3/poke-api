
export const PORT: number = process.env["PORT"] ? parseInt(process.env["PORT"]) : 3000;
export const JWT_SECRET: string = process.env["JWT_SECRET"] || '$eCr3t';
