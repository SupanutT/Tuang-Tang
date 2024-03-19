import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

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
  const router = useRouter()

  const [checkBoxError, setCheckBoxError] = useState({
    checkOne: false,
  })

  const [errors, setErrors] = useState<FormData>(structuredClone(defaultFormData))


  const handleRegistration = async (formData: FormData) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Register successfully')
        router.push('/mybill')

        // Handle successful login, e.g., redirect to another page
      } else {
        console.error('Register failed');
        // Handle failed login, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during register:', error);
      // Handle network errors or other issues
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
    const validationErrors = await validateForm()
    const haveErrors = Object.values(validationErrors).some((x) => x !== null && x !== "")

    if (haveErrors) {
      setErrors(validationErrors)
      return
    } else {
      handleRegistration(data);
      // complete register??
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/mybill",
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [event.target.name]: event.target.value,
    })
    // console.log(data)
  }

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxError({
      ...checkBoxError,
      [event.target.name]: event.target.checked,
    })
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

        <div className="mt-[30px] w-full relative">
          {/* Link ไป ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge และ นโยบายคุ้มครองความเป็นส่วนตัว*/}
          <input
            type="checkbox"
            name="checkOne"
            id="checkOne"
            className="absolute left-0 top-1 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    md:top-1
                                    "
            onChange={(e) => {
              handleCheckBoxChange(e)
            }}
            required
          />
          <label htmlFor="checkOne" className="block text-[9.5px] pl-[20px] cursor-pointer md:text-sm">
            ฉันได้อ่านและยอมรับ
            <Link href={"/"} className="text-[#326FE2] hover:underline hover:underline-offset">
              ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge
            </Link>
          </label>
        </div>

        <button
          className="w-full bg-[#334155] hover:bg-slate-600 text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-base md:text-lg"
        >
          Sign Up
        </button>

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
