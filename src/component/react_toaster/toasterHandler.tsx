import { toast } from "react-toastify";

export const showSuccessToast = () => {
  toast.success("Message successfully sent, and are you ready to die!");
};

export const showErrorToast = (message = "Something went wrong, try again in the afterlife!") => {
  toast.error(message);
};
