import { useLoginuser } from "@/api/UserApi";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Formdata } from "type";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ApiUri = import.meta.env.VITE_API_URI;

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  login: (formData: Formdata) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [isError, setIsError] = useState<boolean>(false);

  const { Loginuser } = useLoginuser();

  
  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      GetUser();
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false);
      setIsLoading(false); 
    }
  }, []); 


  const GetUser = async () => {
    try {
      const response = await axios.get(`${ApiUri}api/user/details`, {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data);
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData: Formdata) => {
    try {
      setIsLoading(true);
        await Loginuser(formData);
        setIsAuthenticated(true);
        navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${ApiUri}api/user/logout`, {}, { withCredentials: true });
      Cookies.remove('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Cannot logout");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, isError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
