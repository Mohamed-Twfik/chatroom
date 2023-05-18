// from this article => https://livecodestream.dev/post/a-starter-guide-to-building-real-time-applications-with-nodejs/
// and it give me error at front end
const express = require("express")
const socketio = require("socket.io")
const port = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res)=>{res.render("index")})

const server = app.listen(port, ()=>{console.log("Server listen at port " + port)})

//initialize socket for the server
const io = socketio(server)

io.on("connection", socket=>{
    console.log("new user connected")
    socket.username = "Anonymous"
    
    socket.broadcast.emit("new_user_connected")

    socket.on("change_name", data=>{
        socket.username = data.username
    })

    socket.on("send_message", data=>{
        io.sockets.emit("receive_message", {username:socket.username, message:data.message})
    })

    socket.on("typing", ()=>{
        socket.broadcast.emit("typing", {username: socket.username})
    })
})