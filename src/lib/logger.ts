import winston from 'winston'

export function getErrorMessageForLogger(error: unknown): string {
  if (error instanceof Error) {
    // If the error is an instance of Error, return its message
    return JSON.stringify({
      message: error.message,
      stack: error.stack,
    })
  }
  if (error && typeof error === 'object') {
    // If it's an object (and not null), try to stringify it
    try {
      return JSON.stringify(error)
    } catch {
      return 'Error occurred, but could not stringify the object'
    }
  }
  return String(error)
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
})

export default logger
