'use strict';

var command = (process.env.NODE_ENV === 'production') ? './build' : './serve';

require('../scripts').runScript(command + '.js');
