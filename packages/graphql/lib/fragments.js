'use strict';

var fs = require('fs');

var fetch = require('isomorphic-fetch');

var hopsConfig = require('hops-config');

var fragmentsFile = require('./util').getFragmentsFile();

module.exports = function fetchFragments() {
  return fetch(hopsConfig.graphqlUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: [
        /* eslint-disable indent */
        '       {',
        '         __schema {',
        '           types {',
        '             kind',
        '             name',
        '             possibleTypes {',
        '               name',
        '             }',
        '           }',
        '         }',
        '       }',
        /* eslint-enable indent */
      ].join('\n'),
    }),
  })
    .then(result => result.json())
    .then(result => {
      var filteredData = result.data.__schema.types.filter(function(type) {
        return type.possibleTypes !== null;
      });
      result.data.__schema.types = filteredData;
      return new Promise(function(resolve, reject) {
        fs.writeFile(fragmentsFile, JSON.stringify(result.data), err => {
          if (err) {
            reject(err);
          } else {
            resolve(fragmentsFile);
          }
        });
      });
    });
};
