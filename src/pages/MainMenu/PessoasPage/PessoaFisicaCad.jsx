import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroPF from "../../../components/MainMenu/PessoasPage/CadastroPessoaFisica";
import { initialValuesPF } from "../../../util/MainMenu/PessoasPage/constants";
import AppMenu from "../../AppNavBar/AppMenu";

const PessoaFisiscaCad = () => {
  const [pessoaFisicaEmEdicao, setPessoaFisicaEmEdicao] = useState(initialValuesPF);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);

    if (!location.state) {
      setPessoaFisicaEmEdicao(initialValuesPF);
      return;
    }
    carregarPessoaFisica(location.state.id);
  }, [location.state]);

  const carregarPessoaFisica = async (id) => {
    const pessoaFisicaStorage = JSON.parse(
      localStorage.getItem("pessoafisica_db")
    );
    const selectPessoaFisica = pessoaFisicaStorage?.filter((pf) => pf.id === id);
    setPessoaFisicaEmEdicao(selectPessoaFisica[0]);
  };

  const salvarPessoaFisica = (pf) => {
    if (pf.id) {
      var updatePessoaFisica = JSON.parse(localStorage.getItem("pessoafisica_db"));
      updatePessoaFisica[updatePessoaFisica.findIndex((x) => x.id === pf.id)] = pf;
      localStorage.setItem("pessoafisica_db", JSON.stringify(updatePessoaFisica));
      setPessoaFisicaEmEdicao(initialValuesPF);
      return;
    }

    var getId = JSON.parse(localStorage.getItem("pessoafisica_db"));
    pf.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
    pf.cdPessoaFisica = pf.id;
    const newPessoaFisica = getId === null ? [pf] : [...JSON.parse(localStorage.getItem("pessoafisica_db")), pf];
    localStorage.setItem("pessoafisica_db", JSON.stringify(newPessoaFisica));
    setPessoaFisicaEmEdicao(initialValuesPF);
  };

  const limparPessoaFisiscaEmEdicao = () => {
    setPessoaFisicaEmEdicao(initialValuesPF);
  };

  return (
    <AppMenu>
      <CadastroPF
        pessoafisica={pessoaFisicaEmEdicao}
        salvar={salvarPessoaFisica}
        limpar={limparPessoaFisiscaEmEdicao}
      />
    </AppMenu>
  );
};

export default PessoaFisiscaCad;
