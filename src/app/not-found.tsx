import Logo from "@/components/logo";

function NotFound() {
  return (
    <div className="h-screen bg-[#5f2659] text-white flex items-center justify-center flex-col gap-4 p-4">
      <Logo size={100} />
      <h1 className="text-base md:text-4xl font-bold">Not Found (404)</h1>
      <p className="text-sm  md:text-lg text-center">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
