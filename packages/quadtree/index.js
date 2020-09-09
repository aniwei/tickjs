const { QuadTree, Box, Point } = require('js-quadtree');

class Node {
  constructor (node) {
    const { props } = node;
    const { attrs, type } = props;
    const { height, width, ...style } = props.style;

    this.ref = node;
    this.style = style;
    this.type = type;

    this.x = attrs.x;
    this.y = attrs.y;

    this.height = height;
    this.width = width;

    // 中心坐标
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;

    this.square = this.width * this.height;

    this.parentNode = null;
    this.nextSibling = null;
    this.prevSibling = null;
    this.childNodes = [];

    this[0] = new Point(this.x, this.y, { position: 'LEFT_TOP' });
    this[1] = new Point(this.x + width, this.y, { position: 'RIGHT_TOP' });
    this[2] = new Point(this.x, this.y + height, { position: 'LEFT_BOTTOM' });
    this[3] = new Point(this.x + width, this.y + height, { position: 'RIGHT_BOTTOM' });
  }

  appendChild (child) {
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    const lastChild = this.childNodes[this.childNodes.length - 1];
    
    this.childNodes.push(child);
    child.parentNode = this;

    if (lastChild) {
      child.prevSibling = lastChild;
      lastChild.nextSibling = child;
    }
  }

  removeChild (child) {
    if (child.parentNode === this) {
      const index = this.childNodes.indexOf(child);

      if (index > -1) {
        // first child;
        if (index === 0) {
          child.nextSibling.prevSibling = null;
          child.nextSibling = null;
        } else if (
          // last child;
          index > 0 && 
          index === (this.childNodes.length - 1)
        ) {
          const prev = child.prevSibling;
          const next = child.nextSibling;

          child.prevSibling = null;
          child.nextSibling = null;

          prev.nextSibling = next;
          next.prevSibling = prev;
        } else {
          const prev = child.prevSibling;
          prev.nextSibling = null;
        }

        this.childNodes.splice(index, 1);
      }
    }
  }

  contains (child) {
    if (child.parentNode === this) {
      const index = this.childNodes.indexOf(child);
  
      return index > -1;
    }

    return false;
  }

  hitTest (child) {
    const { width, height, centerX, centerY } = child;

    const distanceX = this.width / 2 + width / 2;
    const distanceY = this.height / 2 + height / 2;

    return Math.abs(this.centerX - centerX) - distanceX  < 0 && 
      Math.abs(this.centerY - centerY) - distanceY < 0
  }
}

const schemaTransformer = (schema, parent) => {
  const node = new Node(schema);
  const { children } = schema;

  children.forEach(child => {
    schemaTransformer(child, node);
  });

  if (parent) {
    parent.appendChild(node);
  }

  return node;
}

function handleDOMTreeRelation (node, quadtree) {
  let next = node;

  const newChildNodes = node.childNodes.slice();
  const restChildNodes = [];

  do {


    if (next.childNodes.length > 0) {
      const child = next.childNodes[0];

      handleDOMTreeRelation(child, quadtree);
    }

    if (next.nextSibling) {
      const box = new Box(
        next.x, 
        next.y, 
        next.width, 
        next.height
      );

      quadtree.clear();
      quadtree.insert(next.nextSibling[0]);
      quadtree.insert(next.nextSibling[1]);
      quadtree.insert(next.nextSibling[2]);
      quadtree.insert(next.nextSibling[3]);

      const result = quadtree.query(box);

      if (result.length === 4) {
        next.appendChild(next.nextSibling);
      }
    }

  next = next.nextSibling;

  } while (next = node.nextSibling);
} 

function buildDOMTree (schema) {
  const node = schemaTransformer(schema);
  const box = new Box(0, 0, 1000, 1000);
  const quadtree = new QuadTree(box);

  debugger;
  handleDOMTreeRelation(node, quadtree);

  debugger;
}


const handleChildRelation = function (currentNode, nextNode, quadtree) {
  if (next) {
    const box = new Box(
      currentNode.x,
      currentNode.y,
      currentNode.width,
      currentNode.height
    );

    quadtree.clear();
  
    quadtree.insert(nextNode[0]);
    quadtree.insert(nextNode[1]);
    quadtree.insert(nextNode[2]);
    quadtree.insert(nextNode[3]);

    const result = quadtree.query(box);

    
    const isIntersect = result.length > 0;
    const isContain = result.length === 4;

    if (isIntersect) {
      // 
      if (isContain) {
        currentNode.appendChild(currentNode);
      }

      return true;
    }
  }

  return false;
}


const handleChildNodesRelation = function (childNodes, quadtree) {  
  const rest = [];
  const lastIndex = childNodes.length;
  const index = 0;  

  while (index < lastIndex) {
    let node = childNodes[index];
    const box = new Box(
      node.x,
      node.y,
      node.width,
      node.height
    );

    let i = 0;

    while (i < lastIndex) {
      if (i === index) {
        continue;
      }

      let currentNode = childNodes[i];
      quadtree.clear();
  
      quadtree.insert(currentNode[0]);
      quadtree.insert(currentNode[1]);
      quadtree.insert(currentNode[2]);
      quadtree.insert(currentNode[3]);
  
      const result = quadtree.query(box);
  
      // 相交
      const isIntersect = result.length > 0;
      const isContain = result.length === 4;

      if (isIntersect) {
        // 
        if (isContain) {
          node.appendChild(currentNode);
        }

        i++;
      }

    }
  }
}

const data = {"taskId":"1002F900-ECEC-48FC-B389-554AB00B8D15","pluginVersion":"2.3.0","reference":"sketch","type":"Block","id":"Block_1","__VERSION__":"2.0","props":{"style":{"width":375,"height":667},"attrs":{"x":0,"y":0}},"children":[{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#D8D8D8","borderWidth":1,"borderStyle":"solid","borderColor":"#979797","width":375,"height":667},"attrs":{"x":0,"y":0}},"type":"Shape","selfId":"4A630207-71CA-4886-A8C3-77FE6C21C644","children":[],"originType":"Other","nodeLayerName":"矩形","id":"Shape_0"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#DF8484","borderWidth":1,"borderStyle":"solid","borderColor":"#979797","width":375,"height":298},"attrs":{"x":0,"y":0}},"type":"Shape","selfId":"0EA5EC77-5FDF-48FA-A57D-1401B251313D","children":[],"originType":"Other","nodeLayerName":"矩形","id":"Shape_1"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#5A1717","borderWidth":1,"borderStyle":"solid","borderColor":"#979797","width":301,"height":185},"attrs":{"x":37,"y":206}},"type":"Shape","selfId":"DCB3B298-6642-4D8B-8CC3-49E4A91EE949","children":[],"originType":"Other","nodeLayerName":"矩形","id":"Shape_2"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FFBBBB","borderWidth":1,"borderStyle":"solid","borderColor":"#979797","width":258,"height":124},"attrs":{"x":59,"y":236}},"type":"Shape","selfId":"48FE7042-9955-4027-A6C1-CBACA8D9590D","children":[],"originType":"Other","nodeLayerName":"矩形","id":"Shape_3"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#D8D8D8","borderWidth":1,"borderStyle":"solid","borderColor":"#979797","width":301,"height":158},"attrs":{"x":37,"y":426}},"type":"Shape","selfId":"F1C3354A-FE12-4CB8-83AA-49F10896B1D3","children":[],"originType":"Other","nodeLayerName":"矩形","id":"Shape_4"}],"name":"Test","artboardImg":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/c84d8f10f26b11ea8454fbe7f7a82dac.png"}


buildDOMTree(data);

module.exports = buildDOMTree;