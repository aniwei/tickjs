import { TickDOMNode } from "./TickDOMNode";

export enum NodeType {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  ENTITY_REFERENCE_NODE = 5,
  COMMENT_NODE = 6,
  PROCESSING_INSTRUCTION_NODE = 7,
  DOCUMENT_NODE = 9
}

export type UpdatePayload = {
  updator: TickDOMNode,
  path: string,
  value: any
}


export function camelcase (string) {
  return string.replace(/-([a-z]|[0-9])/ig, (all, letter) => {
    return (letter + '').toUpperCase();
  })
}

export function dehydrateProps (node, defaultProps) {
  const props: any[] = [];

  for (const prop of defaultProps) {
    let value = node.getAttribute(prop[0]);

    if (value === undefined) {
      value = prop[2]
    }

    props.push([
      prop[1],
      value
    ])
  }

  return props;
}

export function dehydrateEvents (node, defaultEvents) {
  const props: any[] = [];

  for (const prop of defaultEvents) {
    let value = node.getAttribute(prop[0]);

    props.push([
      prop[1],
      value
    ])
  }

  return props;
}

export function dehydrate (node, datastruct, defaultProps, defaultEvents) {
  for (const prop of defaultProps) {
    let value = node.getAttribute(prop[0]);

    if (value === undefined) {
      value = prop[2]
    }

    return [
      prop[1],
      value
    ]
  }

}