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
import CentrodeCustoCad from "./pages/MainMenu/ContasContabeis/CentrodeCusto/CentrodeCustoCad";
import CentrodeCustoHome from "./pages/MainMenu/ContasContabeis/CentrodeCusto/CentrodeCustoHome";
import ContasCad from "./pages/MainMenu/ContasContabeis/Contas/ContasCad";
import ContasHome from "./pages/MainMenu/ContasContabeis/Contas/ContasHome";
import ContasComplementaresCad from "./pages/MainMenu/ContasContabeis/ContasComplementares/ContasComplementaresCad";
import ContasComplementaresHome from "./pages/MainMenu/ContasContabeis/ContasComplementares/ContasComplementaresHome";
import EnderecoCad from "./pages/MainMenu/Enderecos/EnderecoCad";
import EnderecoHome from "./pages/MainMenu/Enderecos/EnderecoHome";
import MinutaPadraoCompraeVendaHome from "./pages/MainMenu/MinutasPadrao/CompraeVenda";
import MinutaPadraoLocacaoHome from "./pages/MainMenu/MinutasPadrao/MinutaPadraoContratodeLocacao";
import MinutaPadraoOSHome from "./pages/MainMenu/MinutasPadrao/MinutaPadraoOS";
import PessoasPage from "./pages/MainMenu/PessoasPage";
import PessoaFisicaCad from "./pages/MainMenu/PessoasPage/PessoaFisicaCad";
import PessoaJuridicaCad from "./pages/MainMenu/PessoasPage/PessoaJuridicaCad";
import PerfilPage from "./pages/PerfilPage";

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
            path="/editar/perfil"
            element={
              <Private>
                <PerfilPage />
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
          <Route
            exact
            path="/cadastro/contascontabeis/contas"
            element={
              <Private>
                <ContasHome />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/contascontabeis/cadcontas"
            element={
              <Private>
                <ContasCad />
              </Private>
            }
          />

          <Route
            exact
            path="/cadastro/contascontabeis/contascomplementares"
            element={
              <Private>
                <ContasComplementaresHome />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/contascontabeis/cadcontascomplementares"
            element={
              <Private>
                <ContasComplementaresCad />
              </Private>
            }
          />

          <Route
            exact
            path="/cadastro/contascontabeis/centrodecusto"
            element={
              <Private>
                <CentrodeCustoHome />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/contascontabeis/cadcentrodecusto"
            element={
              <Private>
                <CentrodeCustoCad />
              </Private>
            }
          />

          <Route
            exact
            path="/cadastro/minutaspadrao/compraevenda"
            element={
              <Private>
                <MinutaPadraoCompraeVendaHome />
              </Private>
            }
          />


          <Route
            exact
            path="/cadastro/minutaspadrao/locacao"
            element={
              <Private>
                <MinutaPadraoLocacaoHome />
              </Private>
            }
          />

          <Route
            exact
            path="/cadastro/minutaspadrao/os"
            element={
              <Private>
                <MinutaPadraoOSHome />
              </Private>
            }
          />


          <Route
            exact
            path="/cadastro/enderecos"
            element={
              <Private>
                <EnderecoHome />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/cadenderecos"
            element={
              <Private>
                <EnderecoCad />
              </Private>
            }
          />


        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
