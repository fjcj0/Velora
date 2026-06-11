import { type LucideIcon } from "lucide-react";
const BookingButton = ({
    title,
    onClick,
    isLoading,
    Icon,
}: {
    title: string;
    onClick: () => Promise<void> | void;
    isLoading: boolean;
    Icon?: LucideIcon;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="group w-full font-poppins cursor-pointer relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 disabled:opacity-50"
        >
            <span className="font-[300] text-md flex items-center gap-2">
                {isLoading ? "Loading..." : title}
                {!isLoading && Icon && <Icon size={16} />}
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
            </div>
        </button>
    );
};

export default BookingButton;