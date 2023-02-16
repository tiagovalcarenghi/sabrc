import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  usuarioIncorreto,
  usuarioInvalido,
} from "../util/applicationresources";
import { createContratoCeV, createPessoaFisica, createUsers } from "./storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem("user_storage");
    const usersStorage = localStorage.getItem("users_db");

    if (usuario && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.usuario === JSON.parse(usuario).usuario
      );

      if (hasUser) setUser(hasUser[0]);
    } else {
      localStorage.setItem("users_db", JSON.stringify(createUsers));
    }

    carregarStorage();
    setLoading(false);
  }, []);

  const carregarStorage = async () => {
    localStorage.setItem("contratocev_db", JSON.stringify(createContratoCeV));
    localStorage.setItem("pessoafisica_db", JSON.stringify(createPessoaFisica));
  };

  const login = (nameUser, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.filter((user) => user.nameUser === nameUser);

    if (hasUser?.length) {
      if (
        hasUser[0].nameUser === nameUser &&
        hasUser[0].password === password
      ) {
        const loggedUser = {
          id: hasUser[0].id,
          nameUser: nameUser,
          email: hasUser[0].email,
          tipoUser: hasUser[0].tipoUser,
        };

        localStorage.setItem("user_storage", JSON.stringify(loggedUser));

        setUser(loggedUser);

        return;
      } else {
        return usuarioIncorreto;
      }
    } else {
      return usuarioInvalido;
    }
  };

  const logout = () => {
    //localStorage.removeItem("user_storage");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
