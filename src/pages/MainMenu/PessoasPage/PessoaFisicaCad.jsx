import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroPF from "../../../components/MainMenu/PessoasPage/CadastroPessoaFisica";
import { initialNomes } from "../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import { initialValuesPF } from "../../../util/MainMenu/PessoasPage/constants";
import { isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";

const PessoaFisiscaCad = () => {
  const [pessoaFisicaEmEdicao, setPessoaFisicaEmEdicao] = useState(initialValuesPF);
  const location = useLocation();
  const [enderecoDb, setEnderecoDb] = useState([]);

  useEffect(() => {
    console.log(location.state);

    carregarEndereco();

    if (!location.state.id) {
      setPessoaFisicaEmEdicao(initialValuesPF);
      return;
    }
    carregarPessoaFisica(location.state.id);
  }, [location.state]);

  const carregarEndereco = async () => {
    setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
  }

  const carregarPessoaFisica = async (id) => {
    const pessoaFisicaStorage = JSON.parse(localStorage.getItem("pessoafisica_db"));
    const selectPessoaFisica = pessoaFisicaStorage?.filter((pf) => pf.id === id);
    setPessoaFisicaEmEdicao(selectPessoaFisica[0]);
  };

  const salvarPessoaFisica = (pf) => {
    if (pf.id) {
      var updatePessoaFisica = JSON.parse(localStorage.getItem("pessoafisica_db"));
      updatePessoaFisica[updatePessoaFisica.findIndex((x) => x.id === pf.id)] = pf;
      localStorage.setItem("pessoafisica_db", JSON.stringify(updatePessoaFisica));
      setPessoaFisicaEmEdicao(initialValuesPF);
      editCadNomes(pf);
      return;
    }

    var getId = JSON.parse(localStorage.getItem("pessoafisica_db"));
    pf.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
    pf.cdPessoaFisica = pf.id;
    const newPessoaFisica = getId === null ? [pf] : [...JSON.parse(localStorage.getItem("pessoafisica_db")), pf];
    localStorage.setItem("pessoafisica_db", JSON.stringify(newPessoaFisica));
    setPessoaFisicaEmEdicao(initialValuesPF);
    insertcadNomes(pf);
  };

  const insertcadNomes = (pf) => {
    var newNomeCad = initialNomes;
    var getId = JSON.parse(localStorage.getItem("nomes_db"));
    newNomeCad.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
    newNomeCad.cdNomes = newNomeCad.id;
    newNomeCad.nome = pf.nomeCompleto;
    newNomeCad.cdTipoNome = 1;
    newNomeCad.cdCadastroNomes = pf.cdPessoaFisica;
    newNomeCad.isAgenteDeNegocio = pf.isAgenteDeNegocio;
    const newNome = getId === null ? [newNomeCad] : [...JSON.parse(localStorage.getItem("nomes_db")), newNomeCad];
    localStorage.setItem("nomes_db", JSON.stringify(newNome));

  }

  const editCadNomes = (pf) => {

    let itemUpdate = JSON.parse(localStorage.getItem("nomes_db"));
    const n = itemUpdate?.filter((obj) => obj.cdTipoNome === 1 && obj.cdCadastroNomes === pf.cdPessoaFisica);
    n[0].nome = pf.nomeCompleto;

    itemUpdate[itemUpdate.findIndex((x) => x.id === n[0].id)] = n[0];

    localStorage.setItem("nomes_db", JSON.stringify(itemUpdate));

  }

  const limparPessoaFisiscaEmEdicao = () => {
    setPessoaFisicaEmEdicao(initialValuesPF);
  };

  return (
    <AppMenu>
      <CadastroPF
        pessoafisica={pessoaFisicaEmEdicao}
        salvar={salvarPessoaFisica}
        limpar={limparPessoaFisiscaEmEdicao}
        enderecodb={enderecoDb}
      />
    </AppMenu>
  );
};

export default PessoaFisiscaCad;
