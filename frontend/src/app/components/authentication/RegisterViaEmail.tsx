import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import userRegister from "@/libs/userRegister"
import PrimaryButton from "../PrimaryButton"

type FormData = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const defaultFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export default function RegisterViaEmail() {

  const [data, setFormData] = useState<FormData>(structuredClone(defaultFormData))
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const [errors, setErrors] = useState<FormData>(structuredClone(defaultFormData))


  const handleRegistration = async (formData: FormData) => {
    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

    const user = await userRegister(formDataWithoutConfirmPassword)

    if (user.ok) {
      await signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/mybill",
      })
      console.log('Register successfully')
      // Handle successful login, e.g., redirect to another page
    } else {
      console.error('Register failed');
      // Handle failed login, e.g., show an error message
    }

  }


  const validateForm = async () => {
    const errors: FormData = structuredClone(defaultFormData)
    if (data.email === "") {
      errors.email = "Please enter your email"
    } else if (false) { //check if not end with @gmail.com of something that not is an email
      errors.email = "Please enter a valid email address"
    } else if (false) { //check this email is already register
      errors.email = "This email is already in use"
    }

    if (data.password === "") {
      errors.password = "Please enter your password"
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (data.confirmPassword === "") {
      errors.confirmPassword = "Please enter your password"
    } else if (data.confirmPassword != data.password) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (data.name === "") {
      errors.name = "Please enter your name"
    }

    if (data.username === "") {
      errors.username = "Please enter your username"
    }
    // console.log(errors)
    return errors
  }

  const handleValidationForm = async () => {
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);
    const validationErrors = await validateForm()
    const haveErrors = Object.values(validationErrors).some((x) => x !== null && x !== "")

    if (haveErrors) {
      setTimeout(() => {
        setErrors(validationErrors);
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
      }, 1000);
      return
    } else {
      handleRegistration(data);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [event.target.name]: event.target.value,
    })
    // console.log(data)
  }

  return (
    <form className="w-full" action={handleValidationForm} noValidate>

      <div className="pt-[5px]">

        <Input
          name="name"
          label="Name"
          inputType="text"
          warning={errors.name}
          handleChange={handleChange}
          value={data.name}
        />
        <Input
          name="username"
          label="Username"
          inputType="text"
          warning={errors.username}
          handleChange={handleChange}
          value={data.username}
        />

        {/* Email Input Component */}
        <Input
          name="email"
          label="Email"
          inputType="email"
          warning={errors.email}
          handleChange={handleChange}
          value={data.email}
        />

        {/* Password Input Component */}
        <PasswordInput
          fromLoginPage={false}
          handleChange={handleChange}
          value={data.password}
          warning={errors.password}
        />

        {/*Confirm Password Input Component */}
        <ConfirmPasswordInput
          handleChange={handleChange}
          value={data.confirmPassword}
          warning={errors.confirmPassword}
        />

        <PrimaryButton
          type="submit"
          isDisabled={isDisabled}
          className="w-full bg-[#334155] hover:bg-slate-600 text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-base md:text-lg"
          isLoading={primaryLoading}
          loadingMessage="Waiting"
        >
          Sign Up
        </PrimaryButton>

        <p className="w-full text-center text-sm mt-[10px] md:text-base">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-[#326FE2] hover:underline hover:underline-offset-2">
            Login
          </Link>
        </p>
      </div>


    </form>
  )
}
