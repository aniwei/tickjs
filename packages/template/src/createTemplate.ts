import { TickTemplate } from './TickTemplate';
import { 
  TickTemplateNode
} from './TickTemplateNode';

export function createTemplate (templateName: string) {
  const template = TickTemplateNode.define(templateName);

  return template
}