import React, { useEffect, useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import AvatarInput from "../../components/inputs/AvatarInput";
import TextArea from "../../components/inputs/TextArea";
import UserImg from "/userprofile.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../Error";
import { useApiResponse } from "../../hooks/ApiResponse";
import { userUpdateProfile } from "../../app/redux/thunk/auth.thunk";

const UpdateProfile = () => {
  const { id } = useParams();
  // redux
  const dispatch = useDispatch();
  const { message, loading, error, user } = useSelector((state) => state.auth);

  //state
  const [updateUser, setUpdateUser] = useState({
    username: "",
    name: "",
    bio: "",
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

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }

    for (let key in updateUser) {
      formData.append(key, updateUser[key]);
    }

    dispatch(userUpdateProfile(formData));
  };

  //api response
  useApiResponse({ message, error });

  // useEffect
  useEffect(() => {
    if (user) {
      setUpdateUser({
        username: user.username,
        name: user.name,
        bio: user.bio,
      });
      setAvatarPreview(user.avatar.url);
    }
  }, [user]);

  if (user._id.toString() !== id.toString()) {
    return <Error />;
  }

  return (
    <section className="h-full w-full flex flex-col gap-2 p-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {/* top  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium capitalize">Update Profile</h1>
      </div>

      <hr className="my-2 text-text/40" />

      {/* center  */}
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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

        <SubmitButton disabled={loading} label="Submit" />
      </form>
    </section>
  );
};

export default UpdateProfile;
