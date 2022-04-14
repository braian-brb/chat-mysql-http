const dbConnection = require("../../config/dbConnection");

module.exports = (app) => {
  const connection = dbConnection();

  app.get("/", (req, res) => {
    connection.query("SELECT * FROM messages", (err, result) => {
      res.render("messages/messages.ejs", {
        message: result,
      });
    });
  });

  app.post("/message", (req, res) => {
    const { user, message } = req.body;
    connection.query(
      "INSERT INTO messages (user, message) VALUES (?, ?)",
      [user, message],
      (err, result) => {
        res.redirect("/");
      }
    );
  });


  const { Server: HttpServer } = require("http");
  const { Server: IOServer } = require("socket.io");
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);


  io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");
    const messages =  connection.query("SELECT * FROM messages", (err, result) => {
      socket.emit("messages", result);
    });
    
    socket.on("new-message", (data) => {
      messages.push(data);
      io.sockets.emit("messages", messages);
    });
  });


};
