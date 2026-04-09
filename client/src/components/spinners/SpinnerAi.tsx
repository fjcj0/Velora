
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner"; 
const SpinnerAi = () => {
    return (
        <div className="flex items-center gap-4 [--radius:1.2rem]">
            <Badge className="bg-black p-3">
                <Spinner data-icon="inline-start" />
                Thinking
            </Badge>
        </div>
    );
}

export default SpinnerAi
