import { Response } from 'express';

export const handleHttpError = (res: Response, error: unknown, statusCode: number = 500) => {
    const message = (error as Error).message || 'Unknown error occurred';
    res.status(statusCode).json({ message });
};