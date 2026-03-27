import {Link} from 'react-router-dom';
const AuthLink = ({
    title,
    icon,
    direction,
    isActive
}: {
    title: string,
    icon: string, 
    direction: string,
    isActive: boolean
}) => {
    return (
        <Link className={`px-3 py-1 rounded-md text-xs flex items-center justify-center font-poppins ${isActive ? 'font-[600] text-blac bg-white border-[1px] border-[#E4E5E6]' : 'font-[400] text-[#555459]'} gap-1`} to={direction}>
            <img src={icon} alt="icon" className='w-4' />
            {title}
        </Link>
    );
}
export default AuthLink;