import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.PROD
    ? "https://chatapp-1-pdro.onrender.com"
    : "http://localhost:5001");

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("Auth Response:", res.data);
            set({ authUser: res.data });
            
            get().connectSocket();
        } catch (error) {
            console.error("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.log("Logout API error (ignoring):", error);
        }
        set({ authUser: null });
        toast.success("Logged out successfully");
        get().disconnectSocket()
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error in updateProfile:", error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () =>{
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket = io(SOCKET_URL, { withCredentials: true });
        set({ socket: newSocket });
     }
    ,
    disconnectSocket: () => {
        const { socket } = get();
        if (socket) socket.disconnect();
        set({ socket: null });
    }


}));
