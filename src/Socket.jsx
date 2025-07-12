import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constant/config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  useEffect(() => {
    socket.emit("setup", user);

    socket.on("connection", () => console.log("frontend connected to backend"));
  }, [socket, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
