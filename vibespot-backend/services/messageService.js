import supabase from "../config/supabase.js";
import AppError from "../utils/AppError.js";

export const saveMessageService = async ({
    matchId,
    senderId,
    content
}) => {

    const { data, error } = await supabase
        .from("messages")
        .insert({
            match_id: matchId,
            sender_id: senderId,
            content
        })
        .select()
        .single();

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const getMessagesService = async (matchId) => {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("match_id", matchId)
        .order("sent_at", { ascending: true });

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};