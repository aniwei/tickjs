import { ViewScript } from '../../componnets/ViewScript';
import AppView from '../../componnets/AppView'

export default function View (props) {
  return <>
    <ViewScript {...props} />
    <AppView {...props} />
  </>
}

View.getInitialProps = (context) => {
  const { __TICK_MINI_PROGRAM, __NEXT_INIT_QUERY } = context.req;

  return {
    __TICK_MINI_PROGRAM,
    route: __NEXT_INIT_QUERY.r,
    webviewId: __NEXT_INIT_QUERY.i
  }
}