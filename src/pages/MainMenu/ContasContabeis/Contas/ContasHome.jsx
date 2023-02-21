import { useEffect, useState } from "react";
import GridContas from "../../../../components/MainMenu/ContasContabeis/Contas/GridContas";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasHome = (props) => {
    const { disableDelete, disableEdit } = props;
    const [contasDb, setContasDb] = useState([]);


    useEffect(() => {
        setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
    }, []);


    const deleteConta = (data) => {
        let items = JSON.parse(localStorage.getItem("contascontabeis_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("contascontabeis_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("contascontabeis_db");
        }
        setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
    };

    const filtraConta = (
        desContaContabil,
        cdTipoConta,
        cdTipoSaldo
    ) => {
        if (!desContaContabil && !cdTipoConta && !cdTipoSaldo) {
            setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("contascontabeis_db"));
        items = filterer((x) => x.desContaContabil.toLowerCase().includes(desContaContabil.toLowerCase()))
            ((x) => x.cdTipoConta.includes(cdTipoConta))
            ((x) => x.cdTipoSaldo.includes(cdTipoSaldo))
            (run(items));

        setContasDb(items);
    };

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
