// Versión retirada: este service worker borra la caché de la app vieja,
// se da de baja y manda a las pantallas abiertas al sistema nuevo.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) {
      c.navigate('https://auditoria-habitaciones-nube.vercel.app/');
    }
  })());
});
