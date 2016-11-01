'use strict';

const expect = require('chai').expect;
const tree = require('../tree.js');

describe('require tree', () => {
  it('should return an object', () => {
    expect(tree).to.be.an('object');
  });
});
