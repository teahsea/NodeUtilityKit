function memoize(func) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      // If you console log here you can see if it's actually calling your function or not;
      // console.log("Calling Function...");
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  };
}

module.exports = memoize;