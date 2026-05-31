import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardLink = ({
  path,
  icon: Icon,
  isActive,
  title
}: {
  path: string;
  icon: LucideIcon;
  isActive: boolean;
  title:string
}) => {
  return (
<Link
  to={path}
  className={`relative font-poppins px-4 py-3 w-full flex items-start gap-x-1
  ${!isActive && 'hover:bg-[#6E62E4]/30'}  text-black duration-300 transition-all ease
  ${isActive ? 'bg-[#6E62E4]/10' : ''}`}
>
  {isActive && (
    <span className="absolute right-0 top-0 h-full w-[3px] bg-[#6E62E4] rounded-l-full" />
  )}
  <Icon size={20} />
  <p className="font-[300] text-sm">{title}</p>
</Link>
  );
};
export default DashboardLink;