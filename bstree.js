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

    const child = this.search(tree, item);

    if (child.root === null) return false;

    let left = child.root.left !== null ? 1 : 0;
    let right = child.root.right !== null ? 1 : 0;

    if (left + right < 1) {
      child.parent.item > item ?
      child.parent.left = null :
      child.parent.right = null ;
    }
    else if (left + right < 2) {
      const grandchild = left > 0 ? child.root.left : child.root.right ;
      child.parent.item > child.root.item ?
      child.parent.left = grandchild :
      child.parent.right = grandchild ;
    }
    else {
      const min = this.min(child.root.right, child.root);

      if (min.node.left || min.node.right) {
        this.del(tree, min.node.item);
        child.root.item = min.node.item;
      }
      else if (min.parent.item === child.root.item) {
        child.root.right = null;
        child.root.item = min.node.item;
      }
      else {
        child.root.item = min.node.item;
        min.parent.left = null;
      }
    }
  }

  function min(root, parent=null) {
    let node = root;

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
