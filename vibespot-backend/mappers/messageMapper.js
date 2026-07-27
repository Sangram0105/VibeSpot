export const mapMessage = (message) => {

    return {

        id: message.id,

        senderId: message.sender_id,

        content: message.content,

        sentAt: message.sent_at

    };

};

export const mapMessages = (messages) => {

    return messages.map(mapMessage);

};