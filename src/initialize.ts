import { Router } from 'workbox-routing/Router';
import { Route } from 'workbox-routing/Route';
import { create, IPFS, Options } from 'ipfs-core';
import { getResponse } from 'ipfs-http-response';
import * as isIPFS from 'is-ipfs';

declare const self: ServiceWorkerGlobalScope & {
  ipfs: IPFS;
};

export function initialize(options?: Options) {
  self.addEventListener('install', (event) => {
    event.waitUntil(
      create(options).then((ipfs) => {
        self.ipfs = ipfs;
      })
    );
  });

  const router = new Router();

  const ipfsPathRoute = new Route(
    ({ url }) => {
      return isIPFS.ipfsPath(url.pathname);
    },
    async ({ url }) => {
      const ipfsPath = url.pathname;
      const response = await getResponse(self.ipfs, ipfsPath);
      return response;
    }
  );
  router.registerRoute(ipfsPathRoute);

  const ipnsPathRoute = new Route(
    ({ url }) => {
      return isIPFS.ipnsPath(url.pathname);
    },
    async ({ url }) => {
      const ipfsPath = await self.ipfs.resolve(url.pathname).catch(() => url.pathname);
      const response = await getResponse(self.ipfs, ipfsPath);
      return response;
    }
  );
  router.registerRoute(ipnsPathRoute);

  const ipfsUrlRoute = new Route(
    ({ url }) => {
      return isIPFS.ipfsUrl(url.href);
    },
    async ({ url }) => {
      if (isIPFS.ipfsSubdomain(url.href)) {
        const [cid, type] = url.hostname.split('.');
        const path = url.pathname !== '/' ? url.pathname : '';
        const ipfsPath = `/${type}/${cid}${path}`;
        const response = await getResponse(self.ipfs, ipfsPath);
        return response;
      } else {
        const ipfsPath = url.pathname;
        const response = await getResponse(self.ipfs, ipfsPath);
        return response;
      }
    }
  );
  router.registerRoute(ipfsUrlRoute);

  const ipnsUrlRoute = new Route(
    ({ url }) => {
      return isIPFS.ipnsUrl(url.href);
    },
    async ({ url }) => {
      if (isIPFS.ipnsSubdomain(url.href)) {
        const [cid, type] = url.hostname.split('.');
        const path = url.pathname !== '/' ? url.pathname : '';
        const ipfsPath = await self.ipfs.resolve(`/${type}/${cid}${path}`).catch(() => url.href);
        const response = await getResponse(self.ipfs, ipfsPath);
        return response;
      } else {
        const ipfsPath = url.pathname;
        const response = await getResponse(self.ipfs, ipfsPath);
        return response;
      }
    }
  );
  router.registerRoute(ipnsUrlRoute);

  router.addFetchListener();
}
