"use client";
import Title from "./Title";
import LoginViaGoogle from "./LoginViaGoogle";
import Line from "./Line";
import LoginViaUsername from "./LoginViaUsername";

export default function Login() {
  return (
    <div className="flex flex-col w-[300px] mt-[40px]">
      <Title title="Sign in" highlightText="" highlightColor="" />

      <div className="mt-[30px] text-[#64748B] leading-6 text-sm w-full">
        <LoginViaGoogle />
        <Line />
      </div>

      {/* Login via Email Component */}
      <LoginViaUsername />
    </div>
  );
}
