import { ToastContainer, toast, Flip } from "react-toastify";

const toastr = toast;

function Toastr() {
  return (
    <ToastContainer
      autoClose={4000}
      transition={Flip}
      limit={1}
      position={toast.POSITION.BOTTOM_LEFT}
      theme="dark"
      pauseOnHover
      newestOnTop
      draggable={false}
    />
  );
}

export { Toastr, toastr };
