import LoginButton from "./loginButton";

function LoginModal() {
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <span className="fixed inset-0 z-10 bg-black sm:px-0" />
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="relative z-20 inline-block transform animate-fade-up overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
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
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
