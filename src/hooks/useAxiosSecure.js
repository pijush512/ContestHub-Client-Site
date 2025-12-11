// import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
//       config.headers.Authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     });

//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         console.log(error);
//         const statusCode = error.status;
//         if (statusCode === 401 || statusCode === 403) {
//           logOut()
//           .then(() => {
//             navigate('/');
//           });
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//     };
//   }, [user, logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;





import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          await logOut();
          navigate("/", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;




