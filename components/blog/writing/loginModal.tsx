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
          className="fixed inset-0 z-10 bg-black/50 sm:px-0"
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
          className="relative z-20 inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
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
              <div className="mt-2">
                <Button
                  onClick={() => signIn("google")}
                  className="w-full justify-center"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default LoginModal;
