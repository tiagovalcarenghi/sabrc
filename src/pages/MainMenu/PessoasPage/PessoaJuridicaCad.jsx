import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroPJ from "../../../components/MainMenu/PessoasPage/CadastroPessoaJuridica";
import { initialValuesPJ } from "../../../util/MainMenu/PessoasPage/constants";
import AppMenu from "../../AppNavBar/AppMenu";

const PessoaJuridicaCad = () => {
  const [pessoaJuridicaEmEdicao, setPessoaJuridicaEmEdicao] =
    useState(initialValuesPJ);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);

    if (!location.state) {
      setPessoaJuridicaEmEdicao(initialValuesPJ);
      return;
    }
    carregarPessoaJuridica(location.state.id);
  }, [location.state]);

  const carregarPessoaJuridica = async (id) => {
    const pessoaJuridicaStorage = JSON.parse(
      localStorage.getItem("pessoajuridica_db")
    );
    const selectPessoaJuridica = pessoaJuridicaStorage?.filter(
      (pj) => pj.id === id
    );
    setPessoaJuridicaEmEdicao(selectPessoaJuridica[0]);
  };

  const salvarPessoaJuridica = (pj) => {
    if (pj.id) {
      var updatePessoaJuridica = JSON.parse(
        localStorage.getItem("pessoajuridica_db")
      );
      updatePessoaJuridica[updatePessoaJuridica.findIndex((x) => x.id === pj.id)] =
        pj;
      localStorage.setItem(
        "pessoajuridica_db",
        JSON.stringify(updatePessoaJuridica)
      );
      setPessoaJuridicaEmEdicao(initialValuesPJ);
      return;
    }

    var getId = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    pj.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
    pj.cdPessoaJuridica = pj.id;
    const newPessoaJuridica =
      getId === null
        ? [pj]
        : [...JSON.parse(localStorage.getItem("pessoajuridica_db")), pj];
    localStorage.setItem("pessoajuridica_db", JSON.stringify(newPessoaJuridica));
    setPessoaJuridicaEmEdicao(initialValuesPJ);
  };

  const limparPessoaJuridicaEmEdicao = () => {
    setPessoaJuridicaEmEdicao(initialValuesPJ);
  };

  const deleteRepresentanteLegal = (data) => {

    let items = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    // items = items.filter((item) => item.representantesLegais.id === data.id);

    console.log(items);

    // let items = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    // items = items.filter((item) => item.id !== data.id);
    // localStorage.setItem("pessoajuridica_db", JSON.stringify(items));
    // if (items.length === 0) {
    //   localStorage.removeItem("pessoajuridica_db");
    // }
    // setPessoaJuridicaDb(JSON.parse(localStorage.getItem("pessoajuridica_db")));
  };

  const addRepresentanteLegal = (data) => {

    alert(data.nomeRepresentante);

  };

  return (
    <AppMenu>
      <CadastroPJ
        pessoajuridica={pessoaJuridicaEmEdicao}
        salvar={salvarPessoaJuridica}
        limpar={limparPessoaJuridicaEmEdicao}
        deleterl={deleteRepresentanteLegal}
        addrl={addRepresentanteLegal}
      />
    </AppMenu>
  );
};

export default PessoaJuridicaCad;
