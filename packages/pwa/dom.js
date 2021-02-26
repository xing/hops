/* eslint-env browser */

import { internal } from 'hops-bootstrap';
const { getConfig } = internal;

const isLocalHost = (host) => {
  return (
    host === 'localhost' ||
    host === '[::]' ||
    host === '[::1]' ||
    host === '0.0.0.0' ||
    host.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
};

export default function installServiceWorker() {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      return reject(
        new Error('ServiceWorkers are not supported in this browser')
      );
    }

    if (
      window.location.protocol === 'https:' ||
      isLocalHost(window.location.hostname)
    ) {
      window.addEventListener('load', () => {
        resolve(navigator.serviceWorker.register(getConfig().workerPath));
      });
    }
  });
}
