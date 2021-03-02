import { Component } from 'react';

export default class NavigationController extends Component {
  public iframe: HTMLIFrameElement | null = null;

  render () {
    return <iframe src="/pages" ref={ref => this.iframe = ref}>
      <style jsx>{`
        iframe {
          margin: 0;
          border: none;
        }
      `}</style>
    </iframe>
  }

}