var CACHE_NAME = 'sw_v8';

self.addEventListener('install', function(event){
	console.log("installing...");
	event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
		cache.addAll([
			"img/icons/plug_jchLogo192.png",
			"img/icons/plug_jchLogo512.png",
		]); //加入需要缓存的静态文件
	}));
})

self.addEventListener('activate', () => {
	self.clients.matchAll({
		type: 'window'
	}).then(windowClients => {
		for (const windowClient of windowClients) {
			// Force open pages to refresh, so that they have a chance to load the
			// fresh navigation response from the local dev server.
			windowClient.navigate(windowClient.url)
		}
	})
})

//如果更改了页面，需要清除缓存
this.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) { // 缓存命中，返回缓存
				return response;
			}
			// 请求是stream数据，只能使用一次，所以需要拷贝，一次用于缓存，一次用于浏览器请求
			var fetchRequest = event.request.clone();
			return fetch(fetchRequest)
				.then(function(response) {
					if (!response || response.status !== 200) {
						return response;
					}
					// 响应也是stream，只能使用一次，一次用于缓存，一次用于浏览器响应
					var responseToCache = response.clone();
					caches.open(CACHE_NAME)
						.then(function(cache) {
							cache.put(event.request, responseToCache);
						});
					return response;
				});
		})
	);
});
