import { useEffect, useState } from "react";
import { verificaDisableEdit } from "../../../../components/commons/Disables";
import CadastroMinutasPadraoCompraeVenda from "../../../../components/MainMenu/MinutasPadrao/CadastroMinutasPadraoCompraeVenda";
import { initialValuesMinutasPadraoCeV } from "../../../../util/MainMenu/MinutasPadrao/ContratoCompraeVenda/constants";
import { isEligible } from "../../../../util/utils";
import AppMenu from "../../../AppNavBar/AppMenu";


const MinutaPadraoCompraeVendaHome = () => {
    const [disableEdit, setDisableEdit] = useState(true);
    const [minutasPadraoContratoCeVEmEdicao, setminutasPadraoContratoCeVEmEdicao] = useState(initialValuesMinutasPadraoCeV);


    useEffect(() => {
        carregarMinutaPadraoCeV();
    }, []);

    const carregarMinutaPadraoCeV = async () => {
        const minutasPadraoContratoCeVStorage = JSON.parse(localStorage.getItem("minutaspadraocev_db"));
        if (minutasPadraoContratoCeVStorage) {
            setminutasPadraoContratoCeVEmEdicao(minutasPadraoContratoCeVStorage.reduce((max, game) => max.id > game.id ? max : game));
        }
    };

    const salvarMinutasPadraoCeV = (mpcev) => {
        var getId = JSON.parse(localStorage.getItem("minutaspadraocev_db"));
        mpcev.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        mpcev.cdMinutaPadraoContratoCeV = mpcev.id;
        const newMinutaPadraoCeV = getId === null ? [mpcev] : [...JSON.parse(localStorage.getItem("minutaspadraocev_db")), mpcev];
        localStorage.setItem("minutaspadraocev_db", JSON.stringify(newMinutaPadraoCeV));
        carregarMinutaPadraoCeV();
    };



    useEffect(() => {
        setDisableEdit(verificaDisableEdit);
    }, []);


    return (
        <>
            <AppMenu>
                <CadastroMinutasPadraoCompraeVenda
                    minutaspadraocev_db={minutasPadraoContratoCeVEmEdicao}
                    disableEdit={disableEdit}
                    salvar={salvarMinutasPadraoCeV}
                />
            </AppMenu>
        </>
    );
};

export default MinutaPadraoCompraeVendaHome;
