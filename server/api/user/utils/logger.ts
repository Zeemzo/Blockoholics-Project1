import { createLogger, format, transports } from 'winston';
const path = require('path');

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
    )
  ),
  transports: [new transports.Console()]
});
