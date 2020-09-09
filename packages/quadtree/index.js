

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
          prev.nextSibling = null;
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
    let nextNode = currentNode.nextSibling;
    while (nextNode) {
      let rect;
      if (currentNode.contains(nextNode)) {
        const next = nextNode.nextSibling;
        currentNode.appendChild(nextNode);
        nextNode = next;
      } else if (rect = currentNode.intersect(nextNode)) {
        const minSquare = Math.min(currentNode.square, nextNode.square);
        if (rect.square / minSquare > 0.5) {
          const next = nextNode.nextSibling;
          currentNode.appendChild(nextNode);
          nextNode = next;
        } else {
          nextNode = nextNode.nextSibling;
        }
      } else {
        nextNode = nextNode.nextSibling;
      }
    }

    if (currentNode.childNodes.length > 0) {
      handleDOMTreeRelation(currentNode.childNodes[0]);
    }

    currentNode = currentNode.nextSibling;
  }
  
} 

function buildDOMTree (schema) {
  const node = schemaTransformer(schema);

  handleDOMTreeRelation(node);

  return node;
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

const data = {"taskId":"08D38A4E-0CC7-4DA3-8DDD-78170D644107","pluginVersion":"2.3.0","reference":"sketch","type":"Block","id":"Block_1","__VERSION__":"2.0","props":{"style":{"width":348,"height":558},"attrs":{"x":0,"y":0}},"children":[{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FFFFFF","width":348,"height":558,"overflow":"hidden"},"attrs":{"x":0,"y":0}},"type":"Shape","selfId":"194BDF83-DE8D-46BA-8B22-1D25BA55642A","children":[],"originType":"Other","nodeLayerName":"Mask","id":"Shape_0"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#EEEEEE","width":348,"height":348,"overflow":"hidden"},"attrs":{"x":0,"y":0}},"type":"Shape","selfId":"4B0A7096-E625-4540-9DE0-5FDF671165E0","children":[],"originType":"Other","nodeLayerName":"Mask","id":"Shape_1"},{"__VERSION__":"2.0","props":{"style":{"width":348,"height":348},"attrs":{"x":0,"y":0,"source":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/a674f3b0f2bb11ea9553fd310a9145a5.png"}},"type":"Image","selfId":"E7AFDEEB-0C5A-40EF-B943-B195D7C877F3","children":[],"originType":"Other","nodeLayerName":"Bitmap","id":"Image_2"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FFFFFF","borderWidth":1,"borderStyle":"solid","borderColor":"#CCCCCC","borderTopLeftRadius":35,"borderTopRightRadius":35,"borderBottomRightRadius":35,"borderBottomLeftRadius":35,"width":140,"height":70,"overflow":"hidden"},"attrs":{"x":104,"y":313}},"type":"Shape","selfId":"DBF78ACD-557A-4313-B062-45BD5BC8704B","children":[],"originType":"Other","nodeLayerName":"Mask","id":"Shape_3"},{"__VERSION__":"2.0","props":{"style":{"width":126,"height":52},"attrs":{"x":111,"y":322,"source":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/a6af8bb0f2bb11eaaaa21b238a55c21c.png"}},"type":"Image","selfId":"DAB93120-39CB-48C0-B2A6-B3AE47C774CA","children":[],"originType":"Other","nodeLayerName":"Bitmap","id":"Image_4"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(51, 51, 51, 1)","fontFamily":"PingFang SC","fontSize":26,"fontWeight":400,"lineHeight":37,"width":263,"height":37},"attrs":{"x":43,"y":393,"text":"JL新潮女装国际旗舰店","lines":1}},"type":"Text","selfId":"74E89CEF-B735-4B22-96C6-C5A800DD25800","children":[],"originType":"Other","nodeLayerName":"JL新潮女装国际旗舰店","id":"Text_5"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 0, 54, 1)","fontFamily":"PingFang SC","fontSize":24,"fontWeight":400,"lineHeight":33,"width":192,"height":33},"attrs":{"x":78,"y":430,"text":"全场同款新降五折","lines":1}},"type":"Text","selfId":"9110BC39-A618-4861-8D37-70A77E3E29940","children":[],"originType":"Other","nodeLayerName":"全场同款新降五折","id":"Text_6"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"#FF0036","borderTopLeftRadius":4,"borderTopRightRadius":4,"borderBottomRightRadius":4,"borderBottomLeftRadius":4,"width":153,"height":60},"attrs":{"x":179,"y":474}},"type":"Shape","selfId":"4303BD81-64EA-401D-9D7D-8A970D9C34E0","children":[],"originType":"Other","nodeLayerName":"Rectangle 2","id":"Shape_7"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 255, 255, 1)","fontFamily":"PingFang SC","fontSize":24,"fontWeight":400,"lineHeight":33,"width":96,"height":33},"attrs":{"x":208,"y":489,"text":"立即购买","lines":1}},"type":"Text","selfId":"C977E935-9057-486A-8FA9-D7F77356D28E0","children":[],"originType":"Other","nodeLayerName":"立即购买","id":"Text_8"},{"__VERSION__":"2.0","props":{"style":{"backgroundColor":"rgba(255,0,54,0.10)","borderWidth":1,"borderStyle":"solid","borderColor":"#FF0036","borderTopLeftRadius":4,"borderTopRightRadius":4,"borderBottomRightRadius":4,"borderBottomLeftRadius":4,"width":153,"height":60},"attrs":{"x":16,"y":474}},"type":"Shape","selfId":"7C472BC3-D0F2-4D5D-A4CB-E19040B68C04","children":[],"originType":"Other","nodeLayerName":"Rectangle 2","id":"Shape_9"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 0, 54, 1)","fontFamily":"PingFang SC","fontSize":24,"fontWeight":400,"lineHeight":33,"width":24,"height":33},"attrs":{"x":31,"y":488,"text":"券","lines":1}},"type":"Text","selfId":"46DDF6B2-6CE9-4028-A497-302447A3B8450","children":[],"originType":"Other","nodeLayerName":"券","id":"Text_10"},{"__VERSION__":"2.0","props":{"style":{"color":"rgba(255, 0, 54, 1)","fontFamily":"PingFang SC","fontSize":24,"fontWeight":400,"lineHeight":33,"width":68,"height":33},"attrs":{"x":85,"y":488,"text":"¥1000","lines":1}},"type":"Text","selfId":"2E07B323-FF23-4379-A196-F42CE64ABA880","children":[],"originType":"Other","nodeLayerName":"¥1000","id":"Text_11"},{"__VERSION__":"2.0","props":{"style":{"width":1,"height":55},"attrs":{"x":69,"y":478,"source":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/a6d56330f2bb11eaacf9516ab7e9bdd1.png"}},"type":"Image","selfId":"EEE47C41-5271-4AC1-BB59-13BAD9797943","children":[],"originType":"Other","nodeLayerName":"Line","id":"Image_12"}],"name":"模版2","artboardImg":"https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/a7375950f2bb11eaafcbfd9c5fcc6e7a.png"}


const tree = buildDOMTree(data);

debugger;

module.exports = buildDOMTree;