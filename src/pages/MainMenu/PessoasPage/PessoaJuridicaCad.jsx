import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroPJ from "../../../components/MainMenu/PessoasPage/CadastroPessoaJuridica";
import { initialValuesPJ, initialValuesRL } from "../../../util/MainMenu/PessoasPage/constants";
import AppMenu from "../../AppNavBar/AppMenu";

const PessoaJuridicaCad = () => {
  const [pessoaJuridicaEmEdicao, setPessoaJuridicaEmEdicao] = useState(initialValuesPJ);
  const [representanteLegalEmEdicao, setrepresentanteLegalEmEdicao] = useState(initialValuesRL);
  const [pessoaFisicaDb, setpessoaFisicaDb] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);

    if (!location.state) {
      setPessoaJuridicaEmEdicao(initialValuesPJ);
      setrepresentanteLegalEmEdicao(initialValuesRL);
      return;
    }
    carregarPessoaJuridica(location.state.id);
    carregaRepresentantesLegais(location.state.id);
    carregarPessoaFisicaOptions();
  }, [location.state]);

  const carregarPessoaJuridica = async (id) => {
    const pessoaJuridicaStorage = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    const selectPessoaJuridica = pessoaJuridicaStorage?.filter((pj) => pj.id === id);
    setPessoaJuridicaEmEdicao(selectPessoaJuridica[0]);
  };

  const carregaRepresentantesLegais = async (id) => {
    const pessoaRepresentantesLegaisStorage = JSON.parse(localStorage.getItem("representanteslegais_db"));
    const selectRepresentantesLegais = pessoaRepresentantesLegaisStorage?.filter((rl) => rl.cdPessoaJuridica === id);
    setrepresentanteLegalEmEdicao(selectRepresentantesLegais);

  }

  const carregarPessoaFisicaOptions = async () => {
    setpessoaFisicaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
  }

  const salvarPessoaJuridica = (pj) => {
    if (pj.id) {
      var updatePessoaJuridica = JSON.parse(localStorage.getItem("pessoajuridica_db"));
      updatePessoaJuridica[updatePessoaJuridica.findIndex((x) => x.id === pj.id)] = pj;
      localStorage.setItem("pessoajuridica_db", JSON.stringify(updatePessoaJuridica));
      setPessoaJuridicaEmEdicao(initialValuesPJ);
      return;
    }

    var getId = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    pj.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
    pj.cdPessoaJuridica = pj.id;
    const newPessoaJuridica = getId === null ? [pj] : [...JSON.parse(localStorage.getItem("pessoajuridica_db")), pj];
    localStorage.setItem("pessoajuridica_db", JSON.stringify(newPessoaJuridica));
    setPessoaJuridicaEmEdicao(initialValuesPJ);
  };

  const limparPessoaJuridicaEmEdicao = () => {
    setPessoaJuridicaEmEdicao(initialValuesPJ);
    setrepresentanteLegalEmEdicao(initialValuesRL);
  };

  const deleteRepresentanteLegal = (data) => {
    let items = JSON.parse(localStorage.getItem("representanteslegais_db"));
    items = items.filter((item) => item.id !== data.id);
    localStorage.setItem("representanteslegais_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("representanteslegais_db");
    }

    carregaRepresentantesLegais(data.cdPessoaJuridica);
  };

  const addRepresentanteLegal = (data, idPJ) => {

    var RepLegal = initialValuesRL;

    if (idPJ) {
      var getId = JSON.parse(localStorage.getItem("representanteslegais_db"));
      RepLegal.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
      RepLegal.cdPessoaJuridica = idPJ;
      RepLegal.cdPessoaFisica = data.cdPessoaFisica;
      RepLegal.nomeRepresentante = data.nomeCompleto;
      const newRepresentanteLegal = getId === null ? [RepLegal] : [...JSON.parse(localStorage.getItem("representanteslegais_db")), RepLegal];
      localStorage.setItem("representanteslegais_db", JSON.stringify(newRepresentanteLegal));
      carregaRepresentantesLegais(idPJ);
      return;
    }


    var getId = JSON.parse(localStorage.getItem("representanteslegais_db"));
    RepLegal.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
    var getId2 = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    RepLegal.cdPessoaJuridica = getId2 === null ? 1 : getId2[getId2.length - 1].id + 1;
    RepLegal.cdPessoaFisica = data.cdPessoaFisica;
    RepLegal.nomeRepresentante = data.nomeCompleto;
    const newRepresentanteLegal2 = getId === null ? [RepLegal] : [...JSON.parse(localStorage.getItem("representanteslegais_db")), RepLegal];
    localStorage.setItem("representanteslegais_db", JSON.stringify(newRepresentanteLegal2));
    carregaRepresentantesLegais(RepLegal.cdPessoaJuridica);
  };

  return (
    <AppMenu>
      <CadastroPJ
        pessoajuridica={pessoaJuridicaEmEdicao}
        representanteslegais={representanteLegalEmEdicao}
        salvar={salvarPessoaJuridica}
        limpar={limparPessoaJuridicaEmEdicao}
        deleterl={deleteRepresentanteLegal}
        addrl={addRepresentanteLegal}
        representanteslegaisoptions={pessoaFisicaDb}
      />
    </AppMenu>
  );
};

export default PessoaJuridicaCad;
