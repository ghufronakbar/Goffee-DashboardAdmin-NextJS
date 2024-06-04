import axios from "axios";

const axiosInstanceLogin = axios.create({
    baseURL: "http://localhost:5000/api/admin"
})


export default axiosInstanceLogin