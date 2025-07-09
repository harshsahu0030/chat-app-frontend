import React from "react";
import { authenticationLinks, navigateButtonLinks } from "../../data/linksData";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import NavigateButton from "../../components/buttons/NavigateButton";
import { IoPersonCircle } from "react-icons/io5";
import FunctionButton from "../../components/buttons/FunctionButton";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../app/redux/thunk/auth.thunk";
import { useApiResponse } from "../../hooks/ApiResponse";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);

  //api response
  useApiResponse({ message, error, navigation: "/" });
  return (
    <section className="h-full w-full flex flex-col gap-5">
      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        quick links
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
      </div>

      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        more about us
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {authenticationLinks ? (
          authenticationLinks?.map((item, index) => (
            <NavigateButton key={index} data={item} />
          ))
        ) : (
          <NavigateBoxSkeleton count={4} />
        )}
      </div>

      <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
        account
      </h5>
      <FunctionButton
        label={"Logout"}
        background={"bg-red-400"}
        clickHandler={() => {
          dispatch(userLogout());
        }}
        disabled={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1"></div>
    </section>
  );
};

export default Bookmarks;
