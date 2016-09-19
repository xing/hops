'use strict';

var command = (process.env.NODE_ENV === 'production') ? './build' : './serve';

require('./index').runScript(command + '.js');
