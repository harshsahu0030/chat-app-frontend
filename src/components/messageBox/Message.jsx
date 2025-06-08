import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import MessageDialog from "../DialogBox/MessageDialog";

const Message = ({ data }) => {
  const [show, setShow] = useState(false);

  const hideHandler = () => {
    setShow(false);
  };

  return (
    <div className="flex flex-col gap-2 h-fit w-[80%] text-base p-4 bg-surface rounded-md self-end">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quidem
        sunt saepe aliquid nobis recusandae, dolorem odit exercitationem ducimus
        adipisci commodi minus nostrum, cupiditate non expedita in, repellendus
        iste a.
      </p>
      <hr className="border border-text/10" />
      <div className="flex justify-between items-center">
        <BsThreeDots
          className="text-xl hover:scale-95 transition-all cursor-pointer"
          onClick={() => setShow(true)}
        />
        <p className="text-xs italic">11:00 AM</p>

        {!!show && <MessageDialog closeHandler={hideHandler} />}
      </div>
    </div>
  );
};

export default Message;
