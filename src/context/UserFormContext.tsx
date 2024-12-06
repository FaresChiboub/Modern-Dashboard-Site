"use client";

import React, {
  useState,
  createContext,
  ReactNode,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { signOut, useSession } from "next-auth/react";
import { deleteCookie } from "cookies-next/client";

// Defining the types for children props and form events context
interface childrenProps {
  children: ReactNode;
}
interface formEventsProps {
  redirectToRegister: () => void;
  redirectToLogin: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmitRegister: (e: FormEvent<HTMLFormElement>) => void;
  handleShowPassword: (field: "password" | "confirmPassword") => void;
  handleLogout: () => void;
  user: User | null;

  inputData: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  };
  isPasswordMatch: boolean;
  showPassword: {
    password: boolean;
    confirmPassword: boolean;
  };
}

// Form data type definition
interface formData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
interface User {
  username: string | null;
  email: string | null;
  image: string | null;
}

// Create a context for user form state
export const UserFormContext = createContext<formEventsProps | null>(null);

// User form context provider component
const UserFormContextProvider = ({ children }: childrenProps) => {
  // Toast hook for showing notifications
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  // Get the current date and time to display in the toast notifications
  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // State for showing and toggling password visibility
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  // State for checking if passwords match during registration
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);

  // State for managing the input data for the form (email, username, password)
  const [inputData, setInputData] = useState<formData>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  // Function to handle changes in form inputs (username, password, email)
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setInputData((prevInput) => ({ ...prevInput, [id]: value }));
  }

  // Function to redirect to the register page
  function redirectToRegister() {
    router.push("/register");
  }

  // Function to redirect to the login page
  function redirectToLogin() {
    router.push("/login");
  }

  // Handle the login form submission
  async function handleSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password } = inputData;
    try {
      // Send a POST request to the login route
      const response = await fetch("/api/loginRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the user is already logged in
      if (response.status === 409) {
        toast({
          variant: "destructive",
          title: "Already Logged In",
          description: "You are already logged in. Please log out first.",
          action: <ToastAction altText="Log out">Log out</ToastAction>,
        });
        return;
      }

      // If login is successful, handle the response
      const data = await response.json();
      if (data.error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });

        // Redirect to the home page after successful login
      } else {
        // Handle case where login is unsuccessful
        toast({
          title: "Login Successful",
          description: `Logged in at ${new Date().toLocaleString()}`,
          style: {
            backgroundColor: "#3B82F6",
            color: "white",
          },
        });
        router.push("/");
        location.reload();
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while logging in.",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  }

  // Handle the register form submission
  async function handleSubmitRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, email, password } = inputData;

    try {
      // Send a POST request to the register route
      const response = await fetch("/api/registerRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        // Log the status code for debugging purposes
        console.error(`Request failed with status: ${response.status}`);

        // If the response body is empty, you can handle it like this:
        if (response.status === 204) {
          toast({
            variant: "destructive",
            title: "No Content",
            description: "No data received from server.",
          });
        } else {
          // If response is not empty but still not OK, parse the error message
          const data = await response.text();
          let message = "Unknown error occurred.";
          const parsedData = JSON.parse(data);
          if (parsedData) {
            message = parsedData.error.message;
          }
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        return;
      }

      // If the response is OK, parse the response as JSON
      const data = await response.json();

      // Check for specific error messages if any
      if (data?.error?.message === "Username already exists!") {
        toast({
          variant: "destructive",
          title: "Username Taken",
          description:
            "This username is already in use. Please choose another one.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      // Handle successful registration
      toast({
        title: "Account Created Successfully",
        description: `Account Created at ${currentDate}`,
        style: {
          backgroundColor: "#3B82F6",
          color: "white",
        },
      });
      router.push("/verify");
      location.reload();
    } catch (error) {
      console.error("Fetched register failed", error);

      // Handle network or other errors with a toast
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  // Toggle password visibility
  function handleShowPassword(field: "password" | "confirmPassword") {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  // Logout
  const handleLogout = async () => {
    // If there's a session, log out using NextAuth
    if (session) {
      signOut();
      console.log("Logged out using session");
      router.push("/login");
      return;
    }
    if (!session) {
      try {
        // Call the logout route to handle the server-side logout
        const response = await fetch("/api/logoutRoute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Logout successful from token");
          // Remove token and refreshToken from cookies
          deleteCookie("token");
          deleteCookie("refreshToken");
          console.log("Logged out using token cookies");
          router.push("/login");
        } else {
          console.error("Failed to log out: ", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    } else {
      console.log("No session or token found, nothing to log out");
    }
  };

  // Check if the passwords match and set the state accordingly
  useEffect(() => {
    if (inputData.password === inputData.confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [inputData.password, inputData.confirmPassword]);

  // Using useEffect to handle session or token data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/decodeToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (session && session.user) {
        setUser({
          username: session.user.name || "Guest",
          email: session.user.email || "",
          image: session.user.image || "",
        });
      } else if (data && data.username) {
        setUser({
          username: data.username || {},
          email: data.email || "",
          image: data.image || "",
        });
      } else {
        setUser(null);
      }
    };
    fetchData();
  }, [session]);

  return (
    // Provide the form events and state through context to the child components
    <UserFormContext.Provider
      value={{
        handleChange,
        handleSubmitLogin,
        handleSubmitRegister,
        handleShowPassword,
        inputData,
        isPasswordMatch,
        showPassword,
        redirectToRegister,
        redirectToLogin,
        user,
        handleLogout,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};

export default UserFormContextProvider;
