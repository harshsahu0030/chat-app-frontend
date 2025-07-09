import axios from "axios";
import { server } from "../../constant/config";

const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const getusersApi = async ({ search = "", page = 1 }) => {
  const params = new URLSearchParams();
  if (search) params.append("keyword", search);
  params.append("page", page);

  const { data } = await axios.get(
    `${server}/api/v1/users?${params.toString()}`,
    config
  );
  return data;
};

export const getuserApi = async ({ id }) => {
  const { data } = await axios.get(`${server}/api/v1/user/${id}`, config);
  return data;
};

export const getuserRelation = async ({ id }) => {
  const { data } = await axios.get(
    `${server}/api/v1/user/status/${id}`,
    config
  );
  return data;
};

export const getFriendsApi = async ({ search = "", page = 1 }) => {
  const params = new URLSearchParams();
  if (search) params.append("keyword", search);
  params.append("page", page);

  const { data } = await axios.get(
    `${server}/api/v1/friends?${params.toString()}`,
    config
  );
  return data;
};

export const getFriendRequestsApi = async ({ page }) => {
  const { data } = await axios.get(
    `${server}/api/v1/friend/requests?pages=${page}`,
    config
  );
  return data;
};

export const sendFriendRequestApi = async (userId) => {
  const { data } = await axios.post(
    `${server}/api/v1/friend/request/send`,
    { userId },
    config
  );
  return data;
};

export const cancelFriendRequestApi = async (userId) => {
  const { data } = await axios.post(
    `${server}/api/v1/friend/request/cancel`,
    { userId },
    config
  );
  return data;
};

export const acceptFriendRequestApi = async (userId) => {
  const { data } = await axios.post(
    `${server}/api/v1/friend/request/accept`,
    { userId },
    config
  );
  return data;
};

export const rejectFriendRequestApi = async (userId) => {
  const { data } = await axios.post(
    `${server}/api/v1/friend/request/reject`,
    { userId },
    config
  );
  return data;
};

export const removeFriendApi = async (userId) => {
  const { data } = await axios.post(
    `${server}/api/v1/friend/remove`,
    { userId },
    config
  );
  return data;
};
