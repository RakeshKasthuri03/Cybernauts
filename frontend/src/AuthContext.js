import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token"); // Or use cookies
      if (!token) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_BACKEND_URI}:3001/admin/validate`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = response.data;

        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <AuthContext.Provider value={{ role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
