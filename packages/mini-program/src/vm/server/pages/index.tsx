import { TickApp } from '../componnets/TickApp';

export default function Index (props) {
  return <TickApp  {...props} />
}

Index.getInitialProps = (context) => {
  const { __TICK_MINI_PROGRAM } = context.req;

  return {
    __TICK_MINI_PROGRAM
  }
}