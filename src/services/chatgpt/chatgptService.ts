import { ChatGPTAPI, ChatMessage } from "chatgpt";

export const chatgptApi = new ChatGPTAPI({
  apiKey: "" + process.env.CHAT_GPT_API_KEY,
});

export const sendChatGPTRequest = async ({
  value,
  conversationId,
  id,
}: {
  value: string;
  conversationId: string;
  id: string;
}) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: value,
      parentMessageId: id,
      conversationId,
    }),
  });

  const data: ChatMessage = await res.json();
  //   console.log("data: ", data);
  return data;
};
