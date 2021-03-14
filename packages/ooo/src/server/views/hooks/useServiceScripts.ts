import { useScript } from './useScript';

export function useServiceScripts (props) {
  useScript([
    `/WAService.js`, 
    `/appservice`
  ], () => {    
    props.onLoad();
  });
}
