import { useRef, useState } from "react";
import { Edit } from "lucide-react";
import Input from "../../components/inputs/Input";
import BookingButton from "../../components/buttons/BookingButton";
import useUserStore from "../../store/auth.store";
import api from "../../utils/api.utils";
import { toast } from "sonner";
const ProfilePage = () => {
  //@ts-ignore
  const { user, setUser } = useUserStore();
  const endpoint = "/auth";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePhoto?.url || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error(error);
      toast.error("Failed to preview image");
    } finally {
      setIsUploading(false);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const userResponse = await api.put(
        `${endpoint}/update-user`,
        {
          name,
          username,
          bio
        }
      );
      let updatedUser = userResponse.data.user;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const imageResponse = await api.put(
          `${endpoint}/update-profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        updatedUser = imageResponse.data.user;
      }
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full p-3">
      <div className="w-full max-w-[40rem] flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-col items-start gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={handleImageClick}
              disabled={isUploading}
              className="relative group"
            >
              <img
                src={
                  profilePicture ||
                  user?.profilePhoto.url ||
                  "https://via.placeholder.com/150"
                }
                className="w-32 h-32 rounded-full object-cover group-hover:opacity-70 transition-opacity"
                alt="User profile"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all rounded-full">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit size={24} />
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isDisabled={false}
            type="text"
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isDisabled={false}
            type="text"
          />
        </div>
        <div className="w-full">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-md border-gray-300 p-5 h-60 outline-none"
            placeholder="Enter your bio..."
          />
        </div>
        <div className="w-full max-w-xs">
          <BookingButton
            title="Save Changes"
            Icon={Edit}
            onClick={handleUpdateProfile}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;