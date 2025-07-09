import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, clearMessage } from "../app/redux/reducers/auth.reducer";

export const useApiResponse = ({ message, error, navigation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      if (navigation) navigate(navigation);
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch, navigate, navigation]);

  return;
};

export const useTanstackApiResponse = ({
  isError,
  error,
  isSuccess,
  message,
  navigation,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      if (navigation) navigate(navigation);
    }
    if (isError) {
      toast.error(error);
    }
  }, [message, error, navigate, navigation, isError, isSuccess]);

  return;
};
