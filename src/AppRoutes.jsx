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
import ContratoCompraeVendaCad from "./pages/MainMenu/ContratoCompraeVenda/ContratoCompraeVendaCad";
import ContratoCompraeVendaHome from "./pages/MainMenu/ContratoCompraeVenda/ContratoCompraeVendaHome";
import ContratoLocacaoCad from "./pages/MainMenu/ContratoLocacao/ContratoLocacaoCad";
import ContratoLocacaoHome from "./pages/MainMenu/ContratoLocacao/ContratoLocacaoHome";
import EnderecoCad from "./pages/MainMenu/Enderecos/EnderecoCad";
import EnderecoHome from "./pages/MainMenu/Enderecos/EnderecoHome";
import LancamentoBancosCad from "./pages/MainMenu/LancamentoBancos/LancamentoBancosCad";
import LancamentoBancosHome from "./pages/MainMenu/LancamentoBancos/LancamentoBancosHome";
import LancamentoContabilCad from "./pages/MainMenu/LancamentoContabil/LancamentoContabilCad";
import LancamentoContabilHome from "./pages/MainMenu/LancamentoContabil/LancamentoContabilHome";
import MinutaPadraoCompraeVendaHome from "./pages/MainMenu/MinutasPadrao/CompraeVenda";
import MinutaPadraoLocacaoHome from "./pages/MainMenu/MinutasPadrao/MinutaPadraoContratodeLocacao";
import MinutaPadraoOSHome from "./pages/MainMenu/MinutasPadrao/MinutaPadraoOS";
import OrdemdeServicoCad from "./pages/MainMenu/OrdemdeServico/OrdemdeServicoCad";
import OrdemdeServicoHome from "./pages/MainMenu/OrdemdeServico/OrdemdeServicoHome";
import PessoasPage from "./pages/MainMenu/PessoasPage";
import PessoaFisicaCad from "./pages/MainMenu/PessoasPage/PessoaFisicaCad";
import PessoaJuridicaCad from "./pages/MainMenu/PessoasPage/PessoaJuridicaCad";
import RelatoriosContabeisHome from "./pages/MainMenu/RelatoriosContabeis/RelatoriosContabeisHome";
import PerfilPage from "./pages/PerfilPage";
import UsuarioCad from "./pages/UsuariosPage/UsuarioCad";
import UsuariosHome from "./pages/UsuariosPage/UsuariosHome";

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
            path="/editar/perfil"
            element={
              <Private>
                <PerfilPage />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/usuarios"
            element={
              <Private>
                <UsuariosHome />
              </Private>
            }
          />
          <Route
            exact
            path="/cadastro/cadusuarios"
            element={
              <Private>
                <UsuarioCad />
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
          <Route
            exact
            path="/operacoes/lancamentocontabil"
            element={
              <Private>
                <LancamentoContabilHome />
              </Private>
            }
          />
          <Route
            exact
            path="/operacoes/cadlancamentocontabil"
            element={
              <Private>
                <LancamentoContabilCad />
              </Private>
            }
          />

          <Route
            exact
            path="/operacoes/lancamentobancos"
            element={
              <Private>
                <LancamentoBancosHome />
              </Private>
            }
          />
          <Route
            exact
            path="/operacoes/cadlancamentobancos"
            element={
              <Private>
                <LancamentoBancosCad />
              </Private>
            }
          />


          <Route
            exact
            path="/operacoes/contratocompraevenda"
            element={
              <Private>
                <ContratoCompraeVendaHome />
              </Private>
            }
          />
          <Route
            exact
            path="/operacoes/cadcontratocompraevenda"
            element={
              <Private>
                <ContratoCompraeVendaCad />
              </Private>
            }
          />

          <Route
            exact
            path="/operacoes/contratolocacao"
            element={
              <Private>
                <ContratoLocacaoHome />
              </Private>
            }
          />
          <Route
            exact
            path="/operacoes/cadcontratolocacao"
            element={
              <Private>
                <ContratoLocacaoCad />
              </Private>
            }
          />

          <Route
            exact
            path="/operacoes/ordemdeservico"
            element={
              <Private>
                <OrdemdeServicoHome />
              </Private>
            }
          />
          <Route
            exact
            path="/operacoes/cadordemdeservico"
            element={
              <Private>
                <OrdemdeServicoCad />
              </Private>
            }
          />

          <Route
            exact
            path="/relatorios/relatorioscontabeis"
            element={
              <Private>
                <RelatoriosContabeisHome />
              </Private>
            }
          />


        </Routes>
      </AuthProvider>
    </Router >
  );
};

export default AppRoutes;
