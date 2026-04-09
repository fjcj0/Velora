import { List, ShoppingCart,Search } from 'lucide-react';
const DashboardHeader = () => {
    return (
        <div className="w-full py-4 px-3 flex items-center justify-between">
            <button type='button' className='md:hidden'>
                <List color='#969696' size={15}/>
            </button>
            <div className='w-full relative max-md:hidden'>
                                <Search color='#969696' size={15} className='absolute left-2 top-3'/>
                <input maxLength={30} type='text' className='border-none outline-none px-7 py-3 md:w-[40%] w-full rounded-3xl  bg-[#212121] text-xs text-[#969696] placeholder:text-[#969696] placeholder:text-xs font-[300] placeholder:font-[300] font-poppins' placeholder='Search for something' />
            </div>
            <div className='flex items-center justify-center gap-x-5'>
                <button type='button' className='relative'>
                    <ShoppingCart color='#969696' size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>
                <div className='flex items-center justify-center gap-x-2'>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=60"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className='text-[#969696] font-poppins text-sm font-[400]'>Jack</p>
                </div>
            </div>
        </div>
    );
}
export default DashboardHeader;