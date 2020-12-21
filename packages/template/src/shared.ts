import { TickTemplate } from "./TickTemplate";

export const VARIABLE_NAME = 'i';

export function quotate (string) {
  return `"${string}"`;
}

export function variable (index: number) {
  return quotate(`{{${VARIABLE_NAME}[${index}]}}`);
}
