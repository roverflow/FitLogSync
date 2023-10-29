import { UserAuth } from "@/context/AuthContext";

const LoginComponent = () => {
  const { googleSignIn } = UserAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="mt-24 flex items-center justify-center">
      <div class="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200">
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-zinc-500 dark:text-zinc-400">
            By logging in, you accept our{" "}
            <a class="text-blue-500 hover:text-blue-700" href="#">
              terms{" "}
            </a>
            and{" "}
            <a class="text-blue-500 hover:text-blue-700" href="#">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Email
            </label>
            <input
              type="email"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="m@example.com"
              required=""
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Password
            </label>
            <input
              type="password"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              placeholder="********"
              required=""
            />
          </div>
          <div class="flex items-center space-x-2">
            <hr class="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span class="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
            <hr class="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div>
          <button
            onClick={handleSignIn}
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-[#4285F4] text-white"
          >
            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class=" w-5 h-5 mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" x2="12" y1="8" y2="8"></line>
                <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
              </svg>
              Login with Google
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
