import Lottie from "lottie-react";
import NotFoundAnimation from '../animations/404.json';
const PageNotFound = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <div className="w-1/2">
                <Lottie
                    animationData={NotFoundAnimation}
                    loop={true}
                />
            </div>
        </div>
    );
}
export default PageNotFound;