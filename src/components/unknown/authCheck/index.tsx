import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import Login from "@/pages/login";
import { useEffect } from "react";

const AuthCheck = ({children} : any) => {

    const router = useRouter();

    const { isAuthenticated } = useMoralis();

    useEffect(() => {
        if(!isAuthenticated){
            router.push({pathname: '/'});
        }
    }, [])
 
    if(!isAuthenticated){
        return <Login />
    } else {
        return children;
    }
    
}

export default AuthCheck;