import { useEffect, useState } from "react";
import GridPessoaJuridica from "../../../components/MainMenu/PessoasPage/GridPessoaJuridica";

const PessoaJuridicaHome = (props) => {

  const { disableDelete, disableEdit } = props;
  const [pessoaJuridicaDb, setPessoaJuridicaDb] = useState([]);


  useEffect(() => {
    setPessoaJuridicaDb(JSON.parse(localStorage.getItem("pessoajuridica_db")));
  }, []);


  const deletePessoaJuridica = (data) => {
    let items = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    items = items.filter((item) => item.id !== data.id);
    localStorage.setItem("pessoajuridica_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("pessoajuridica_db");
    }
    deleteRepresentanteLegal(data);
    setPessoaJuridicaDb(JSON.parse(localStorage.getItem("pessoajuridica_db")));
    deleteName(data);
  };


  const deleteName = (data) => {

    let itemDeletado = JSON.parse(localStorage.getItem("nomes_db"));
    itemDeletado = itemDeletado?.filter((obj) => obj.cdTipoNome === 2 && obj.cdCadastroNomes === data.cdPessoaJuridica);

    let items = JSON.parse(localStorage.getItem("nomes_db"));
    items = items.filter((item) => item.id !== itemDeletado[0].id);

    localStorage.setItem("nomes_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("nomes_db");
    }
  };

  const deleteRepresentanteLegal = (data) => {
    let items = JSON.parse(localStorage.getItem("representanteslegais_db"));
    items = items.filter((item) => item.cdPessoaJuridica !== data.cdPessoaJuridica);
    localStorage.setItem("representanteslegais_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("representanteslegais_db");
    }
  };

  const filtraPessoaJuridica = (
    nomeEmpresarial,
    cnpj
  ) => {
    if (!nomeEmpresarial && !cnpj) {
      setPessoaJuridicaDb(JSON.parse(localStorage.getItem("pessoajuridica_db")));
      return;
    }

    let items = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    items = filterer
      ((x) => x.nomeEmpresarial.toLowerCase().includes(nomeEmpresarial.toLowerCase()))
      ((x) => x.cnpj.includes(cnpj))
      (run(items));

    setPessoaJuridicaDb(items);
  };

  const run = (value = []) => ({ type: run, value: value });

  const filterer = (f) => (g) =>
    g && g.type === run
      ? g.value.filter((x) => f(x))
      : filterer((x) => f(x) && g(x));



  return (
    <>
      <GridPessoaJuridica
        pessoajuridica_db={pessoaJuridicaDb}
        deletepj={deletePessoaJuridica}
        filter={filtraPessoaJuridica}
        disableDelete={disableDelete}
        disableEdit={disableEdit}
      />
    </>
  );
};

export default PessoaJuridicaHome;
