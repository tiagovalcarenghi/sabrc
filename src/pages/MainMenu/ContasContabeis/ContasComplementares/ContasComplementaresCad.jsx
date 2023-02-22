import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContasComplementares from "../../../../components/MainMenu/ContasContabeis/ContasComplementares/CadastroContasComplementares";
import { initialValuesContasComplementares } from "../../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasComplementaresCad = () => {
    const [contaComplementarEmEdicao, setContaComplementarEmEdicao] = useState(initialValuesContasComplementares);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state) {
            setContaComplementarEmEdicao(initialValuesContasComplementares);
            return;
        }
        carregarContaComplementar(location.state.id);
    }, [location.state]);

    const carregarContaComplementar = async (id) => {
        const contaComplementarStorage = JSON.parse(localStorage.getItem("contascomplementares_db"));
        const selectContaComplementar = contaComplementarStorage?.filter((cc) => cc.id === id);
        setContaComplementarEmEdicao(selectContaComplementar[0]);
    };

    const salvarContaComplementar = (cc) => {
        if (cc.id) {
            var updateContaComplementar = JSON.parse(localStorage.getItem("contascomplementares_db"));
            updateContaComplementar[updateContaComplementar.findIndex((x) => x.id === cc.id)] = cc;
            localStorage.setItem("contascomplementares_db", JSON.stringify(updateContaComplementar));
            setContaComplementarEmEdicao(initialValuesContasComplementares);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("contascomplementares_db"));
        cc.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        cc.cdContaComplementar = cc.id;
        const newContaComplementar = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("contascomplementares_db")), cc];
        localStorage.setItem("contascomplementares_db", JSON.stringify(newContaComplementar));
        setContaComplementarEmEdicao(initialValuesContasComplementares);
    };

    const limparContaComplementarEmEdicao = () => {
        setContaComplementarEmEdicao(initialValuesContasComplementares);
    };

    return (
        <AppMenu>
            <CadastroContasComplementares
                contacomplementar={contaComplementarEmEdicao}
                salvar={salvarContaComplementar}
                limpar={limparContaComplementarEmEdicao}
            />
        </AppMenu>
    );
};

export default ContasComplementaresCad;
