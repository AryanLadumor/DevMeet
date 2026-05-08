import axios from "axios"
import {  BASE_URL , BACKEND_ROUTE_URL } from "./Constants"

const apiCall = axios.create({
    baseURL:  location.hostname==="localhost"? BASE_URL :BACKEND_ROUTE_URL,
    withCredentials:true
})

export default apiCall;