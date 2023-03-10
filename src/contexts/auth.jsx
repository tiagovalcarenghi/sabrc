import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  msgUsuarioIncorreto,
  msgUsuarioInvalido,
} from "../util/applicationresources";
import {
  createCentrodeCusto,
  createCompradorProcuradorBase,
  createCompradorProcuradorOperacao,
  createContasComplementares,
  createContasContabeis,
  createContratosdeCompraeVendaBase,
  createEnderecos,
  createHonorariosCorretorParceiroBase,
  createHonorariosCorretorParceiroOperacao,
  createLancamentoContasPatrimoniais,
  createLancamentoContasResultado,
  createLancamentosContabeisAll,
  createLancamentosContabeisBase,
  createLancamentosContabeisOperacao,
  createMinutasPadraoCeV,
  createMinutasPadraoLocacao,
  createMinutasPadraoOrdemServico,
  createNomes,
  createPessoaFisica,
  createPessoaJuridica,
  createRepresentantesLegaisBase,
  createUsers,
  createVendedorProcuradorBase,
  createVendedorProcuradorOperacao,
} from "./storage";

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
    localStorage.setItem("pessoafisica_db", JSON.stringify(createPessoaFisica));
    localStorage.setItem("pessoajuridica_db", JSON.stringify(createPessoaJuridica));
    localStorage.setItem("representanteslegais_db", JSON.stringify(createRepresentantesLegaisBase));
    localStorage.setItem("contascontabeis_db", JSON.stringify(createContasContabeis));
    localStorage.setItem("minutaspadraocev_db", JSON.stringify(createMinutasPadraoCeV));
    localStorage.setItem("minutaspadraolocacao_db", JSON.stringify(createMinutasPadraoLocacao));
    localStorage.setItem("minutaspadraoos_db", JSON.stringify(createMinutasPadraoOrdemServico));
    localStorage.setItem("centrodecusto_db", JSON.stringify(createCentrodeCusto));
    localStorage.setItem("enderecos_db", JSON.stringify(createEnderecos));
    localStorage.setItem("contascomplementares_db", JSON.stringify(createContasComplementares));
    localStorage.setItem("nomes_db", JSON.stringify(createNomes));
    localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(createLancamentosContabeisAll));
    localStorage.setItem("lancamentoscontabeisabase_db", JSON.stringify(createLancamentosContabeisBase));
    localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify(createLancamentosContabeisOperacao));
    localStorage.setItem("lancamentoscontasresultado_db", JSON.stringify(createLancamentoContasResultado));
    localStorage.setItem("lancamentoscontaspatrimoniais_db", JSON.stringify(createLancamentoContasPatrimoniais));
    localStorage.setItem("contratocompraevendabase_db", JSON.stringify(createContratosdeCompraeVendaBase));
    localStorage.setItem("compradorprocurador_db", JSON.stringify(createCompradorProcuradorBase));
    localStorage.setItem("compradorprocuradoroperacao_db", JSON.stringify(createCompradorProcuradorOperacao));
    localStorage.setItem("vendedorprocurador_db", JSON.stringify(createVendedorProcuradorBase));
    localStorage.setItem("vendedorprocuradoroperacao_db", JSON.stringify(createVendedorProcuradorOperacao));
    localStorage.setItem("honorarioscorretorparceiro_db", JSON.stringify(createHonorariosCorretorParceiroBase));
    localStorage.setItem("honorarioscorretorparceirooperacao_db", JSON.stringify(createHonorariosCorretorParceiroOperacao));
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
          password: hasUser[0].password,
        };

        localStorage.setItem("user_storage", JSON.stringify(loggedUser));

        setUser(loggedUser);

        return;
      } else {
        return msgUsuarioIncorreto;
      }
    } else {
      return msgUsuarioInvalido;
    }
  };

  const logout = () => {
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
