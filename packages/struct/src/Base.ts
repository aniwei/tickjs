export type DefaultProps = [string, number, any, any];
export type DefaultEvents = [string, number, boolean];

export enum DataStruct {
  TEMPLATE,
  ID,
  CLASS,
  STYLE,
  CHILDREN
}

export enum NextDataStruct {
  NEXT = DataStruct.CHILDREN + 1
}

