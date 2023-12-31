import { shouldIgnorePath } from '@/common';
import { Global, Injectable, NestMiddleware } from '@nestjs/common';
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Global()
@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (shouldIgnorePath(req.path)) {
      return next();
    }
    const correlationKeys = [
      'Correlation-Id',
      'X-Correlation-Id',
      'x-correlation-id',
    ];
    const headers = req.headers;
    let correlationId: string;
    for (const header in headers) {
      if (correlationKeys.includes(header)) {
        correlationId = headers[header] as string;
        delete headers[header];
        break;
      }
    }
    if (!correlationId) {
      correlationId = crypto.randomUUID();
      req.headers['x-correlation-id'] = correlationId;
    } else {
      req.headers['x-correlation-id'] = correlationId;
    }
    res.setHeader('x-correlation-id', correlationId);
    next();
  }
}
