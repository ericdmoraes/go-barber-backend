// Express
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";

// Routes
import routes from './routes';

// Multer
import uploadconfig from '@config/upload.config';

// Errors
import AppError from '@shared/errors/app.error';

// TypeORM
import 'reflect-metadata';
import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadconfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('<> Serving at http://localhost:3333 <>');
});
