import { saveMessageService } from "./messageService.js";

export const handleSendMessage = async (socket, data) => {

    const savedMessage = await saveMessageService({

        matchId: data.matchId,

        senderId: socket.user.id,

        content: data.message

    });

    return {

        id: savedMessage.id,

        matchId: savedMessage.match_id,

        senderId: savedMessage.sender_id,

        message: savedMessage.content,

        sentAt: savedMessage.sent_at

    };

};