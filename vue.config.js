module.exports = {
	publicPath: './',
	pwa: {
		iconPaths: {
			favicon32: './plug_jchLogo.png',
			favicon16: './plug_jchLogo.png',
			appleTouchIcon: './plug_jchLogo.png',
			maskIcon: './plug_jchLogo.png',
			msTileImage: './plug_jchLogo.png'
		},
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: "./sw.js"
		}
	},
	devServer:{
		https: true,
		proxy: { //api代理
			'/api': {
				target: 'localhost:8081//',
				secure:true ,//接受对方是https的接口
				changeOrigin:true ,// 是否需要跨域
				pathRewrite: {'^/api' : ''}
			}
		}
	}
};
