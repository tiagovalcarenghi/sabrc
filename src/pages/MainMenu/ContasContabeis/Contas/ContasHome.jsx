import { useEffect, useState } from "react";
import GridContas from "../../../../components/MainMenu/ContasContabeis/Contas/GridContas";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasHome = (props) => {
    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [contasDb, setContasDb] = useState([]);


    useEffect(() => {
        setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
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

    const deleteConta = (data) => {
        let items = JSON.parse(localStorage.getItem("contascontabeis_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("contascontabeis_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("contascontabeis_db");
        }
        setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
    };

    const filtraConta = (desContaContabil, cdTipoConta, cdTipoSaldo) => {
        if (!desContaContabil && !cdTipoConta && !cdTipoSaldo) {
            setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
            return;
        }

        console.log(cdTipoConta);
        console.log(cdTipoSaldo);

        let items = JSON.parse(localStorage.getItem("contascontabeis_db"));
        items = filterer((x) => x.desContaContabil.toLowerCase().includes(desContaContabil.toLowerCase()))(run(items));
        if (isEligible(cdTipoConta)) { items = filterer(((x) => x.cdTipoConta === cdTipoConta))(run(items)); }
        if (isEligible(cdTipoSaldo)) { items = filterer(((x) => x.cdTipoSaldo === cdTipoSaldo))(run(items)); }

        setContasDb(items);
    };

    function isEligible(value) {
        if (value !== false || value !== null || value !== 0 || value !== "") {
            return value;
        }
    }


    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridContas
                    contascontabeis_db={contasDb}
                    deleteconta={deleteConta}
                    filter={filtraConta}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                />
            </AppMenu>
        </>
    );
};

export default ContasHome;
