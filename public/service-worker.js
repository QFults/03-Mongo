self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('blog-cache-v1')
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll([
          '/',
          '/auth.html',
          '/index.html',
          '/manifest.json',
          '/assets/js/auth.js',
          '/assets/js/app.js',
          '/assets/css/auth.css',
          '/assets/css/style.css',
          '/assets/icons/tasks.png',
          '/assets/icons/plus.png'
        ])
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(err => {
      return caches.match(event.request).then(res => {
        if (res) {
          return res
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/')
        }
      })
    })
  )
})
