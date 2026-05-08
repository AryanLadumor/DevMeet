import io from "socket.io-client"
import { SOCKET_URL , BASE_URL } from "./Constants"
export const createSocketConnection = () =>{
    if(location.hostname==="localhost"){
        return io(BASE_URL)
    }else{
        return io("/" , {path : SOCKET_URL})
    }
} 