import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroOrdemdeServico from "../../../components/MainMenu/OrdemdeServico/CadastroOrdemdeServico";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";
import { initialOrdemdeServicoBase } from "../../../util/MainMenu/OS/constants";


const OrdemdeServicoCad = () => {
    const [ordemDeServicoEmEdicao, setOrdeDeServicoEmEdicao] = useState(initialOrdemdeServicoBase);
    const [contratanteNomes, setContratanteNomes] = useState([]);
    const [enderecoNomes, setEnderecoNomes] = useState([]);
    const location = useLocation();
    let cdContratanteSave = null;
    //busca usuário sistema
    const userStorage = JSON.parse(localStorage.getItem("user_storage"));

    useEffect(() => {

        if (!location.state.id) {
            limparOS();
            carregarNomes();
            return;
        }
        carregarOrdemDeServico(location.state.id);
    }, [location.state.id]);


    const carregarOrdemDeServico = async (id) => {

        limparOS();

        const ordemDeServicoStorage = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        const selectOrdemDeServico = ordemDeServicoStorage?.filter((cc) => cc.id === id);
        setOrdeDeServicoEmEdicao(selectOrdemDeServico[0]);

        carregarNomes();
    };

    const carregarNomes = async () => {

        const nomesStorage = JSON.parse(localStorage.getItem("nomes_db"));

        const selectComp = nomesStorage?.filter((cc) => cc.cdTipoNome === 1 || cc.cdTipoNome === 2);
        setContratanteNomes(selectComp);

        const selctAdress = nomesStorage?.filter((cc) => cc.cdTipoNome === 3);
        setEnderecoNomes(selctAdress);

    }

    const run = (value = []) => ({ type: run, value: value });


    const salvarOrdemdeServico = (os) => {

        if (os.id) {
            var updateOS = JSON.parse(localStorage.getItem("ordemdeservico_db"));
            updateOS[updateOS.findIndex((x) => x.id === os.id)] = os;
            localStorage.setItem("ordemdeservico_db", JSON.stringify(updateOS));
            return;
        }


        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        var getId = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        getId = !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;

        
        saveContratantes(getId, os);


        os.id = getId;
        os.cdOrdemdeServico = getId;
        os.cdContratante = cdContratanteSave;
        os.isValido = true;
        os.status = 'RASCUNHO';
        os.dataAdd = getCurrentDate();
        os.usuarioAdd = userStorage.id;

        const newOS = getId === null ? [os] : [...JSON.parse(localStorage.getItem("ordemdeservico_db")), os];
        localStorage.setItem("ordemdeservico_db", JSON.stringify(newOS));
       

    };


    

    const saveContratantes = (cdOS, contratanteOperacao) => {

        var newContratante = {};
        const listContratantes = [];


        if (!isEligible(JSON.parse(localStorage.getItem("contratante_db")))) {
            localStorage.setItem("contratante_db", JSON.stringify([]));
        }
        const contratanteDb = JSON.parse(localStorage.getItem("contratante_db"));
        var getCd = !isEligible(contratanteDb.length) ? 1 : contratanteDb.length + 1;
        var getId = contratanteDb.length;

        cdContratanteSave = getCd;


        if (isEligible(contratanteOperacao)) {

            getId = !isEligible(getId) ? 1 : getId + 1;

            newContratante.id = getId;
            newContratante.cdOrdemdeServico = cdOS;
            newContratante.cdContratante = cdContratanteSave;
            newContratante.cdNomeContratante = contratanteOperacao.cdContratante;
            newContratante.nomeContratante = contratanteOperacao.nomeContratante;
            newContratante.cdTipoNomeContratante = contratanteOperacao.cdTipoNomeContratante;

            listContratantes.push(newContratante);
            newContratante = {};

            const verifica = JSON.parse(localStorage.getItem("contratante_db"));
            const nlc = !isEligible(verifica.length) ? listContratantes : verifica.concat(listContratantes);
            localStorage.setItem("contratante_db", JSON.stringify(nlc));

        }

    }


    const limparOS = () => {

        setEnderecoNomes([]);

        carregarNomes();

    };

    return (
        <AppMenu>
            <CadastroOrdemdeServico

                ordemdeservico={ordemDeServicoEmEdicao}

                contratantenomes={contratanteNomes}
                endereco={enderecoNomes}

                salvar={salvarOrdemdeServico}
                limpar={limparOS}

            />
        </AppMenu>
    );
};

export default OrdemdeServicoCad;
