import { TickTemplate } from './TickTemplate';

export const VARIABLE_NAME = 'i';

export function quotate (string) {
  return `"${string}"`;
}

export function variable (index: number) {
  return quotate(`{{${VARIABLE_NAME}[${index}]}}`);
}

export function transformDefaultProps (props) {
  const [key, index, value] = props;
  
  return [key, variable(index as number), value]

}

export function transformDefaultEvent (event) {
  return transformDefaultProps(event);
}

export function cloneNode (node) {
  return node.clone();
}

