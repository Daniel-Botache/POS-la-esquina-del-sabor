import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorMessage = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
};

export const succesMessage = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};
