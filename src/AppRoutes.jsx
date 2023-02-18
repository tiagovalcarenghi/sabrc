import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/auth";
import AppMenu from "./pages/AppNavBar/AppMenu";
import LoginPage from "./pages/LoginPage";
import PessoasPage from "./pages/MainMenu/PessoasPage";
import PessoaFisicaCad from "./pages/MainMenu/PessoasPage/PessoaFisicaCad";
import PessoaJuridicaCad from "./pages/MainMenu/PessoasPage/PessoaJuridicaCad";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/*"
            element={
              <Private>
                <AppMenu />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/pessoas"
            element={
              <Private>
                <PessoasPage />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/pessoas/pf"
            element={
              <Private>
                <PessoaFisicaCad />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/pessoas/pj"
            element={
              <Private>
                <PessoaJuridicaCad />
              </Private>
            }
          />
        
        </Routes>       
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
