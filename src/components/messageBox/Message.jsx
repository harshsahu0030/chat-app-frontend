import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import MessageDialog from "../DialogBox/MessageDialog";
import moment from "moment";
import { useSelector } from "react-redux";

const Message = ({ data, isGroupChat }) => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const hideHandler = () => {
    setShow(false);
  };

  return (
    <div
      className={`flex flex-col gap-1 h-fit min-w-[50%] max-w-[80%] text-base p-2 bg-surface rounded-md ${
        user._id.toString() === data?.sender._id.toString()
          ? "self-end"
          : "self-start"
      }`}
    >
      {isGroupChat && (
        <>
          <span className="text-xs font-semibold text-accent">
            {data?.sender?.username}
          </span>

          <hr className="border border-text/10" />
        </>
      )}

      <p className="text-base">{data?.content}</p>
      <hr className="border border-text/10" />
      <div className="flex justify-between items-center">
        <BsThreeDots
          className="text-xl hover:scale-95 transition-all cursor-pointer"
          onClick={() => setShow(true)}
        />
        <p className="text-xs italic">{moment(data?.createdAt).fromNow()}</p>

        {!!show && (
          <MessageDialog
            data={data}
            closeHandler={hideHandler}
            user={data?.sender}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
