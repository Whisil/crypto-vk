import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import Login from "@/pages/login";
import { useEffect, useRef } from "react";

const AuthCheck = ({children} : any) => {

    const router = useRouter();
    const isMounted = useRef<HTMLDivElement>(null);

    const { isAuthenticated } = useMoralis();

    useEffect(() => {
        if(isAuthenticated) return
        else if (!isAuthenticated){
            router.push({pathname: '/'});
        }
    }, [])
 
    if(!isAuthenticated && isMounted.current){
        return <div ref={isMounted}><Login /></div>
    } else {
        return children;
    }
    
}

export default AuthCheck;