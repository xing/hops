'use strict';

module.exports = function progressWriter(label, logger) {
  if (!logger) {
    return () => {};
  }

  logger.info(`${label} 0%`);
  var lastPercentage = 0;
  return function(done, total) {
    var percentage = parseInt((done / total) * 100);
    if (percentage % 10 === 0 && percentage > lastPercentage) {
      lastPercentage = percentage;
      logger.info(`${label} ${percentage}%`);
    }
  };
};
