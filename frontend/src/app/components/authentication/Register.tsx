"use client"
import Title from "./Title"
import LoginViaGoogle from "./LoginViaGoogle"
import Line from "./Line"
import RegisterViaEmail from "./RegisterViaEmail"
import { useEffect, useState } from "react"


export default function Register() {

  return (
    <div className="flex flex-col items-center w-[305px] mt-[25px] ">
      <div className="flex flex-col w-[280px] mt-[30px]">
        <Title title="Sign up" highlightText="" highlightColor="" />

        <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
          <LoginViaGoogle callbackUrl="/register" />
          <Line />
        </div>

        <RegisterViaEmail />
      </div>

    </div>
  )
}
