import UserImg from "/userprofile.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import GroupImg from "/group.png";

const ChatListButton = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer"
      onClick={() => navigate(`/chats/${data?._id}`)}
    >
      {/* left  */}
      <div className="h-10 min-w-10 w-10">
        <img
          src={
            data?.isGroupChat
              ? data?.avatar?.url
                ? data?.avatar?.url
                : GroupImg
              : data?.members?.filter(
                  (u) => u._id.toString() !== user._id.toString()
                )[0]?.avatar?.url || UserImg
          }
          alt="profile-image"
          className="h-full w-full object-cover rounded-full bg-surface"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">
            {data?.isGroupChat
              ? data?.groupName
              : data?.members?.filter(
                  (u) => u._id.toString() !== user._id.toString()
                )[0]?.username || "Rista User"}
          </span>
          <span className="text-xs line-clamp-1">
            <span className="text-xs font-medium">
              {data?.lastMessage?.content ? (
                <>~ {data?.lastMessage?.content}</>
              ) : (
                <span className="text-text/50 italic">No Message Yet</span>
              )}

              {data?.lastMessage?.createdAt && (
                <>
                  {" "}
                  <span className="text-text/50 italic">
                    -{moment(data?.lastMessage?.createdAt).fromNow()}
                  </span>
                </>
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatListButton;
