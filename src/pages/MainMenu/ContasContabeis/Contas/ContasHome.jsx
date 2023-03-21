import { useEffect, useState } from "react";
import { verificaDisableDelete, verificaDisableEdit } from "../../../../components/commons/Disables";
import GridContas from "../../../../components/MainMenu/ContasContabeis/Contas/GridContas";
import { isEligible } from "../../../../util/utils";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasHome = () => {
    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [contasDb, setContasDb] = useState([]);


    useEffect(() => {
        setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
    }, []);


    useEffect(() => {
        setDisableDelete(verificaDisableDelete());
        setDisableEdit(verificaDisableEdit());
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

    const filtraConta = (desContaContabil, cdTipoConta, cdTipoSaldo) => {
        if (!desContaContabil && !cdTipoConta && !cdTipoSaldo) {
            setContasDb(JSON.parse(localStorage.getItem("contascontabeis_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("contascontabeis_db"));
        items = filterer((x) => x.desContaContabil.toLowerCase().includes(desContaContabil.toLowerCase()))(run(items));
        if (isEligible(cdTipoConta)) { items = filterer(((x) => x.cdTipoConta === cdTipoConta))(run(items)); }
        if (isEligible(cdTipoSaldo)) { items = filterer(((x) => x.cdTipoSaldo === cdTipoSaldo))(run(items)); }

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
