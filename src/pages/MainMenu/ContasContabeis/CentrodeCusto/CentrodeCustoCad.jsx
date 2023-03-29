import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroCentrodeCusto from "../../../../components/MainMenu/ContasContabeis/CentrodeCusto/CadastroCentrodeCusto";
import { initialValuesCentrodeCusto } from "../../../../util/MainMenu/ContasContabeis/CentrodeCusto/contants";
import { isEligible } from "../../../../util/utils";

import AppMenu from "../../../AppNavBar/AppMenu";


const CentrodeCustoCad = () => {
    const [centrodeCustoEmEdicao, setcentrodeCustoEmEdicao] = useState(initialValuesCentrodeCusto);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state.id) {
            setcentrodeCustoEmEdicao(initialValuesCentrodeCusto);
            return;
        }
        carregarcentrodeCusto(location.state.id);
    }, [location.state]);

    const carregarcentrodeCusto = async (id) => {
        const centrodeCustoStorage = JSON.parse(localStorage.getItem("centrodecusto_db"));
        const selectcentrodeCusto = centrodeCustoStorage?.filter((cc) => cc.id === id);
        setcentrodeCustoEmEdicao(selectcentrodeCusto[0]);
    };

    const salvarcentrodeCusto = (cc) => {
        if (cc.id) {
            var updatecentrodeCusto = JSON.parse(localStorage.getItem("centrodecusto_db"));
            updatecentrodeCusto[updatecentrodeCusto.findIndex((x) => x.id === cc.id)] = cc;
            localStorage.setItem("centrodecusto_db", JSON.stringify(updatecentrodeCusto));
            setcentrodeCustoEmEdicao(initialValuesCentrodeCusto);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("centrodecusto_db"));
        cc.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        cc.cdcentrodeCusto = cc.id;
        const newcentrodeCusto = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("centrodecusto_db")), cc];
        localStorage.setItem("centrodecusto_db", JSON.stringify(newcentrodeCusto));
        setcentrodeCustoEmEdicao(initialValuesCentrodeCusto);
    };

    const limparcentrodeCustoEmEdicao = () => {
        setcentrodeCustoEmEdicao(initialValuesCentrodeCusto);
    };

    return (
        <AppMenu>
            <CadastroCentrodeCusto
                centrodecusto={centrodeCustoEmEdicao}
                salvar={salvarcentrodeCusto}
                limpar={limparcentrodeCustoEmEdicao}
            />
        </AppMenu>
    );
};

export default CentrodeCustoCad;
