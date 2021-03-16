import { Plugin } from 'vite';

export type ViteOptions = {
  port: number,
  plugins?: Plugin[],
  alias?: {
    [key: string]: string
  }
}