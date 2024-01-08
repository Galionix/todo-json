import { useState } from "react";
import { suggestActivityPlanPrompt } from "../services/chatgpt/prompts";
import { sendChatGPTRequest } from "../services/chatgpt";
function extractText(input: string): string {
  if (!input.includes("```json")) return input;

  // Regular expression to match text between ```json and ```
  const regex = /```json\n([\s\S]*?)```/;

  // Executing the regular expression on the input string
  const match = input.match(regex);

  // Returning the matched group if found, otherwise null
  return match ? match[1].trim() : "";
}

export const FormComponent = ({
  onSubmit,
}: {
  onSubmit: (jsonData: Activity) => void;
}) => {
  const [activityInput, setActivityInput] = useState<string>("");
  const [prevSuggestion, setPrevSuggestion] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendPrompt = async () => {
    const prompt = suggestActivityPlanPrompt(activityInput);

    const res = await sendChatGPTRequest({
      value: prompt,
      id: "suggestNewActivityPlan",
      conversationId: "suggestNewActivityPlan",
    });
    setPrevSuggestion([...prevSuggestion, res.text]);
    setInput(res.text);
  };

  const handleSubmit = (e: any) => {
    try {
      const jsonData: Activity = JSON.parse(extractText(input));

      onSubmit(jsonData);
    } catch (error) {
      alert("Invalid JSON");
    }
  };

  return (
    <dialog className="flex flex-col gap-4 p-4 border-2 border-green-200">
      <h2>Describe your activity</h2>
      <div>
        <input
          type="text"
          placeholder="Describe your activity"
          onChange={(e) => setActivityInput(e.target.value)}
        ></input>
        <button onClick={sendPrompt}>Suggest</button>
      </div>
      {/* <form> */}
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        rows={10}
        cols={50}
        placeholder="JSON for review will appear here"
      ></textarea>
      {/* </form> */}
      <button onClick={handleSubmit}>Load Tasks</button>
    </dialog>
  );
};
