
class Logger {
  constructor(options = {}) {
    this.level = options.level || 'info'; // Default log level is 'info'
    this.destination = options.destination || 'console'; // Default destination is console
    this.logStream = options.logStream || process.stdout; // Default log stream is process.stdout
  }

  log(message, level = 'info') {
    if (this.shouldLog(level)) {
      const formattedMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`;

      if (this.destination === 'console') {
        this.logToConsole(formattedMessage, level);
      } else if (this.destination === 'file') {
        this.logToFile(formattedMessage);
      } else if (typeof this.destination === 'function') {
        this.destination(formattedMessage);
      } else {
        console.error('Invalid log destination');
      }
    }
  }

  error(message) {
    this.log(message, 'error');
  }

  warn(message) {
    this.log(message, 'warn');
  }

  debug(message) {
    this.log(message, 'debug');
  }

  info(message) {
    this.log(message);
  }

  // Check if the message should be logged based on the log level
  shouldLog(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  // Log message to the console with color-coded output
  logToConsole(message, level) {
    switch (level) {
      case 'error':
        console.error('\x1b[31m%s\x1b[0m', message); // Red color
        break;
      case 'warn':
        console.warn('\x1b[33m%s\x1b[0m', message); // Yellow color
        break;
    case 'info':
        console.info('\x1b[32m%s\x1b[0m', message); // Green color
        break;
      default:
        console.log(message);
    }
  }

  // Log message to a file
  logToFile(message) {
    if (this.logStream && this.logStream.writable) {
      this.logStream.write(message + '\n');
    } else {
      console.error('Log stream is not writable');
    }
  }
}

module.exports = Logger;