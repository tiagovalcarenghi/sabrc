import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroOrdemdeServico from "../../../components/MainMenu/OrdemdeServico/CadastroOrdemdeServico";
import { initialContratanteOperacao } from "../../../util/MainMenu/OS/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const OrdemdeServicoCad = () => {
    const [contratantesEmEdicao, setContratantesEmEdicao] = useState(initialContratanteOperacao);
    const [contratanteNomes, setContratanteNomes] = useState([]);
    const [enderecoNomes, setEnderecoNomes] = useState([]);
    const location = useLocation();
    let cdContratanteSave = null;

    useEffect(() => {

        if (!location.state.id) {
            limparOS();
            carregarNomes();
            return;
        }

    }, [location.state.id]);

    const carregarNomes = async () => {

        const nomesStorage = JSON.parse(localStorage.getItem("nomes_db"));

        const selectComp = nomesStorage?.filter((cc) => cc.cdTipoNome === 1 || cc.cdTipoNome === 2);
        setContratanteNomes(selectComp);

        const selctAdress = nomesStorage?.filter((cc) => cc.cdTipoNome === 3);
        setEnderecoNomes(selctAdress);

    }

    const run = (value = []) => ({ type: run, value: value });


    const addContratante = (contratante) => {

        var newDataCeP = initialContratanteOperacao;

        var getId = JSON.parse(localStorage.getItem("contratanteoperacao_db"));

        newDataCeP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataCeP.cdNomeContratante = contratante.cdNomes;
        newDataCeP.nomeContratante = contratante.nome;
        newDataCeP.cdTipoNomeContratante = contratante.cdTipoNome;

        const newContratante = !isEligible(getId) || !isEligible(getId.length) ? [newDataCeP] : [...JSON.parse(localStorage.getItem("contratanteoperacao_db")), newDataCeP];
        localStorage.setItem("contratanteoperacao_db", JSON.stringify(newContratante));
        carregarContratantesOperacao();
    };

    const deleteContratante = (data) => {

        let items = JSON.parse(localStorage.getItem("contratanteoperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("contratanteoperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("contratanteoperacao_db");
        }
        carregarContratantesOperacao();
    };

    const carregarContratantesOperacao = async () => {
        const contratantesop = JSON.parse(localStorage.getItem("contratanteoperacao_db"));
        setContratantesEmEdicao(contratantesop);
    };


    const salvarOrdemdeServico = (os) => {

        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        var getId = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        getId = !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;


        const contratanteOperacao = JSON.parse(localStorage.getItem("contratante_db"));
        if (contratanteOperacao) {
            saveContratantes(getId, contratanteOperacao, null);
        }


        os.id = getId;
        os.cdOrdemdeServico = getId;
        os.cdContratante = cdContratanteSave;



        os.isValido = true;
        os.status = 'VALIDO';
        os.dataAdd = getCurrentDate();
        os.usuarioAdd = userStorage.id;

        const newOS = getId === null ? [os] : [...JSON.parse(localStorage.getItem("ordemdeservico_db")), os];
        localStorage.setItem("ordemdeservico_db", JSON.stringify(newOS));

        //insertLancamentoContabil

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

            contratanteOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newContratante.id = getId;
                newContratante.cdOrdemdeServico = cdOS;
                newContratante.cdContratante = cdContratanteSave;
                newContratante.cdNomeContratante = item.cdNomeContratante;
                newContratante.nomeContratante = item.nomeContratante;
                newContratante.cdTipoNomeContratante = item.cdTipoNomeContratante;

                listContratantes.push(newContratante);
                newContratante = {};

            });

            const verifica = JSON.parse(localStorage.getItem("contratante_db"));
            const nlc = !isEligible(verifica.length) ? listContratantes : verifica.concat(listContratantes);
            localStorage.setItem("contratante_db", JSON.stringify(nlc));

        }

    }


    const limparOS = () => {

        setContratantesEmEdicao(initialContratanteOperacao);
        localStorage.setItem("contratanteoperacao_db", JSON.stringify([]));

        setContratanteNomes([]);
        setEnderecoNomes([]);

        carregarNomes();

    };

    return (
        <AppMenu>
            <CadastroOrdemdeServico

                contratantes={contratantesEmEdicao}
                addcontratante={addContratante}
                deletecontratante={deleteContratante}

                contratantenomes={contratanteNomes}
                endereco={enderecoNomes}

                salvar={salvarOrdemdeServico}
                limpar={limparOS}

            />
        </AppMenu>
    );
};

export default OrdemdeServicoCad;
