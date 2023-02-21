import { useEffect, useState } from "react";
import GridCentrodeCusto from "../../../../components/MainMenu/ContasContabeis/CentrodeCusto/GridCentrodeCusto";
import AppMenu from "../../../AppNavBar/AppMenu";


const CentrodeCustoHome = () => {
    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [centrodeCustoDb, setCentrodeCustoDb] = useState([]);


    useEffect(() => {
        setCentrodeCustoDb(JSON.parse(localStorage.getItem("centrodecusto_db")));
    }, []);


    useEffect(() => {
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

    const deleteCentrodeCusto = (data) => {
        let items = JSON.parse(localStorage.getItem("centrodecusto_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("centrodecusto_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("centrodecusto_db");
        }
        setCentrodeCustoDb(JSON.parse(localStorage.getItem("centrodecusto_db")));
    };

    const filtraConta = (descCentrodeCusto) => {
        if (!descCentrodeCusto) {
            setCentrodeCustoDb(JSON.parse(localStorage.getItem("centrodecusto_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("centrodecusto_db"));
        items = filterer((x) => x.descCentrodeCusto.toLowerCase().includes(descCentrodeCusto.toLowerCase()))(run(items));

        setCentrodeCustoDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridCentrodeCusto
                    centrodecusto_db={centrodeCustoDb}
                    deletecentrodecusto={deleteCentrodeCusto}
                    filter={filtraConta}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                />
            </AppMenu>
        </>
    );
};

export default CentrodeCustoHome;
