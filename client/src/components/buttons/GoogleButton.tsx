const GoogleCustomButton = () => {
  return (
    <button
      className="flex items-center justify-center w-full max-w-sm bg-white border border-gray-300 rounded-lg py-2 px-4 transition-all duration-150 text-gray-700 font-medium focus:outline-none"
    >
      <img
        src="/google.png"
        alt="Google"
        className="w-5 h-5 mr-3"
      />
      Continue with Google
    </button>
  );
};
export default GoogleCustomButton;