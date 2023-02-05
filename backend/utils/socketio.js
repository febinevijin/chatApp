import { Server } from "socket.io"

export const createSocket = (backendServer) => {
  
    const io = new Server(backendServer, {
        pingTimeout: 60000,
        cors: {
          origin: "http://localhost:3000",
        // origin: "*",
        // methods: ["GET", "POST"],
      },
    }); 

    io.on("connection", (socket) => {
        console.log("connected to socket.io");

        socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected")
        })

        socket.on("join chat", (room) => {
            socket.join(room);
            console.log("socket joined room: " + room);
        })

        socket.on("typing",(room)=> socket.in(room).emit("typing"))
        socket.on("stop typing",(room)=> socket.in(room).emit("stop typing"))

        socket.on("new message", (newMessageRecieved) => {
            var chat = newMessageRecieved.chat;
            if (!chat.users) return console.log("chat.users not definerd");
            
            chat.users.forEach(user => {
                if (user.id == newMessageRecieved.sender._id) return;
                socket.in(user._id).emit("message recieved", newMessageRecieved);
            })
        })
        
        socket.off("setup", () => {
            console.log("User disconnected");
            socket.leave(userData.id)
        })
})

}