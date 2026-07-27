import { handleSendMessage } from "../services/socketService.js";

export const registerSocketEvents = (io, socket) => {

    console.log(`Socket Connected: ${socket.id}`);

    socket.on("join_room", (roomId) => {

        socket.join(roomId);

        console.log(`${socket.id} joined room ${roomId}`);

    });

    socket.on("send_message", async (data) => {

        try {

            const response = await handleSendMessage(socket, data);

            io.to(data.roomId).emit("receive_message", response);

        } catch (error) {

            socket.emit("chat_error", {
                message: error.message
            });

        }

    });

    socket.on("disconnect", () => {

        console.log(`Socket Disconnected: ${socket.id}`);

    });

};