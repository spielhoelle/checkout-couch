require("dotenv").config({ path: './.env' })
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const bootstrap = require("couchdb-bootstrap");
console.log('process.env.REACT_APP_COUCHURL', process.env.REACT_APP_COUCHURL);

const server = restify.createServer();

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  // origins: ['http://localhost:3000', 'http://organice.tmy.io'],
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.urlEncodedBodyParser());

function get(req, res, next) {
  console.log("");
}

server.get("/db", get);
// server.post("/reports", submitQuestion);
// server.del("/reports/:id", deleteQuestion);

server.listen(8080, function() {
  const bootstrapOptions = {
    mapDbName: {
      orders: "orders"
    }
  };
  
  bootstrap(
    process.env.REACT_APP_COUCHURL,
    "couchdb",
    bootstrapOptions,
    (error, response) => {
      if (error) {
        console.log("Error,", error);
        process.exit(1);
      }
      console.log("%s listening at %s", server.name, server.url);
    }
  );
});
