import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import ChatMessages from "./ChatMessages";

const LiveChatCard = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessage = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API Polling

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20) + " 🚀",
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="  h-[380px] mx-8 border  border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse ">
        <div>
          {
            // Disclaimer: Don't use indexes as keys
            chatMessage.map((c, i) => (
              <ChatMessages key={i} name={c.name} message={c.message} />
            ))
          }
        </div>
      </div>

      <form
        className="w-[420px] mx-9 rounded-lg  border-8 "
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessage({
              name: "Akshay Saini",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="px-2 border border-black w-70 m-2"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="w-32 m-3 bg-green-100 font-black">Submit</button>
      </form>
    </>
  );
};
export default LiveChatCard;