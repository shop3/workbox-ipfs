# Workbox IPFS

IPFS router for a Workbox service worker.

## Installation

```bash
npm install --save workbox-ipfs
```

## Usage

In the workbox service worker:

```js
import { initialize } from 'workbox-ipfs';

initialize({
  /* IPFS Options */
})
```

On the web page:

```js
const response = await fetch('/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu');
const file = await response.blob();
```

## Install Dev Environment

```bash
npm install

npm run husky:install
```

## Run Dev Application

```bash
npm run develop
```
