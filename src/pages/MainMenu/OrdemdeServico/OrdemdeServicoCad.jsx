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
    //busca usuário sistema
    const userStorage = JSON.parse(localStorage.getItem("user_storage"));

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


        //lançamento all
        var getIdLancamentoAll = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        var getIdCdLancamento = !isEligible(getIdLancamentoAll) || !isEligible(getIdLancamentoAll.length) ? 1 : getIdLancamentoAll[getIdLancamentoAll.length - 1].cdLancamentoContabil + 1;
        getIdLancamentoAll = !isEligible(getIdLancamentoAll.length) ? 1 : getIdLancamentoAll.length + 1;


        os.id = getId;
        os.cdOrdemdeServico = getId;
        os.cdContratante = cdContratanteSave;
        os.isValido = true;
        os.status = 'VALIDO';
        os.dataAdd = getCurrentDate();
        os.usuarioAdd = userStorage.id;
        os.cdLancamentoContabil = getIdCdLancamento;

        const newOS = getId === null ? [os] : [...JSON.parse(localStorage.getItem("ordemdeservico_db")), os];
        localStorage.setItem("ordemdeservico_db", JSON.stringify(newOS));

        insertLancamentoContabilGeral(os, getIdLancamentoAll, getIdCdLancamento);

    };


    const insertLancamentoContabilGeral = (os, getId, getIdCdLancamento) => {

        let lancamento = {};
        let listaOs = [];

        //lançamento ordem de serviço
        lancamento.id = getId;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 1;
        lancamento.descLancamento = "Geração de Ordem de Serviço Número - " + os.cdOrdemdeServico;
        lancamento.cdCentrodeCusto = 454; //verificar cd centro de custo fixo nome 'Ordem de Serviço'
        lancamento.descCentrodeCusto = "Ordem de Serviço;" //verificar centro de custo fixo nome 'Ordem de Serviço'
        lancamento.cdConta = 102 // //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.descConta = 'Receita Operacional'; //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.valorCredito = os.valorServico;
        lancamento.valorDebito = 0;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        listaOs.push(lancamento);

        lancamento = {};

        //lançamento endereço
        lancamento.id = getId + 1;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 2;
        lancamento.descLancamento = "Geração de Ordem de Serviço Número - " + os.cdOrdemdeServico;
        lancamento.cdConta = 284 // //buscar cdconta fixada da conta 'Clientes'
        lancamento.descConta = 'Clientes'; //buscar cdconta fixada da conta 'Clientes'
        lancamento.cdContaComplementar = os.cdEndereco;
        lancamento.descContaComplementar = os.enderecoCompleto;
        lancamento.valorCredito = 0;
        lancamento.valorDebito = os.valorServico;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        listaOs.push(lancamento);


        const verifica = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        const nlc = !isEligible(verifica.length) ? listaOs : verifica.concat(listaOs);
        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(nlc));
    }

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
