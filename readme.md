# HTTP Logger Middleware

## Basic Usage

##### logger.ts

TypeScript
```ts
// app.ts

import express, { Application } from 'express';
import httpLogger from 'tw-express-http-logger';

// Create new express application
const app: Application = express();

// Apply middleware
app.use(httpLogger());

export default app;
```

JavaScript
```js
// app.js

const express = require('express');
const httpLogger = require('tw-express-http-logger');

// Create new express application
const app = express();

// Apply middleware
app.use(httpLogger);

module.exports = app;
```