import UserImg from "/userprofile.png";

const AddUserGroupBox = ({ data, members, setMembers }) => {
  const handleRemoveMember = () => {
    const newMembers = members.filter((member) => member !== data._id);
    setMembers(newMembers);
    console.log("Add");
  };

  const handleAddMember = () => {
    const newMembers = [...members, data._id];
    setMembers(newMembers);
  };

  return (
    <div className="flex gap-2 items-center p-2 text-xl capitalize font-medium rounded-lg hover:bg-surface transition-all cursor-pointer">
      {/* left  */}
      <div className="h-10 min-w-10 w-10 rounded-full bg-bg">
        <img
          src={data?.avatar?.url ? data?.avatar?.url : UserImg}
          alt="profile-image"
          className="h-full w-full object-contain"
        />
      </div>

      {/* right  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium line-clamp-1">
            {data?.username}
          </span>
          <span className="text-xs line-clamp-1">{data?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {!members.includes(data._id) ? (
            <button
              onClick={handleAddMember}
              button="button"
              className="text-xs p-2 bg-primary rounded-lg cursor-pointer transition-all hover:scale-95 disabled::cursor-not-allowed"
            >
              Add
            </button>
          ) : (
            <button
              onClick={handleRemoveMember}
              button="button"
              className="text-xs p-2 bg-red-400 rounded-lg cursor-pointer transition-all hover:scale-95 disabled::cursor-not-allowed"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserGroupBox;
