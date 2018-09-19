
module.exports = {
	
	db:{
		url:'mongodb://localhost:27017/givazon',
		name:'givazon',
	},basicAuth:{
		userName:'Cumulonimbus',
		passWord:'giv$zoNeWpr0JectBasIcauTh@coDe'
	},
	jwtSecret:{
		key:'secretpasswordforgivazonnodejsproject'
	},
	logger:{
		path:'/opt/givazon-log/'
	},
	imageRefPath:{
		uploadPath:'/opt/givazon-images/images/',
		hostingPath:'/opt/givazon-images/',
		host:'http://192.168.0.114:8080/images/'
		//host:'http://35.189.219.26/images/'
	},
	swaggerUrl:{
		//host : '35.189.219.26',
		host: '192.168.0.114:8080'
	}
}