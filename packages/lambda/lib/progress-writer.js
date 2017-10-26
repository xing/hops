'use strict';

module.exports = function progressWriter (label) {
  console.log(label, '0%');
  var lastPercentage = 0;
  return function (done, total) {
    var percentage = parseInt((done / total) * 100);
    if (percentage % 10 === 0 && percentage > lastPercentage) {
      lastPercentage = percentage;
      console.log(label, percentage + '%');
    }
  };
};
