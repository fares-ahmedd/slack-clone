import Image from "next/image";
import logo from "../../public/logo-icon.webp";
function Logo({
  className = "",
  size = 50,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={logo}
      alt="logo"
      width={size}
      height={size}
      placeholder="blur"
      draggable={false}
      className={className}
    />
  );
}

export default Logo;
