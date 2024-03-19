import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
import { signIn } from "next-auth/react"
import userLogIn from "@/libs/userLogIn"

type Error = {
  username: string
  password: string
}

type Form = {
  username: string
  password: string
}

export default function LoginViaUsername() {
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState<Error>({
    username: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const validateForm = () => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    // const password_pattern = /^.{8}$/
    let success = true
    const errors: Error = {
      username: "",
      password: "",
    }
    if (form.username === "" || form.password === "") {
      errors.username = form.username === "" ? "Please enter your username" : ""
      errors.password = form.password === "" ? "Please enter your password" : ""
      success = false
    } else if (false) { //username is not in database
      errors.username = "Please enter a valid username address"
      success = false
    } else if (false) {
      errors.password = "Invalid password"
      success = false
    }

    return { errors, success }
  }

  const handleValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log(event.target)
    const { errors, success } = validateForm()
    if (!success) {
      setErrors(errors)
      return
    } else {
      const user = await userLogIn(form.username, form.username);
      if (user) {
        signIn("credentials", {
          username: form.username,
          password: form.password,
          callbackUrl: "/mybill",
        })
      }
    }
  }

  return (
    <form className="mt-[10px] w-full" onSubmit={handleValidation} noValidate>
      {/* Email Input Component */}
      <Input
        name="username"
        label="Username"
        inputType="text"
        warning={errors.username}
        handleChange={handleChange}
        value={form.username}
      />

      {/* Password Input Component */}
      <PasswordInput
        fromLoginPage={true}
        handleChange={handleChange}
        value={form.password}
        warning={errors.password}
      />

      <button
        type="submit"
        className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
        Sign in
      </button>

      <p className="w-full text-center text-sm mt-[10px]">
        No account? {" "}
        <Link
          href={"/register"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2">
          Create account
        </Link>
      </p>
    </form>
  )
}
