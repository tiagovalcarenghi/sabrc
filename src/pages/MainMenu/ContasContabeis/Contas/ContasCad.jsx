import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContas from "../../../../components/MainMenu/ContasContabeis/Contas/CadastroContas";
import { initialValuesContasContabeis } from "../../../../util/MainMenu/ContasContabeis/Contas/contants";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasCad = () => {
    const [contaContabilEmEdicao, setContaContabilEmEdicao] = useState(initialValuesContasContabeis);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state) {
            setContaContabilEmEdicao(initialValuesContasContabeis);
            return;
        }
        carregarContaContabil(location.state.id);
    }, [location.state]);

    const carregarContaContabil = async (id) => {
        const contaContabilStorage = JSON.parse(localStorage.getItem("contascontabeis_db"));
        const selectContaContabil = contaContabilStorage?.filter((cc) => cc.id === id);
        setContaContabilEmEdicao(selectContaContabil[0]);
    };

    const salvarContaContabil = (cc) => {
        if (cc.id) {
            var updateContaContabil = JSON.parse(localStorage.getItem("contascontabeis_db"));
            updateContaContabil[updateContaContabil.findIndex((x) => x.id === cc.id)] = cc;
            localStorage.setItem("contascontabeis_db", JSON.stringify(updateContaContabil));
            setContaContabilEmEdicao(initialValuesContasContabeis);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("contascontabeis_db"));
        cc.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        cc.cdContaContabil = cc.id;
        const newContaContabil = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("contascontabeis_db")), cc];
        localStorage.setItem("contascontabeis_db", JSON.stringify(newContaContabil));
        setContaContabilEmEdicao(initialValuesContasContabeis);
    };

    const limparContaContabilEmEdicao = () => {
        setContaContabilEmEdicao(initialValuesContasContabeis);
    };

    return (
        <AppMenu>
            <CadastroContas
                contacontabil={contaContabilEmEdicao}
                salvar={salvarContaContabil}
                limpar={limparContaContabilEmEdicao}
            />
        </AppMenu>
    );
};

export default ContasCad;
