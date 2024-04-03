"use client";
import { RegisterUsers } from "@/services/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Response {
  status: number;
  error: {
    message: string;
  }
}

const Sign_UP_Form = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value); 
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const clearInputs = () => {
        setEmail("")
        setPassword("")
        setError("")
    }

    const handleSubmit = async (e:React.FormEvent) => {
      try {
          e.preventDefault()
          const res = await RegisterUsers(email, password) as Response;
          if (res.status === 201) {
              clearInputs();
              router.push("/login");
              router.refresh();
          } 
          else {
              setError(res.error.message);
          }
      } 
      catch (error) {
          console.log(error)
      }
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full px-32">

      <input type="email" placeholder="Enter Your Email..." value={email} onChange={handleEmailChange}  className="border border-gray-800 px-4 py-2 rounded-lg hover:border-b-gray-600" />

      <input type="password" placeholder="Enter Your Password..." value={password} onChange={handlePasswordChange} className="border border-gray-800 mt-4 rounded-lg px-4 py-2 hover:border-b-gray-600" />
      <div className="flex">        
      <button type="submit" className="px-6 py-2 border rounded-lg bg-gray-900 text-white duration-300 text-sm uppercase mt-4">SignUP</button>
      <Link href={"/login"}>
      <button className="px-6 py-2 border rounded-lg bg-gray-900 text-white duration-300 text-sm uppercase mt-4">Signin</button>
      </Link>
      </div>
      {error && 
        <p className="text-lg font-bold text-red-500 text-center">{error}</p>
      }
    </form>
  )
}

export default Sign_UP_Form
