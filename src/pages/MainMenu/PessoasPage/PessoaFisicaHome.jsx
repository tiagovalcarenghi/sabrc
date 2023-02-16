import { useEffect, useState } from "react";
import GridPessoaFisica from "../../../components/MainMenu/PessoasPage/GridPessoaFisica";

const PessoaFisicaHome = () => {
  const [pessoaFisiscaDb, setPessoaFisiscaDb] = useState([]);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);

  useEffect(() => {
    setPessoaFisiscaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));

    const usuario = JSON.parse(localStorage.getItem("user_storage"));
    if (usuario) {
      usuario.tipoUser === "ADMIN"
        ? disables(1)
        : usuario.tipoUser === "MASTER"
        ? disables(2)
        : disables(0);
    }
  }, []);

  const disables = (data) => {
    switch (data) {
      case 1:
        setDisableDelete(false);
        setDisableEdit(false);
        break;
      case 2:
        setDisableDelete(true);
        setDisableEdit(false);
        break;
      default:
        setDisableDelete(true);
        setDisableEdit(true);
    }
  };

  const deletePessoaFisica = (data) => {
    let items = JSON.parse(localStorage.getItem("pessoafisica_db"));
    items = items.filter((item) => item.id !== data.id);
    localStorage.setItem("pessoafisica_db", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("pessoafisica_db");
    }
    setPessoaFisiscaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
  };

  const filtraPessoaFisisca = (nomeCompleto) => {
    if (!nomeCompleto) {
      setPessoaFisiscaDb(JSON.parse(localStorage.getItem("pessoafisica_db")));
      return;
    }

    let items = JSON.parse(localStorage.getItem("pessoafisica_db"));
    items = items?.filter((item) =>
      item.nomeCompleto.toLowerCase().includes(nomeCompleto.toLowerCase())
    );
    setPessoaFisiscaDb(items);
  };

  return (
    <>
      <GridPessoaFisica
        pessoafisica_db={pessoaFisiscaDb}
        deletepf={deletePessoaFisica}
        filter={filtraPessoaFisisca}
        disableDelete={disableDelete}
        disableEdit={disableEdit}
      />
    </>
  );
};

export default PessoaFisicaHome;
