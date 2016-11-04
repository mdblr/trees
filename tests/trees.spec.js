'use strict';

const expect = require('chai').expect;
const tree = require('../tree.js');

describe('require tree', () => {
  it('should return methods', () => {
    expect(tree).to.have.all.keys('add','search','insert','del','min','max', 'countNodes');
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

  it('should correctly insert new nodes and ignore duplicates', () => {
    const root = tree.add(10);
    const values = [4,14,8,20,16,6,2,18,14,0,12];
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
    })(root, result);

    expect(result).to.eql(sorted);
  });
});
//'del'
//'min'

describe('testing min function', () => {
  it('should return 0', () => {
    const root = tree.add(15);
    const values = [4,14,9,8,20,16,6,2,18,51,14,0,12,34];

    for (let n of values) {
      tree.insert(root, n);
    }

    const result = tree.min(root);
    expect(result.node.item).to.equal(0);
  });
});

//'max'
describe('testing max function', () => {
  it('should return 51', () => {
    const root = tree.add(15);
    const values = [4,14,9,8,20,16,6,2,18,51,14,0,12,34];

    for (let n of values) {
      tree.insert(root, n);
    }

    const result = tree.max(root);
    expect(result.node.item).to.equal(51);
  });
});

//countNodes
describe('countNodes', () => {
  it('should return 15', () => {
    const root = tree.add(15);
    const values = [4,14,9,8,20,16,6,2,18,51,0,12,34];

    for (let n of values) {
      tree.insert(root, n);
    }

    const result = tree.countNodes(root);
    expect(result).to.equal(values.length + 1)
  })
});
