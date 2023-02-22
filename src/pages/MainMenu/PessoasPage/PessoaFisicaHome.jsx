import { useEffect, useState } from "react";
import GridPessoaFisica from "../../../components/MainMenu/PessoasPage/GridPessoaFisica";

const PessoaFisicaHome = (props) => {
  const { disableDelete, disableEdit } = props;
  const [pessoaFisicaDb, setpessoaFisicaDb] = useState([]);


  useEffect(() => {
    setpessoaFisicaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
  }, []);


  const deletePessoaFisica = (data) => {
    let items = JSON.parse(localStorage.getItem("pessoafisica_db"));
    items = items.filter((item) => item.id !== data.id);
    localStorage.setItem("pessoafisica_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("pessoafisica_db");
    }
    setpessoaFisicaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
  };

  const filtraPessoaFisisca = (
    nomeCompleto,
    telefonePrincipal,
    enderecoCompleto
  ) => {
    if (!nomeCompleto && !telefonePrincipal && !enderecoCompleto) {
      setpessoaFisicaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
      return;
    }

    let items = JSON.parse(localStorage.getItem("pessoafisica_db"));
    items = filterer((x) => x.nomeCompleto.toLowerCase().includes(nomeCompleto.toLowerCase()))
      ((x) => x.telefone.includes(telefonePrincipal))
      ((x) => x.enderecoCompleto.toLowerCase().includes(enderecoCompleto.toLowerCase()))
      (run(items));

    setpessoaFisicaDb(items);
  };

  const run = (value = []) => ({ type: run, value: value });

  const filterer = (f) => (g) =>
    g && g.type === run
      ? g.value.filter((x) => f(x))
      : filterer((x) => f(x) && g(x));


  return (
    <>
      <GridPessoaFisica
        pessoafisica_db={pessoaFisicaDb}
        deletepf={deletePessoaFisica}
        filter={filtraPessoaFisisca}
        disableDelete={disableDelete}
        disableEdit={disableEdit}
      />
    </>
  );
};

export default PessoaFisicaHome;
