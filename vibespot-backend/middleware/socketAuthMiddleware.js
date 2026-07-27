import supabase from "../config/supabase.js";

const socketAuthMiddleware = async (socket, next) => {

    try {

        const token = socket.handshake.auth?.token;

        if (!token) {

            return next(new Error("Authentication token missing."));

        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {

            return next(new Error("Invalid or expired token."));

        }

        socket.user = data.user;

        next();

    } catch (error) {

        next(new Error("Socket authentication failed."));

    }

};

export default socketAuthMiddleware;