const tree = (function() {

  return {
    create,
    search,
    insert,
    del,
    min,
    max
  }

  function create(item, parent=false) {
    const node = {};
    node.left = node.right = null;
    node.item = item;
    if (parent) node.parent = parent;

    return node;
  };

  function search(tree, item) {
    let root = tree;
    let parent;

    while(root !== undefined || root.item !== item) {
      parent = root;
      root.item > item ? root = root.left : root = root.right;
    }

    return { root, parent };
  };

  function insert(tree, item) {
    const subTree = this.create(item);
    const leaf = this.search(tree, item);

    leaf.parent.item > item ?
    leaf.parent.left = subTree :
    leaf.parent.right = subTree ;
  };

  function del(tree, item){
    if (!tree) return false;

    const subTree = this.search(tree, item);

    let left = subTree.root.left !== null ? 1 : 0;
    let right = subTree.root.right !== null ? 1 : 0;

    if (left + right < 1) {
      subTree.parent.item > node.item ?
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

  function min(tree, parent) {
    let node = tree;

    return node.left === null ? { node, parent } : min(node.left, node);
  }

  function max(tree, parent) {
    let node = tree;

    return node.right === null ? { node, parent } : max(node.right, node);
  }

})();

module.exports = tree; 
