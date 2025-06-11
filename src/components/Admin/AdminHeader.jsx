import LOGO from "/logo.png";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full overflow-hidden border-b border-surface grid grid-cols-12 gap-5">
      {/* left  */}
      <div className="h-full flex items-center col-span-4 sm:col-span-3">
        <img
          loading="lazy"
          src={LOGO}
          alt="logo"
          className="h-[7vh] md:h-[4vh] xl:h-[7vh] w-fit object-contain cursor-pointer hover:scale-95 transition-all hover:drop-shadow-lg hover:drop-shadow-secondary"
          onClick={() => navigate("/admin")}
        />
      </div>
    </div>
  );
};

export default AdminHeader;
