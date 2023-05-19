import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroEndereco from "../../../components/MainMenu/Enderecos/CadastroEndereco";
import { initialNomes } from "../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import { initialValuesEnderecos } from "../../../util/MainMenu/Enderecos/constants";
import { isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const EnderecoCad = () => {
    const [enderecoEmEdicao, setEnderecoEmEdicao] = useState(initialValuesEnderecos);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state.id) {
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
            editCadNomes(cc);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("enderecos_db"));
        cc.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        cc.cdEndereco = cc.id;
        const newEndereco = getId === null ? [cc] : [...JSON.parse(localStorage.getItem("enderecos_db")), cc];
        localStorage.setItem("enderecos_db", JSON.stringify(newEndereco));
        setEnderecoEmEdicao(initialValuesEnderecos);
        insertcadNomes(cc);
    };

    const insertcadNomes = (cc) => {

        var newNomeCad = initialNomes;
        var getId = JSON.parse(localStorage.getItem("nomes_db"));
        newNomeCad.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newNomeCad.cdNomes = newNomeCad.id;
        newNomeCad.nome = cc.enderecoCompleto;
        newNomeCad.cdTipoNome = 3;
        newNomeCad.cdCadastroNomes = cc.cdEndereco;
        const newNome = getId === null ? [newNomeCad] : [...JSON.parse(localStorage.getItem("nomes_db")), newNomeCad];
        localStorage.setItem("nomes_db", JSON.stringify(newNome));
    }


    const editCadNomes = (cc) => {

        var numeroadress = isBlank(cc.numero) ? "" : ", " + cc.numero;

        let itemUpdate = JSON.parse(localStorage.getItem("nomes_db"));
        const n = itemUpdate?.filter((obj) => obj.cdTipoNome === 3 && obj.cdCadastroNomes === cc.cdEndereco);
        n[0].nome = cc.logradouro + numeroadress;

        itemUpdate[itemUpdate.findIndex((x) => x.id === n[0].id)] = n[0];

        localStorage.setItem("nomes_db", JSON.stringify(itemUpdate));

    }


    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }


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
