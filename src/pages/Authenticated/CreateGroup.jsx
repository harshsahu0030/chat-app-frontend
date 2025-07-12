import { useEffect, useState } from "react";
import TextInput from "../../components/inputs/TextInput";
import SearchInput from "../../components/inputs/SearchInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFriendsApi } from "../../app/api/user.api";
import { useDebounce } from "../../hooks/DebounceHook";
import NavigateBoxSkeleton from "../../components/skeletons/NavigateBoxSkeleton";
import { useTanstackApiResponse } from "../../hooks/ApiResponse";
import AddUserGroupBox from "./AddUserGroupBox";
import FunctionButton from "../../components/buttons/FunctionButton";
import toast from "react-hot-toast";
import { createGroupApi } from "../../app/api/chat.api";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [createGroup, setCreateGroup] = useState({
    groupName: "",
  });
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [members, setMembers] = useState([]);

  //hook
  const debouncedSearch = useDebounce(search, 800);

  //react-queries
  const { isError, error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["friends", debouncedSearch],
    queryFn: () => getFriendsApi({ search: debouncedSearch }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createGroupApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });

  // function
  const onChangeHandler = (e) => {
    setCreateGroup({ ...createGroup, [e.target.name]: e.target.value });
  };

  //function
  const handleChange = (e) => {
    setUsers([]);
    setSearch(e.target.value);
  };

  const SubmitHandler = () => {
    mutate({ ...createGroup, members });
  };

  //useFFect
  useEffect(() => {
    if (isSuccess) {
      setUsers(data?.data?.friends);
    }
  }, [isSuccess, data]);

  //api response
  useTanstackApiResponse({
    isError,
    error: error?.response?.data?.message,
  });

  return (
    <section className="h-full w-full flex flex-col gap-2 p-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {/* top  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium capitalize">Create Group</h1>
      </div>

      <hr className="my-2 text-text/40" />

      {/* center  */}
      <div className="flex flex-col gap-4">
        <TextInput
          id="group-name"
          name="groupName"
          label="Name"
          value={createGroup.groupName}
          placeholder="name"
          onChange={onChangeHandler}
        />

        <h5 className="text-xs font-medium uppercase text-text py-2 border-b border-text">
          members
        </h5>

        <div className="flex flex-col gap-2">
          <SearchInput
            id="search-friends"
            name="search"
            value={search}
            placeholder="Search Friends"
            onChange={handleChange}
          />
          {users?.map((item) => (
            <AddUserGroupBox
              key={item._id}
              data={item}
              members={members}
              setMembers={setMembers}
            />
          ))}

          {isLoading ? (
            <NavigateBoxSkeleton count={1} />
          ) : (
            <span className="text-sm text-text/50 w-full text-center py-1">
              No more users found
            </span>
          )}
        </div>

        <FunctionButton
          label="Submit"
          disabled={isPending}
          clickHandler={SubmitHandler}
        />
      </div>
    </section>
  );
};

export default CreateGroup;
