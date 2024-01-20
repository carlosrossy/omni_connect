import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContextData {
  userCredentials: IUser | null;
  setUserCredentials: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   async function loadStoragedData() {
  //     try {
  //       const storedUserCredentialsJSON = await AsyncStorage.getItem(
  //         "userCredentials"
  //       );

  //       if (storedUserCredentialsJSON) {
  //         const storedUserCredentials = JSON.parse(storedUserCredentialsJSON);

  //         setUserCredentials(storedUserCredentials);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error loading user credentials from AsyncStorage: ",
  //         error
  //       );
  //     }
  //   }

  //   loadStoragedData();
  // }, []);

  const logout = useCallback(async () => {
    try {
      setToken(null);
      setUserCredentials(null);
    } catch (error) {
      console.log("Error while logging out:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userCredentials, setUserCredentials, logout, setToken, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
