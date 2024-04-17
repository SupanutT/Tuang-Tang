import Image from "next/image";

export default function Logo() {
  return (
    <div className="mt-[40px]">
      <Image src={"/img/logo.png"} width={160} height={80} alt="logo" />
    </div>
  );
}
