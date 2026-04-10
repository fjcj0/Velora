import { Button } from "../../components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
const ProfilePage = () => {
  return (
    <div className="w-full h-full p-5 flex flex-col items-center justify-start font-poppins overflow-y-auto">
      <div className="w-[90%] grid md:grid-cols-4 grid-cols-1 gap-4 mr-auto">
        <div className="flex items-start justify-start md:justify-end col-span-1">
          <button
            type="button"
            className="cursor-pointer active:scale-75 duration-300 transition-all w-44 h-44 rounded-full overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="profile-photo"
            />
          </button>
          <input type="image" className="hidden" />
        </div>
        <div className="flex flex-col items-start justify-start gap-y-3 col-span-3">
          <h1 className="text-white font-bold text-3xl">INFORMATION</h1>
          <FieldGroup>
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <Field className="w-full">
                <FieldLabel htmlFor="fieldgroup-name" className="text-white text-xs">
                  name
                </FieldLabel>
                <Input
                  id="fieldgroup-name"
                  placeholder="name"
                  className="py-4 text-white w-full placeholder:text-white text-xs placeholder:text-xs font-[100]"
                />
              </Field>
              <Field className="w-full">
                <FieldLabel htmlFor="username" className="text-white text-xs">
                  username
                </FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  className="py-4 text-white w-full placeholder:text-white text-xs placeholder:text-xs font-[100]"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel className="text-white text-xs">bio</FieldLabel>
              <textarea
                placeholder="Write your bio description..."
                rows={8}
                className="w-full py-3 px-2 text-white bg-transparent border text-xs border-white font-[100] outline-none resize-none"
              />
            </Field>
            <Field orientation="horizontal">
              <Button
                type="button"
                className="text-white bg-transparent border-1 border-white px-7 py-5 rounded-none hover:bg-white hover:text-black cursor-pointer"
              >
                Update
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;