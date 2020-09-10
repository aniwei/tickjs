const { QuadTree, Point, Box } = require('js-quadtree');
// const opencv = require('node-opencv');

const [
  IMAGE,
  TEXT
] = [
  'Image',
  'Text'
];

class Node {
  constructor (node) {
    const { props, type } = node;
    const { attrs } = props;
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
    this[1] = new Point(this.x, this.y, { position: 'RIGHT_TOP' });
    this[2] = new Point(this.x, this.y, { position: 'LEFT_BOTTOM' });
    this[3] = new Point(this.x, this.y, { position: 'RIGHT_BOTTOM' });
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
          if (child.nextSibling) {
            child.nextSibling.prevSibling = null;
            child.nextSibling = null;
          }
        } else if (
          // last child;
          index > 0 && 
          index === (this.childNodes.length - 1)
        ) {
          const prev = child.prevSibling;
          prev.nextSibling = null;
          
          child.prevSibling = null;
          child.nextSibling = null;
        } else {
          const prev = child.prevSibling;
          const next = child.nextSibling;

          next.prevSibling = prev;
          prev.nextSibling = child.nextSibling;

          child.nextSibling = null;
          child.prevSibling = null;
        }

        this.childNodes.splice(index, 1);
      }
    }
  }

  intersect (child) {
    const test = this.hitTest(child);

    if (test.type === 'Intersect') {
      return test;
    }

    return false;
  }

  contains (child) {
    const test = this.hitTest(child);

    if (test.type === 'Intersect') {
      const minSquare = Math.min(child.square, this.square);

      if (minSquare === test.width * test.height) {
        return test;
      }
    }

    return false;
  }

  hitTest (child) {
    const x = Math.max(this.x, child.x);
    const y = Math.max(this.y, child.y);
    const width = Math.min(this.x + this.width, child.x + child.width) - x;
    const height = Math.min(this.y + this.height, child.y + child.height) - y;
    const rect = {
      x,
      y,
      width,
      height,
      square: width * height
    }

    if (
      width === 0 && height > 0 ||
      width > 0 && height === 0 ||
      width === 0 && height === 0 
    ) {
      // 相切
      return {
        ...rect,
        type: 'Tangency'
      }
    } else if (width > 0 && height > 0) {
      // 相交
      return {
        ...rect, 
        type: 'Intersect'
      }
    } else {
      return { 
        ...rect,
        type: 'Disjoint'
      }
    }
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

function handleDOMTreeRelation (node) {
  let currentNode = node;

  while (currentNode) {
    if (
      currentNode.type === IMAGE ||
      currentNode.type === TEXT
    ) {
      currentNode = currentNode.nextSibling;
    } else {
      let nextNode = currentNode.nextSibling;
      while (nextNode) {
        let rect;
  
        // 包含（包含内切）
        if (currentNode.contains(nextNode)) {
          const next = nextNode.nextSibling;
          currentNode.appendChild(nextNode);
          nextNode = next;
        // 相交
        } else if (rect = currentNode.intersect(nextNode)) {
          const maxSquare = Math.max(currentNode.square, nextNode.square);
          const minSquare = Math.min(currentNode.square, nextNode.square);
  
          // 面积比例
          if (maxSquare / minSquare > 5) {
            const next = nextNode.nextSibling;
            currentNode.appendChild(nextNode);
            nextNode = next;
          // 面积占比
          } else {
            if (rect.square / minSquare > 0.5) {
              const next = nextNode.nextSibling;
              currentNode.appendChild(nextNode);
              nextNode = next;
            } else {
              nextNode = nextNode.nextSibling;
            }
          }
        } else {
          nextNode = nextNode.nextSibling;
        }
      }
  
      if (currentNode.childNodes.length > 1) {
        handleDOMTreeRelation(currentNode.childNodes[0]);
      }
  
      currentNode = currentNode.nextSibling;
    }

  }
} 

function handleDOMTreeSiblingRelation (node) {
  const { childNodes } = node;

  if (childNodes.length > 1) {
    

    // 进行检测
  } else if (childNodes.length > 0) {
    handleDOMTreeRelation(childNodes[0]);
  }
}

function buildDOMTree (schema) {
  const node = schemaTransformer(schema);

  handleDOMTreeRelation(node);
  handleDOMTreeSiblingRelation(node);
  sortDOMTree(node);
  // handleDOMTreeSiblingRelation(node);

  return node;
}

function sortDOMTree (node) {
  let currentNode = node;

  while (currentNode) {
    let nextNode = currentNode.nextSibling;

    while (nextNode) {
      next = nextNode.nextSibling;
      if (currentNode.y > nextNode.y) {
        const currentNodePrev = currentNode.prevSibling;
        const currentNodeNext = currentNode.nextSibling;

        currentNode.prevSibling = nextNode.nextSibling;
        currentNode.prevSibling = nextNode.prevSibling;

        nextNode.nextSibling = currentNodeNext;
        nextNode.prevSibling = currentNodePrev; 
      }

      nextNode = next;
    }

    if (currentNode.childNodes.length > 0) {
      sortDOMTree(currentNode.childNodes[0]);
    }

    currentNode = currentNode.nextSibling;
  }
}

const data = {"taskId":"D33E686D-8507-4930-9C35-19BA26CB4821","pluginVersion":"2.3.0","reference":"sketch","type":"Block","id":"Block_1","__VERSION__":"2.0","props":{"style":{"width":750,"height":129},"attrs":{"x":0,"y":0}},"children":[{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FFFFFF","width":750,"height":128},"attrs":{"x":0,"y":1}},"type":"Shape","selfId":"A9EF5B97-11BE-4661-BF70-8A6E40CD43CA","children":[],"originType":"Other","nodeLayerName":"bg","id":"Shape_0"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#EAEAEA","width":750,"height":1},"attrs":{"x":0,"y":0}},"type":"Shape","selfId":"8A16EB0C-74E2-4CA1-BF44-F2E83947F839","children":[],"originType":"Other","nodeLayerName":"Devider","id":"Shape_1"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FF552E","borderTopLeftRadius":6,"borderTopRightRadius":6,"borderBottomRightRadius":6,"borderBottomLeftRadius":6,"width":380,"height":96},"attrs":{"x":340,"y":17}},"type":"Shape","selfId":"62FA90EC-3725-4E12-939C-1417744BEB8F","children":[],"originType":"Other","nodeLayerName":"Rectangle 4 Copy","id":"Shape_2"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 255, 255, 1)","fontFamily":"PingFang SC","fontSize":32,"fontWeight":600,"lineHeight":40,"width":128,"height":40},"attrs":{"x":466,"y":45,"text":"立即支付","lines":1}},"type":"Text","selfId":"F9BE5C27-B4E0-45A6-B79A-559DFDB070EC0","children":[],"originType":"Other","nodeLayerName":"立即支付","id":"Text_3"},{"__VERSION__":"2.0","props":{"style":{"width":20,"height":20},"attrs":{"x":200,"y":36,"source":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/f9ef22c0f33011ea8297c9f0e47bcb46.png"}},"type":"Image","selfId":"155790AC-1A7A-4AA5-B8E8-10E3874AFC17","children":[],"originType":"Other","nodeLayerName":"形状","id":"Image_4"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(51, 51, 51, 1)","fontFamily":"PingFang SC","fontSize":28,"fontWeight":400,"lineHeight":40,"width":84,"height":40},"attrs":{"x":30,"y":45,"text":"预付金","lines":1}},"type":"Text","selfId":"1E132EF2-5AC1-44AA-9220-AE846DCC01720","children":[],"originType":"Other","nodeLayerName":"预付金","id":"Text_5"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 85, 46, 1)","fontFamily":"PingFang SC","fontSize":28,"fontWeight":500,"lineHeight":56,"width":28,"height":56},"attrs":{"x":114,"y":38,"text":"￥","lines":1}},"type":"Text","selfId":"30077F9E-705E-4E02-B5FC-4BE97143604D0","children":[],"originType":"Other","nodeLayerName":"￥30","id":"Text_6"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 85, 46, 1)","fontFamily":"PingFang SC","fontSize":40,"fontWeight":500,"lineHeight":56,"width":45,"height":56},"attrs":{"x":142,"y":36,"text":"30","lines":1}},"type":"Text","selfId":"30077F9E-705E-4E02-B5FC-4BE97143604D1","children":[],"originType":"Other","nodeLayerName":"￥30","id":"Text_7"}],"name":"编组","artboardImg":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/fa2240b0f33011eab1ebc9810b726468.png"}


const tree = buildDOMTree(data);



debugger;

module.exports = buildDOMTree;