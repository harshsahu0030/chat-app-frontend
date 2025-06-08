import React from "react";
import NotificationButton from "../../components/buttons/NotificationButton";

const Notifications = () => {
  return (
    <div className="flex flex-col gap-2">
      <NotificationButton />
      <NotificationButton />
      <NotificationButton />
      <NotificationButton />
      <NotificationButton />
    </div>
  );
};

export default Notifications;
