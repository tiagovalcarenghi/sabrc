import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContasComplementares from "../../../../components/MainMenu/ContasContabeis/ContasComplementares/CadastroContasComplementares";
import { initialValuesContasComplementares } from "../../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasComplementaresCad = () => {
    const [contaComplementarEmEdicao, setContaComplementarEmEdicao] = useState(initialValuesContasComplementares);
    const location = useLocation();
    const [nomesDb, setnomesDb] = useState([]);

    useEffect(() => {
        if (!location.state.id) {
            setContaComplementarEmEdicao(initialValuesContasComplementares);
            return;
        }
        carregarNomes();
    }, [location.state]);

    const carregarNomes = async () => {
        setnomesDb(JSON.parse(localStorage.getItem("nomes_db")));
    }

    const salvarContaComplementar = (cc) => {
        var getId = JSON.parse(localStorage.getItem("contascomplementares_db"));
        cc.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        cc.cdContaContabil = cc.id;
        const newContaContabil = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("contascomplementares_db")), cc];
        localStorage.setItem("contascomplementares_db", JSON.stringify(newContaContabil));
        setContaComplementarEmEdicao(initialValuesContasComplementares);
    };


    return (
        <AppMenu>
            <CadastroContasComplementares
                contacomplementar={contaComplementarEmEdicao}
                salvar={salvarContaComplementar}
                nomes_db={nomesDb}
            />
        </AppMenu>
    );
};

export default ContasComplementaresCad;
