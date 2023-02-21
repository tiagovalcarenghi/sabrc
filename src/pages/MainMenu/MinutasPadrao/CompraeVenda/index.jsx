import { useEffect, useState } from "react";
import CadastroMinutasPadraoCompraeVenda from "../../../../components/MainMenu/MinutasPadrao/CadastroMinutasPadraoCompraeVenda";
import { initialValuesMinutasPadraoCeV } from "../../../../util/MainMenu/MinutasPadrao/ContratoCompraeVenda/constants";
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
        mpcev.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        mpcev.cdMinutaPadraoContratoCeV = mpcev.id;
        const newMinutaPadraoCeV = getId === null ? [mpcev] : [...JSON.parse(localStorage.getItem("minutaspadraocev_db")), mpcev];
        localStorage.setItem("minutaspadraocev_db", JSON.stringify(newMinutaPadraoCeV));
        carregarMinutaPadraoCeV();
    };



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
                setDisableEdit(false);
                break;
            case 2:
                setDisableEdit(false);
                break;
            default:
                setDisableEdit(true);
        }
    };



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
