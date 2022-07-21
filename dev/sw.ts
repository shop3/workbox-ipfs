/// <reference lib="WebWorker" />
import { clientsClaim } from 'workbox-core';
import { initialize } from '../src';

declare const self: ServiceWorkerGlobalScope;

initialize({
  config: {
    Addresses: {
      Gateway: 'https://gateway.ipfs.io',
    },
  },
});

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

clientsClaim();
