import React from "react";

const MessageDialog = ({ closeHandler }) => {
  return (
    <section className="fixed top-0 left-0 h-screen w-full bg-bg/80 z-[999] flex justify-center items-center">
      <div className="h-fit w-[80%] md:w-[40%] xl:w-[30%] bg-surface p-4 rounded-md flex flex-col gap-4">
        {/* top  */}
        <div className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          perferendis eos quaerat suscipit quo assumenda ipsam id ipsa
          asperiores sequi, quam ullam sapiente minus ducimus repudiandae nobis,
          iure eaque autem!
        </div>

        <hr className="border border-text/10" />

        <div className="flex flex-wrap gap-4">
          <button className="bg-red-400 text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95">
            Delete
          </button>
          <button className="bg-primary text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95">
            Share
          </button>
        </div>

        <button
          className="bg-accent text-sm font-semibold px-4 py-1 rounded-md cursor-pointer transition-all hover:scale-95"
          onClick={closeHandler}
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default MessageDialog;
