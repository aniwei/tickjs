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