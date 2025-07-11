import { authenticationLinks, navigateButtonLinks } from "../data/linksData";
import NavigateBoxSkeleton from "./skeletons/NavigateBoxSkeleton";
import NavigateButton from "./buttons/NavigateButton";
import UserButton from "./buttons/UserButton";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getFriendsApi } from "../app/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useTanstackApiResponse } from "../hooks/ApiResponse";
import Banner from "/ShreejiTechSolution-Banne.jpeg";

export const LeftAsides = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface flex flex-col gap-2">
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        quick links
      </h5>
      <NavigateButton
        data={{
          label: "Your Profile",
          url: `/users/${user?._id}`,
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
    </section>
  );
};

export const RightAsides = () => {
  //react-queries
  const { isError, error, data, isLoading } = useQuery({
    queryKey: ["aside-friends"],
    queryFn: () => getFriendsApi({}),
  });

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });
  return (
    <aside className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface flex flex-col gap-2">
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        sponsored
      </h5>

      <img
        src={Banner}
        alt="banner"
        className="w-full h-fit object-contain cursor-pointer hover:scale-95 transition-all"
      />

      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        contacts
      </h5>

      {isLoading ? (
        <NavigateBoxSkeleton count={1} />
      ) : (
        data?.data?.friends?.map((item, index) => (
          <UserButton key={index} data={item} />
        ))
      )}
    </aside>
  );
};
