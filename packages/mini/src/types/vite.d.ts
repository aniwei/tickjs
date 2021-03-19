import { Plugin } from 'vite';

declare type ViteOptions = {
  port: number,
  plugins?: Plugin[],
  alias?: {
    [key: string]: string
  }
}