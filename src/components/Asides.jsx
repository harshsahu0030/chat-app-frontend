import { authenticationLinks, navigateButtonLinks } from "../data/linksData";
import NavigateBoxSkeleton from "./skeletons/NavigateBoxSkeleton";
import NavigateButton from "./buttons/NavigateButton";
import UserButton from "./buttons/UserButton";
import { IoPersonCircle } from "react-icons/io5";
import FriendRequestButton from "./buttons/FriendRequestButton";

export const LeftAsides = () => {
  return (
    <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface flex flex-col gap-2">
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        quick links
      </h5>
      <NavigateButton
        data={{
          label: "Your Profile",
          url: "/abc123",
          icon: IoPersonCircle,
        }}
      />

      {navigateButtonLinks ? (
        navigateButtonLinks?.map((item, index) => (
          <NavigateButton key={index} data={item} />
        ))
      ) : (
        <NavigateBoxSkeleton count={4} />
      )}

      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        more about us
      </h5>

      {authenticationLinks ? (
        authenticationLinks?.map((item, index) => (
          <NavigateButton key={index} data={item} />
        ))
      ) : (
        <NavigateBoxSkeleton count={4} />
      )}
    </div>
  );
};

export const RightAsides = () => {
  return (
    <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface flex flex-col gap-2">
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        sponsored
      </h5>
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        contacts
      </h5>
      <UserButton />
      <FriendRequestButton />
    </div>
  );
};
