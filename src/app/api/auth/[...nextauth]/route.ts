import NextAuth from "next-auth/next"
import CredentialsProvider  from "next-auth/providers/credentials"

const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET environment variable is not defined");
}


const authHandler = NextAuth({
    secret: secret,
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize (credentials) {
                try {
                   const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                   });
                   const data = await response.json();
                   if(response.status === 200){
                       return data.result;
                   }
                   else {
                    throw new Error(JSON.stringify(data));
                   }
                } 
                catch (err) {
                    const error = String(err)
                    throw new Error(error)        
                }
            }
        }),
        
    ],
    pages: {
        signIn: "/login",
        newUser: "/register"
    }
})

export { authHandler as GET, authHandler as POST }