import { useEffect, useState } from "react";
import { verificaDisableEdit } from "../../../../components/commons/Disables";
import CadastroMinutasLocacao from "../../../../components/MainMenu/MinutasPadrao/CadastroMinutasPadraoLocacao";
import { initialValuesMinutasPadraoLocacao } from "../../../../util/MainMenu/MinutasPadrao/ContratoLocacao/constants";
import { isEligible } from "../../../../util/utils";
import AppMenu from "../../../AppNavBar/AppMenu";


const MinutaPadraoLocacaoHome = () => {
    const [disableEdit, setDisableEdit] = useState(true);
    const [minutasPadraoContratoLocacaoEmEdicao, setminutasPadraoContratoLocacaoEmEdicao] = useState(initialValuesMinutasPadraoLocacao);


    useEffect(() => {
        carregarMinutaPadraoLocacao();
    }, []);

    const carregarMinutaPadraoLocacao = async () => {
        const minutasPadraoContratoLocacaoStorage = JSON.parse(localStorage.getItem("minutaspadraolocacao_db"));
        if (minutasPadraoContratoLocacaoStorage) {
            setminutasPadraoContratoLocacaoEmEdicao(minutasPadraoContratoLocacaoStorage.reduce((max, game) => max.id > game.id ? max : game));
        }
    };

    const salvarMinutasPadraoLocacao = (mpLocacao) => {
        var getId = JSON.parse(localStorage.getItem("minutaspadraolocacao_db"));
        mpLocacao.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        mpLocacao.cdMinutaPadraoContratoLocacao = mpLocacao.id;
        const newMinutaPadraoLocacao = getId === null ? [mpLocacao] : [...JSON.parse(localStorage.getItem("minutaspadraolocacao_db")), mpLocacao];
        localStorage.setItem("minutaspadraolocacao_db", JSON.stringify(newMinutaPadraoLocacao));
        carregarMinutaPadraoLocacao();
    };



    useEffect(() => {
        setDisableEdit(verificaDisableEdit);
    }, []);


    return (
        <>
            <AppMenu>
                <CadastroMinutasLocacao
                    minutaspadraolocacao_db={minutasPadraoContratoLocacaoEmEdicao}
                    disableEdit={disableEdit}
                    salvar={salvarMinutasPadraoLocacao}
                />
            </AppMenu>
        </>
    );
};

export default MinutaPadraoLocacaoHome;
