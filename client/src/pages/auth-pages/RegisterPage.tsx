import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
const RegisterPage = () => {
    return (
        <div className="w-full flex items-start justify-start flex-col gap-3">
            <AuthInput icon="/username.png" label="Username" placeholder="Enter username please" type="text" isPassword={false} />  
            <AuthInput icon="/name.png" label="Name" placeholder="Enter name please" type="text" isPassword={false} />  
            <AuthInput icon="/email.png" label="Email" placeholder="Enter email address" type="email" isPassword={false} />  
            <AuthInput icon="" label="Password" placeholder="Enter the password please" type="password" isPassword={true} />  
            <AuthInput icon="" label="Confirm Password" placeholder="Please confirm the password" type="password" isPassword={true} />  
            <AuthButton onClick={async () => console.log('Hello')} title="Create an account" isLoading={false} />
     </div>
    );
};
export default RegisterPage;