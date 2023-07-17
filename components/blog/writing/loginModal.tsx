"use client";

import { m } from "framer-motion";
import { signIn } from "next-auth/react";
import Button from "../../shared/button";

function LoginModal() {
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <m.div
          className="fixed inset-0 z-10 bg-black sm:px-0"
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
        <m.div
          className="relative z-20 inline-block transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="bg-white p-6 pb-4 ">
            <div className="space-y-4 text-center sm:mt-0 sm:text-left">
              <h1
                className="text-xl font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Sign in
              </h1>
              <p className="text-sm text-gray-500">
                Please sign in to continue.
              </p>
              <Button
                onClick={() => signIn("google")}
                className="w-full justify-center"
              >
                Sign in
              </Button>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default LoginModal;
