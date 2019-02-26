declare module 'hops-pwa' {
  function installServiceWorker(): Promise<ServiceWorkerRegistration>;

  export default installServiceWorker;
}
