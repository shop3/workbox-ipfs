# Workbox IPFS

IPFS router for a Workbox service worker.

## Table of content
- [How does it work](#how-does-it-work)
- [Installation](#installation)
- [Usage](#usage)
- [Install Dev Environment](#install-dev-environment)
- [Run Dev Application](#run-dev-application)

## How does it work

Once installed and initialized the IPFS router intercept and reply to IPFS urls and paths.

Valid requests are:
- IPFS paths: `/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu`
- IPNS paths: `/ipns/github.com`
- IPFS urls: `https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu`
- IPNS urls: `https://ipfs.io/ipns/github.com`

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
