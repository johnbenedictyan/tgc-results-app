if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>n(e,t),f={module:{uri:t},exports:c,require:o};s[t]=Promise.all(i.map((e=>f[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3KXXon3LgRXhW6fpzfQHl/_buildManifest.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/3KXXon3LgRXhW6fpzfQHl/_middlewareManifest.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/3KXXon3LgRXhW6fpzfQHl/_ssgManifest.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/100-098bb2796157a0c7.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/201-45c375b0553c8996.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/219-a885ed2fa7db2285.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/313-dd50ccbb0e25c5cb.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/418-47269526b5134503.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/444-880369baa8897252.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/479-8d37a742f5c1cea9.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/492-cfb217d69d379d17.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/574-f7d5c584ea7041e0.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/716-7b51bfa0f91fa32e.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/804-8f927954d22d0f77.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/98-54088e042bd25830.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/main-953ef8211fd35280.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/_app-127d046e7ba9b0e5.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard-e5b332834192dd5e.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/batches-045f49df12a84e9f.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/batches/%5Bid%5D-2fda35ddc2658ec9.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/batches/%5Bid%5D/edit-280e51a14720a4fa.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/batches/new-29df2fe01ba9fcbc.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/login-eea7a5a610c2a8f8.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/staff-1590e54ab9885f82.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/students-b3c38f669aeccf07.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/students/%5Bid%5D-729cd6e48bd41aa3.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/students/%5Bid%5D/edit-aa13c77f38232954.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/students/new-8513dea1f0440e9f.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/submissions-239803ca06101012.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/tutorials-bb5f3e0143e8aaaf.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/tutorials/%5Bid%5D-63df294f58bb88ce.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/tutorials/%5Bid%5D/edit-59766e08cfcd904d.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/dashboard/tutorials/new-14ebaef1f82580b8.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/pages/index-97e384c198e8004a.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/css/84da0e6533675645.css",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/_next/static/css/d123eed416a31bb5.css",revision:"3KXXon3LgRXhW6fpzfQHl"},{url:"/favicon.ico",revision:"4ff59fef4ad8bd2547e3db47bac48f20"},{url:"/icons/icon-128x128.png",revision:"d626cfe7c65e6e5403bcbb9d13aa5053"},{url:"/icons/icon-144x144.png",revision:"e53a506b62999dc7a4f8b7222f8c5add"},{url:"/icons/icon-152x152.png",revision:"18b3958440703a9ecd3c246a0f3f7c72"},{url:"/icons/icon-16x16.png",revision:"83703514f19796ee15151e450984416d"},{url:"/icons/icon-192x192.png",revision:"27dc12f66697a47b6a8b3ee25ba96257"},{url:"/icons/icon-32x32.png",revision:"25e2c6ee34840568012b32e4314278df"},{url:"/icons/icon-384x384.png",revision:"a40324a3fde2b0b26eeffd4f08bf8be8"},{url:"/icons/icon-512x512.png",revision:"93d6e8e15cfa78dfee55446f607d9a28"},{url:"/icons/icon-72x72.png",revision:"f2ffc41b3482888f3ae614e0dd2f6980"},{url:"/icons/icon-96x96.png",revision:"fba02a40f7ba6fc65be8a2f245480f6d"},{url:"/manifest.json",revision:"c96057f6fe080d95b52920d55437ade9"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
