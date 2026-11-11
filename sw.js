const CACHE='jianzhao-v4.2.2-20261109f';
const STATIC=['./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jianzhao-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;const r=e.request;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(resp=>{if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp))}return resp}).catch(()=>caches.match('./index.html')))}
else{e.respondWith(caches.match(r).then(c=>c||fetch(r).then(resp=>{if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(ca=>ca.put(r,cp))}return resp})))} });
