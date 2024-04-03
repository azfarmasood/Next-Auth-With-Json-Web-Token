"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login_Form = () => {
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
        e.preventDefault()
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })
    
            if(res?.error){
                setError(JSON.parse(res.error).message);
            }
            else {
                clearInputs()
                router.push("/")
            }
            
        } catch (err) {
            console.error(err)
            const error = String(err)
            throw new Error(error)
        }

    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full px-32">

      <input type="email" placeholder="Enter Your Email..." value={email} onChange={handleEmailChange}  className="border border-gray-800 px-4 py-2 rounded-lg hover:border-b-gray-600" />

      <input type="password" placeholder="Enter Your Password..." value={password} onChange={handlePasswordChange} className="border border-gray-800 mt-4 rounded-lg px-4 py-2 hover:border-b-gray-600" />

      <button type="submit" className="px-6 py-2 border rounded-lg bg-gray-900 text-white duration-300 text-sm uppercase mt-4">Login</button>
      <Link href="/sign_up" className="mt-3 text-center">
      <h1 className="font-medium md:text-lg">Dont Have Account No Problem Please Sign UP</h1>
      </Link>
      {error && 
        <p className="text-lg font-bold text-red-500 text-center">{error}</p>
      }
    </form>
  )
}

export default Login_Form
