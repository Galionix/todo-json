import { ChatMessage } from "chatgpt";
import getConfig from "next/config";
const config = getConfig();
import { NextApiRequest, NextApiResponse } from "next";
import { chatgptApi } from "../../services/chatgpt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatMessage>
) {
  const { prompt, conversationId, parentMessageId } = req.body;
  //   console.log("{ prompt, conversationId, parentMessageId }: ", {
  //     prompt,
  //     conversationId,
  //     parentMessageId,
  //   });
  //   console.log(config.publicRuntimeConfig.CHAT_GPT_API_KEY);
  const response = await chatgptApi.sendMessage(prompt, {
    conversationId,
    parentMessageId,
  });
  res.status(200).json(response);
}
