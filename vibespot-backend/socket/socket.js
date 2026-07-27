import { Server } from "socket.io";
import { registerSocketEvents } from "../controllers/socketController.js";
import socketAuthMiddleware from "../middleware/socketAuthMiddleware.js";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {

        console.log(`Authenticated User: ${socket.user.email}`);

        registerSocketEvents(io, socket);

    });

};

export const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO not initialized.");
    }

    return io;

};