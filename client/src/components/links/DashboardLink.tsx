import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardLink = ({
  path,
  icon: Icon,
  isActive,
}: {
  path: string;
  icon: LucideIcon;
  isActive: boolean;
}) => {
  return (
    <Link to={path} className="relative flex items-center">
      <Icon
        size={20}
        className={`
          duration-300 transition-all ease
          ${isActive ? "text-[#FC9432]" : "text-[#969696] hover:text-[#FC9432]"}
        `}
      />
      {isActive && (
        <div className="absolute -right-4.5 top-0 h-full w-[5px] rounded-l-full bg-[#FC9432]" />
      )}
    </Link>
  );
};
export default DashboardLink;