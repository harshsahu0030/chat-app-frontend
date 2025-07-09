import { Link, useParams } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import SubmitButton from "../../components/buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { useApiResponse } from "../../hooks/ApiResponse";
import { userVerify } from "../../app/redux/thunk/auth.thunk";

const VerifyUser = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);

  // function
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userVerify(token));
  };

  //useEffect

  //api response
  useApiResponse({ message, error, navigation: "/" });

  return (
    <section className="h-full w-full flex justify-center py-10">
      <div className="w-full sm:w-[70%] xl:w-[30%] h-fit flex flex-col gap-2 p-5 border rounded-sm border-surface">
        {/* top  */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium capitalize">Verify User</h1>
          <h2 className="text-sm">
            Rista helps you connect and share with the people in your life.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <SubmitButton disabled={loading} label="Verify User" />
        </form>

        <hr className="my-2 text-text" />

        {/* bottom */}
        <ul className="flex w-full gap-4 justify-center flex-wrap">
          {authenticationLinks?.map((item, index) => (
            <li
              key={index}
              className="text-xs capitalize hover:scale-95 transition-all"
            >
              <Link to={item?.url}>{item?.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VerifyUser;
