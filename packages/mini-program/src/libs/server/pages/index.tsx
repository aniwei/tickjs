import dynamic from 'next/dynamic';
const TickApp = dynamic(import('../componnets/TickApp'), { ssr: false })

export default function Index (props) {
  return <TickApp {...props} />
}

Index.getInitialProps = (context) => {
  const { __TICK_CONTEXT } = context.req;

  return {
    __TICK_CONTEXT
  }
}