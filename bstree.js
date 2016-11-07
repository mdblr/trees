const tree = (function() {

  return {
    add,
    search,
    insert,
    del,
    min,
    max,
    countNodes
  }

  function add(item) {
    const node = {};
    node.left = node.right = null;
    node.item = item;

    return node;
  };

  function search(tree, item) {
    let root = tree,
        parent = null;

    while(root !== null && root.item !== item) {
      parent = root;
      root.item > item ? root = root.left : root = root.right;
    }

    return { root, parent };
  };

  function insert(tree, item) {

    const branch = this.search(tree, item);
    if (branch.root) return false;

    let subTree = this.add(item);
    branch.parent.item > item ?
    branch.parent.left = subTree :
    branch.parent.right = subTree ;
  };

  function del(tree, item){
    if (!tree) return false;

    const subTree = this.search(tree, item);

    let left = subTree.root.left !== null ? 1 : 0;
    let right = subTree.root.right !== null ? 1 : 0;

    if (left + right < 1) {
      subTree.parent.item > item ?
      subTree.parent.left = null :
      subTree.parent.right = null ;
    }
    else if (left + right < 2) {
      const temp = left > 0 ? subTree.left : subTree.right ;
      subTree.parent.item > subTree.item ?
      subTree.parent.left = temp :
      subTree.parent.right = temp ;
    }
    else {
      const min = this.min(subTree.right, subTree);
      if (subTree.parent.item > subTree.item) {
        subTree.parent.left.item = min.node.item;
        min.parent.left = null;
      }
      else {
        subTree.parent.right = min.node.item ;
        min.parent.right = null;
      }
    }
  }

  function min(root) {
    let node = root,
        parent = null;

    while (node.left !== null) {
      parent = node;
      node = node.left;
    }

    return { node, parent };
  }

  function max(root) {
    let node = root,
        parent = null;

    while (node.right !== null) {
      parent = node;
      node = node.right;
    }

    return { node, parent };
  }

  function countNodes(root) {
    if (!root) return 0;
    return countNodes(root.left) + countNodes(root.right) + 1;
  }

})();

module.exports = tree;
