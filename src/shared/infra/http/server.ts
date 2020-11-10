import 'reflect-metadata';
// Express
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

// Routes

// Multer
import uploadconfig from '@config/upload.config';

// Errors
import AppError from '@shared/errors/app.error';
import routes from './routes';

// TypeORM
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadconfig.uploadsFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('<> Serving at http://localhost:3333 <>');
});
