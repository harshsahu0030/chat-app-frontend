import React, { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import AvatarInput from "../../components/inputs/AvatarInput";
import TextArea from "../../components/inputs/TextArea";
import UserImg from "/userprofile.png";

const UpdateProfile = () => {
  const [updateUser, setUpdateUser] = useState({
    username: "",
    name: "",
    bio: "",
    avatar: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(UserImg);

  // function
  const onChangeHandler = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const avatarHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section className="h-full w-full flex flex-col gap-2 p-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {/* top  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium capitalize">Update Profile</h1>
      </div>

      <hr className="my-2 text-text/40" />

      {/* center  */}
      <form className="flex flex-col gap-4">
        <AvatarInput
          id="update-avatar"
          name="avatar"
          avatarHandler={avatarHandler}
          avatarPreview={avatarPreview}
        />

        <TextInput
          id="update-username"
          name="username"
          label="Username"
          placeholder="username"
          value={updateUser.username}
          onChange={onChangeHandler}
        />
        <TextInput
          id="update-name"
          name="name"
          label="Name"
          value={updateUser.name}
          placeholder="name"
          onChange={onChangeHandler}
        />
        <TextArea
          id="update-bio"
          name="bio"
          label="Bio"
          value={updateUser.bio}
          placeholder="bio"
          onChange={onChangeHandler}
        />

        <SubmitButton label="Submit" />
      </form>
    </section>
  );
};

export default UpdateProfile;
