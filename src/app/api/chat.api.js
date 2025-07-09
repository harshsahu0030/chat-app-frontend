import axios from "axios";
import { server } from "../../constant/config";

const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const getChatsApi = async ({ search = "", page = 1 }) => {
  const params = new URLSearchParams();
  if (search) params.append("keyword", search);
  params.append("page", page);

  const { data } = await axios.get(
    `${server}/api/v1/chats?${params.toString()}`,
    config
  );
  return data;
};

export const getChatApi = async ({ id }) => {
  const { data } = await axios.get(`${server}/api/v1/chat/${id}`, config);
  return data;
};

export const getMessagesApi = async ({ id, page = 1 }) => {
  const params = new URLSearchParams();
  params.append("page", page);

  const { data } = await axios.get(
    `${server}/api/v1/messages/${id}?${params.toString()}`,
    config
  );
  return data;
};
export const sendMessageApi = async (form) => {
  const { data } = await axios.post(
    `${server}/api/v1/message/send`,
    form,
    config
  );
  return data;
};
