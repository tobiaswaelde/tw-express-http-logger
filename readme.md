# HTTP Logger Middleware

## Basic Usage

##### logger.ts
```ts
import express, { Application } from 'express';
import httpLogger from 'tw-express-http-logger';

// Create new express application
const app: Application = express();

// Apply middleware
app.use(httpLogger());

export default app;
```