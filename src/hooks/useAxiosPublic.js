import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "https://contesthub-server-site.vercel.app"
  // withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;


