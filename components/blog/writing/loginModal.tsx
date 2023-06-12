import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { signIn } from "next-auth/react";

function LoginModal() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-10 overflow-y-auto",
        open ? "visible" : "invisible"
      )}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <motion.div
          className="fixed inset-0 z-10 bg-black opacity-60 transition-opacity"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <motion.div
          className="relative z-20 inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Sign in
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please sign in to continue.
                </p>
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => signIn("google")}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginModal;
