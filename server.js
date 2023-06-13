const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    cors: {
        origin: "https://socksonbots.de"
    }
});
// const path = require("path");

app.get("/", (req, res) => {
    res.send("<h1>Server running</h1>");
});

io.on("connection", function (socket) {

    console.log("A user with ID: " + socket.id + " connected");

    socket.on("disconnect", function () {
        console.log("A user with ID: " + socket.id + " disconnected");
    });

    socket.on("foo", (data) => {
        socket.broadcast.emit("foo", data);
        console.log("foo method");
        console.log(data);
    });

    socket.on("direction", (data) => {
        socket.broadcast.emit("direction", data);
        console.log("direction method");
        console.log(data);
    });

    socket.on("playerXY", (data) => {
        socket.broadcast.emit("playerXY", data);
        console.log("playerXY method");
    });

});

http.listen(3010, () => {
    console.log("Listening on port *: 3010");
});
