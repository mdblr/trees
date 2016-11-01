'use strict';

const expect = require('chai').expect;
const tree = require('../tree.js');

describe('require tree', () => {
  it('should return an object', () => {
    expect(tree).to.be.an('object');
  });

  it('should return methods', () => {
    expect(tree).to.have.all.keys('add','search','insert','del','min','max');
  });
});


//'add'

describe('create a tree root', () => {
  const root = tree.add(3);
  it('should create the root of the tree', () => {
    expect(root.item).to.equal(3);
    expect(root.left).to.be.null;
    expect(root.right).to.be.null;
  });
});
//'search'
//'insert'

describe('create a tree with two leaves', () => {
  it('should return a bst', () => {
    const root = tree.add('3');
    tree.insert(root,4);
    tree.insert(root,2);
    expect(root.left.item).to.equal(2);
    expect(root.right.item).to.equal(4);
  })

  it('should correctly insert new nodes based on values', () => {
    const root = tree.add(10);
    const values = [4,14,8,20,16,6,2,18,0,12];
    const sorted = [0,2,4,6,8,10,12,14,16,18,20];
    const result = [];

    for (let n of values) {
      tree.insert(root,n);
    }

    // Steven S. Skienna
    (function traverse(tree, arr) {
      if (tree !== null) {
        traverse(tree.left, arr);
        arr.push(tree.item);
        traverse(tree.right, arr);
      }
      return arr;
    }(root, result));

    expect(result).to.eql(sorted);
  })
})
//'del'
//'min'
//'max'
