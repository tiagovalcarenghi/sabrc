import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/auth";
import LoginPage from "./pages/LoginPage";
import AppMenu from "./pages/AppNavBar/AppMenu";
import PessoasPage from "./pages/MainMenu/Cadastros/PessoasPage";
import PessoaFisiscaCad from "./pages/MainMenu/PessoasPage/PessoaFisiscaCad";

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
                <PessoaFisiscaCad />
              </Private>
            }
          />
          {/* <Route
            path="cadastro/usuarios"
            element={
              <Private>
                <UsuariosPage />
              </Private>
            }
          />
          <Route
            path="cadastro/contas-contabeis/contas"
            element={
              <Private>
                <ContasPage />
              </Private>
            }
          />
          <Route
            path="cadastro/contas-contabeis/contascomplement"
            element={
              <Private>
                <ContasComplementarPage />
              </Private>
            }
          />
          <Route
            path="cadastro/contas-contabeis/cdc"
            element={
              <Private>
                <CentrodeCustoPage />
              </Private>
            }
          />
          <Route
            path="cadastro/minutas-padrao/minutacontratoprestserv"
            element={
              <Private>
                <MinutaContratoPrestServPage />
              </Private>
            }
          />
          <Route
            path="cadastro/minutas-padrao/minutapadraocv"
            element={
              <Private>
                <MinutaPadraoCVPage />
              </Private>
            }
          />
          <Route
            path="cadastro/minutas-padrao/minutapadraolocacao"
            element={
              <Private>
                <MinutaPadraoLocacaoPage />
              </Private>
            }
          />
          <Route
            path="cadastro/enderecos"
            element={
              <Private>
                <EnderecosPage />
              </Private>
            }
          />
          <Route
            path="operacoes/contrato-locacao"
            element={
              <Private>
                <ContratoLocacaoPage />
              </Private>
            }
          />
          <Route
            path="operacoes/contratocv"
            element={
              <Private>
                <ContratoCeVPage />
              </Private>
            }
          />
          <Route
            path="operacoes/cadcontratocv"
            element={
              <Private>
                <CadastroCeVPage />
              </Private>
            }
          />
          <Route
            path="operacoes/lancamento-bancos"
            element={
              <Private>
                <LancamentoBancosPage />
              </Private>
            }
          />
          <Route
            path="operacoes/lancamento-contabil"
            element={
              <Private>
                <LancamentoContabilPage />
              </Private>
            }
          />
          <Route
            path="operacoes/ordem-de-servico"
            element={
              <Private>
                <OrdemDeServicoPage />
              </Private>
            }
          />
          <Route
            path="operacoes/are"
            element={
              <Private>
                <ArePage />
              </Private>
            }
          />
          <Route
            path="relatorios/balancete"
            element={
              <Private>
                <BalancetePage />
              </Private>
            }
          />
          <Route
            path="relatorios/dre"
            element={
              <Private>
                <DrePage />
              </Private>
            }
          />
          <Route
            path="relatorios/lancamento"
            element={
              <Private>
                <LancamentoPage />
              </Private>
            }
          />
          <Route
            path="relatorios/livro-razao"
            element={
              <Private>
                <LivroRazaoPage />
              </Private>
            }
          />
          <Route
            path="relatorios/pesquisa-por-campo"
            element={
              <Private>
                <PesquisaPorCampoPage />
              </Private>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
