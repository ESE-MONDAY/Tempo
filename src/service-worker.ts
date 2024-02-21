import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

// Precache assets using Workbox
precacheAndRoute(self.__WB_MANIFEST || []);


