import { useScript } from '../../hooks/useScript';

export default function View (props) {
  useScript(`/uiwebview`);

  return null;
}

View.getInitialProps = (context) => {
  const { __TICK_MINI_PROGRAM } = context.req;

  return {
    __TICK_MINI_PROGRAM
  }
}