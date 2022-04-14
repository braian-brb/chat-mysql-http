const app = require("./config/server");

require("./app/routes/messages")(app);

// start the server

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(3000, function () {
  console.log("Servidor corriendo en http://localhost:3000");
});

// end app.listen

