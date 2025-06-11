import { useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import AvatarInput from "../../components/inputs/AvatarInput";
import TextArea from "../../components/inputs/TextArea";
import GroupImg from "/group.png";
import MembersDialog from "../../components/DialogBox/MembersDialog";
import GroupMemberButton from "../../components/buttons/GroupMemberButton";
import SearchInput from "../../components/inputs/SearchInput";

const CreateGroup = () => {
  const [show, setShow] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    description: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(GroupImg);

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

    console.log({ ...updateUser, avatar });
  };

  return (
    <section className="h-full w-full flex flex-col gap-2 p-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {/* top  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium capitalize">Create Group</h1>
      </div>

      <hr className="my-2 text-text/40" />

      {/* center  */}
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <AvatarInput
          id="group-avatar"
          name="avatar"
          avatarHandler={avatarHandler}
          avatarPreview={avatarPreview}
        />
        <TextInput
          id="group-name"
          name="name"
          label="Name"
          value={updateUser.name}
          placeholder="name"
          onChange={onChangeHandler}
        />
        <TextArea
          id="group-description"
          name="description"
          label="Description"
          value={updateUser.description}
          placeholder="description"
          onChange={onChangeHandler}
        />

        <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
          members
        </h5>

        <div className="flex flex-col gap-2">
          <SearchInput
            name="create-group-search"
            placeholder={"search by useranme, name"}
          />



          <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
            Search members
          </h5>


          
          <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
            Added members
          </h5>
          <GroupMemberButton />
          <GroupMemberButton />
          <GroupMemberButton />
          <GroupMemberButton />

          {!!show && <MembersDialog closeHandler={() => setShow(false)} />}
        </div>

        <SubmitButton label="Submit" />
      </form>
    </section>
  );
};

export default CreateGroup;
