import dynamic from 'next/dynamic';
import { AppScript } from '../componnets/AppScript';

const TickApp = dynamic(import('../componnets/TickApp'), { ssr: false })

export default function Index (props) {
  return <>
    <AppScript {...props} />
    <TickApp {...props} />
  </>
}

Index.getInitialProps = (context) => {
  const { __TICK_MINI_PROGRAM } = context.req;

  return {
    __TICK_MINI_PROGRAM
  }
}