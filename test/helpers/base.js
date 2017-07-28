const chai = require('chai');
global.expect = chai.expect;

global.sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.proxyquire = require('proxyquire');
