import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
const LoginPage = () => {
    return (
         <div className="w-full flex items-start justify-start flex-col gap-3">
            <AuthInput icon="/email.png" label="Email" placeholder="Enter email address" type="email" isPassword={false} />  
            <AuthInput icon="" label="Password" placeholder="Enter the password please" type="password" isPassword={true} />  
            <AuthButton onClick={async () => console.log('Hello')} title="Login" isLoading={false} />
     </div>
    );
}
export default LoginPage;