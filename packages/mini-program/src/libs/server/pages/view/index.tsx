import { ViewScript } from '../../componnets/ViewScript';
import AppView from '../../componnets/AppView'

export default function View (props) {
  return <>
    <ViewScript {...props} />
    <AppView {...props} />
  </>
}

View.getInitialProps = (context) => {
  const { __TICK_CONTEXT, __NEXT_INIT_QUERY } = context.req;

  return {
    __TICK_CONTEXT,
    route: __NEXT_INIT_QUERY.r,
    path: __NEXT_INIT_QUERY.r.replace(/\.html$/, ''),
    viewId: __NEXT_INIT_QUERY.i
  }
}