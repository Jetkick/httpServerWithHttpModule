const http = require('http');
const server = http.createServer();

const users = [{
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [{
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const postList = [{
	"data" : [
	{
	    "userID"           : 1,
	    "userName"         : "Rebekah Johnson",
            "postingId"        : 1,
            "postingTitle"     : "간단한 HTTP API 개발 시작!",
	    "postingContent"   : "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
	},
	{  
	    "userID"           : 2,
	    "userName"         : "Fabian Predovic",
            "postingId"        : 2,
            "postingTitle"     : "HTTP의 특성",
      	    "postingContent"   : "Request/Response와 Stateless!!"
	},
	{  
            "userID"           : 3,
	    "userName"         : "new user 1",
            "postingId"        : 3,
            "postingImageUrl"  : "내용 1",
	    "postingContent"   : "sampleContent3"
	},
	{  
	    "userID"           : 4,
	    "userName"         : "new user 2",
            "postingId"        : 4,
            "postingImageUrl"  : "내용 2",
	    "postingContent"   : "sampleContent4"
	}
        ]
}
];

const httpRequestListener = function (request, response) {
  const {url, method} = request

  if (method === 'GET') {
      if (url === '/ping') {
          response.writeHead(200, {'Content-Type' : 'application/json'})
          response.end(JSON.stringify({message : 'ping'}))
      } if (url === '/postList') {
        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({"postList" : postList}))
      }
  } else if (method === 'POST') {
    if(url === '/users/signup' || url === '/posts') {
      let body = '';

      request.on('data', (data) => {
        body += data;
      })
    
      request.on('end', () => {
        const user = JSON.parse(body);

        const post = JSON.parse(body);

        users.push({
          id : user.id,
          name : user.name,
          email: user.email,
          password : user.password
        })

        posts.push({
          id : post.id,
          title : post.title,
          content: post.content,
          userId : post.userId
        })
        
        response.writeHead(201, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({message : 'created'}));
      })
    }
  }
};

server.on("request", httpRequestListener);

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function() {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`)
});