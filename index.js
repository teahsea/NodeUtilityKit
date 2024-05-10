const fs = require('fs');

const ToolKit = require('./toolkit/src/index');

// Create a new logger instance
const logger = new ToolKit.Logger({ level: 'debug', destination: 'console' });

testLogger();
testMemoize();


function testLogger() {
    // Example usage of the logger
    logger.debug('This is a debug message');
    logger.info('This is an informational message');
    logger.warn('This is a warning message');
    logger.error('This is an error message');


    // Create a new logger instance
    // Create a writable stream to a log file
    const logStream = fs.createWriteStream('app.log', { flags: 'a' });
    const loggerFile = new ToolKit.Logger({ level: 'debug', destination: 'file', logStream });

    // Example usage of the logger
    loggerFile.debug('\n\n\nThis is a debug message in file');
    loggerFile.info('This is an informational message in file');
    loggerFile.warn('This is a warning message in file');
    loggerFile.error('This is an error message in file');
}

function testMemoize() {
    // Example usage of memoize function
    const memoizedMultiply = ToolKit.memoize((a, b) => {
        // Expensive computation
        return a * 100 * b;
    });
  
  console.log(memoizedMultiply(10, 40)); // Result computed
  console.log(memoizedMultiply(10 ,40)); // Result retrieved from cache
}
