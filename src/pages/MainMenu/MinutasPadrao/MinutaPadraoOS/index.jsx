import { useEffect, useState } from "react";
import CadastroMinutasOS from "../../../../components/MainMenu/MinutasPadrao/CadastroMinutasOS";
import { initialValuesMinutasPadraoOS } from "../../../../util/MainMenu/MinutasPadrao/ContratoOS/constants";
import AppMenu from "../../../AppNavBar/AppMenu";


const MinutaPadraoOSHome = () => {
    const [disableEdit, setDisableEdit] = useState(true);
    const [minutasPadraoContratoOSEmEdicao, setminutasPadraoContratoOSEmEdicao] = useState(initialValuesMinutasPadraoOS);


    useEffect(() => {
        carregarMinutaPadraoOS();
    }, []);

    const carregarMinutaPadraoOS = async () => {
        const minutasPadraoContratoOSStorage = JSON.parse(localStorage.getItem("minutaspadraoos_db"));
        if (minutasPadraoContratoOSStorage) {
            setminutasPadraoContratoOSEmEdicao(minutasPadraoContratoOSStorage.reduce((max, game) => max.id > game.id ? max : game));
        }
    };

    const salvarMinutasPadraoOS = (mpOS) => {
        var getId = JSON.parse(localStorage.getItem("minutaspadraoos_db"));
        mpOS.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        mpOS.cdMinutaPadraoContratoOS = mpOS.id;
        const newMinutaPadraoOS = getId === null ? [mpOS] : [...JSON.parse(localStorage.getItem("minutaspadraoos_db")), mpOS];
        localStorage.setItem("minutaspadraoos_db", JSON.stringify(newMinutaPadraoOS));
        carregarMinutaPadraoOS();
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
                <CadastroMinutasOS
                    minutaspadraoos_db={minutasPadraoContratoOSEmEdicao}
                    disableEdit={disableEdit}
                    salvar={salvarMinutasPadraoOS}
                />
            </AppMenu>
        </>
    );
};

export default MinutaPadraoOSHome;
