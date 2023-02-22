import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroEndereco from "../../../components/MainMenu/Enderecos/CadastroEndereco";
import { initialValuesEnderecos } from "../../../util/MainMenu/Enderecos/constants";
import AppMenu from "../../AppNavBar/AppMenu";


const EnderecoCad = () => {
    const [enderecoEmEdicao, setEnderecoEmEdicao] = useState(initialValuesEnderecos);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state) {
            setEnderecoEmEdicao(initialValuesEnderecos);
            return;
        }
        carregarEndereco(location.state.id);
    }, [location.state]);

    const carregarEndereco = async (id) => {
        const enderecoStorage = JSON.parse(localStorage.getItem("enderecos_db"));
        const selectEndereco = enderecoStorage?.filter((cc) => cc.id === id);
        setEnderecoEmEdicao(selectEndereco[0]);
    };

    const salvarEndereco = (cc) => {
        if (cc.id) {
            var updateEndereco = JSON.parse(localStorage.getItem("enderecos_db"));
            updateEndereco[updateEndereco.findIndex((x) => x.id === cc.id)] = cc;
            localStorage.setItem("enderecos_db", JSON.stringify(updateEndereco));
            setEnderecoEmEdicao(initialValuesEnderecos);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("enderecos_db"));
        cc.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        cc.cdEndereco = cc.id;
        const newEndereco = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("enderecos_db")), cc];
        localStorage.setItem("enderecos_db", JSON.stringify(newEndereco));
        setEnderecoEmEdicao(initialValuesEnderecos);
    };

    const limparenderecoEmEdicao = () => {
        setEnderecoEmEdicao(initialValuesEnderecos);
    };

    return (
        <AppMenu>
            <CadastroEndereco
                endereco={enderecoEmEdicao}
                salvar={salvarEndereco}
                limpar={limparenderecoEmEdicao}
            />
        </AppMenu>
    );
};

export default EnderecoCad;
