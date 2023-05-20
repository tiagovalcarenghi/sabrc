import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContratoLocacao from "../../../components/MainMenu/ContratoLocacao/CadastroContratoLocacao";
import { initialContratosdeLocacaoBase, initialLocadorProcuradorOperacao, initialLocatarioProcuradorOperacao, initialTaxaIntermediacaoCorretoresOperacoes } from "../../../util/MainMenu/ContratoLocacao/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoLocacaoCad = () => {
    const [contratoLocacaoEmEdicao, setContratoLocacaoEmEdicao] = useState(initialContratosdeLocacaoBase);
    const [locadorProcuradorEmEdicao, setLocadorProcuradorEmEdicao] = useState(initialLocadorProcuradorOperacao);
    const [locatarioProcuradorEmEdicao, setLocatarioProcuradorEmEdicao] = useState(initialLocatarioProcuradorOperacao);
    const [taxaIntermediacaoCorretoresEmEdicao, setTaxaIntermediacaoCorretoresEmEdicao] = useState(initialTaxaIntermediacaoCorretoresOperacoes);
    const [locadorLocatarioNomes, setLocadorLocatarioNomes] = useState([]);
    const [corretorNomes, setCorretorNomes] = useState([]);
    const [pessoaFisica, setPessoaFisica] = useState([]);
    const [enderecoDb, setEnderecoDb] = useState([]);
    const location = useLocation();
    let cdLocadorProcuradorSave = null;
    let cdLocatarioProcuradorSave = null;
    let cdTaxaIntermediacaoCorretoresSave = null;
    let valorTextoMinuta = '';

    useEffect(() => {

        carregarEndereco();

        if (!location.state.id) {
            limparContratoLocacao();
            carregarNomes();
            return;
        }
        carregarContratoCompraeVenda(location.state.id);
    }, [location.state.id]);

    const carregarEndereco = async () => {
        setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
    }


    const carregarContratoCompraeVenda = async (id) => {

        limparContratoLocacao();

        const contratoStorage = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        const selectContrato = contratoStorage?.filter((cc) => cc.id === id);
        setContratoLocacaoEmEdicao(selectContrato[0]);

        if (selectContrato[0].cdLocadores) {
            carregarLocadoreseProcuradores(selectContrato[0]);
        }

        if (selectContrato[0].cdLocatarios) {
            carregarLocatarioseProcuradores(selectContrato[0]);
        }

        if (selectContrato[0].cdTaxaIntermediacaoCorretores) {
            carregarTaxaIntermediacaoCorretores(selectContrato[0]);
        }

        carregarNomes();
    };



    const carregarNomes = async () => {

        const nomesStorage = JSON.parse(localStorage.getItem("nomes_db"));

        const selectComp = nomesStorage?.filter((cc) => cc.cdTipoNome === 1 || cc.cdTipoNome === 2);
        setLocadorLocatarioNomes(selectComp);

        const selectCorretores = nomesStorage?.filter((cc) => cc.isAgenteDeNegocio === true);
        setCorretorNomes(selectCorretores);

        const sectPf = nomesStorage?.filter((cc) => cc.cdTipoNome === 1);
        setPessoaFisica(sectPf);


    }

    const run = (value = []) => ({ type: run, value: value });


    const carregarLocadoreseProcuradores = async (selectContrato) => {
        const locadoreProcuradorStorage = JSON.parse(localStorage.getItem("locadorprocurador_db"));
        const selectLocadoreseProcuradores = locadoreProcuradorStorage?.filter((cc) => cc.cdContratoLocacao === selectContrato.cdContratoLocacao);

        let locadoresOperacao = {};
        let listaLocadoresOperacao = [];

        console.log(selectContrato.cdContratoLocacao);
        console.log(selectLocadoreseProcuradores.length);

        if (isEligible(selectLocadoreseProcuradores.length)) {

            selectLocadoreseProcuradores.map((item) => {

                locadoresOperacao.id = item.id;;
                locadoresOperacao.cdNomeLocador = item.cdNomeLocador;
                locadoresOperacao.nomeLocador = item.nomeLocador;
                locadoresOperacao.cdTipoNomeLocador = item.cdTipoNomeLocador;
                locadoresOperacao.cdNomeProcurador = item.cdNomeProcurador;
                locadoresOperacao.nomeProcurador = item.nomeProcurador;
                locadoresOperacao.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listaLocadoresOperacao.push(locadoresOperacao);
                locadoresOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaLocadoresOperacao : verifica.concat(listaLocadoresOperacao);
            localStorage.setItem("locadorprocuradoroperacao_db", JSON.stringify(nlc));

            setLocadorProcuradorEmEdicao(nlc);
        };

    }

    const carregarLocatarioseProcuradores = async (selectContrato) => {

        const locatarioeProcuradorStorage = JSON.parse(localStorage.getItem("locatarioprocurador_db"));
        const selectLocatarioseProcuradores = locatarioeProcuradorStorage?.filter((cc) => cc.cdContratoLocacao === selectContrato.cdContratoLocacao);

        let locatariosOperacao = {};
        let listaLocatariosOperacao = [];


        if (isEligible(selectLocatarioseProcuradores.length)) {

            selectLocatarioseProcuradores.map((item) => {

                locatariosOperacao.id = item.id;;
                locatariosOperacao.cdNomeLocatario = item.cdNomeLocatario;
                locatariosOperacao.nomeLocatario = item.nomeLocatario;
                locatariosOperacao.cdTipoNomeLocatario = item.cdTipoNomeLocatario;
                locatariosOperacao.cdNomeProcurador = item.cdNomeProcurador;
                locatariosOperacao.nomeProcurador = item.nomeProcurador;
                locatariosOperacao.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listaLocatariosOperacao.push(locatariosOperacao);
                locatariosOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaLocatariosOperacao : verifica.concat(listaLocatariosOperacao);
            localStorage.setItem("locatarioprocuradoroperacao_db", JSON.stringify(nlc));

            setLocatarioProcuradorEmEdicao(nlc);
        };
    };

    const carregarTaxaIntermediacaoCorretores = async (selectContrato) => {

        const taxaIntermediacaoStorage = JSON.parse(localStorage.getItem("taxaintermediacao_db"));
        const selectTaxaIntermediacaoCorretores = taxaIntermediacaoStorage?.filter((cc) => cc.cdContratoLocacao === selectContrato.cdContratoLocacao);

        let taxaIntermediacaoCorretoresOperacao = {};
        let listaTaxaIntermediacaoCorretoresOperacao = [];


        if (isEligible(selectTaxaIntermediacaoCorretores.length)) {

            selectTaxaIntermediacaoCorretores.map((item) => {

                taxaIntermediacaoCorretoresOperacao.id = item.id;;
                taxaIntermediacaoCorretoresOperacao.cdPessoaFisica = item.cdPessoaFisica;
                taxaIntermediacaoCorretoresOperacao.nomeCompleto = item.nomeCompleto;
                taxaIntermediacaoCorretoresOperacao.valorTaxaIntermediacao = item.valorTaxaIntermediacao;

                listaTaxaIntermediacaoCorretoresOperacao.push(taxaIntermediacaoCorretoresOperacao);
                taxaIntermediacaoCorretoresOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaTaxaIntermediacaoCorretoresOperacao : verifica.concat(listaTaxaIntermediacaoCorretoresOperacao);
            localStorage.setItem("taxaintermediacaooperacao_db", JSON.stringify(nlc));

            setTaxaIntermediacaoCorretoresEmEdicao(nlc);
        };
    };


    const addLocadoreProcurador = (locador, procurador) => {

        var newDataCeP = initialLocadorProcuradorOperacao;

        var getId = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));

        newDataCeP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataCeP.cdNomeLocador = locador.cdNomes;
        newDataCeP.nomeLocador = locador.nome;
        newDataCeP.cdTipoNomeLocador = locador.cdTipoNome;
        newDataCeP.cdNomeProcurador = procurador.cdNomes;
        newDataCeP.nomeProcurador = procurador.nome;
        newDataCeP.cdTipoNomeProcurador = procurador.cdTipoNome;

        const newLocadorProcurador = !isEligible(getId) || !isEligible(getId.length) ? [newDataCeP] : [...JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db")), newDataCeP];
        localStorage.setItem("locadorprocuradoroperacao_db", JSON.stringify(newLocadorProcurador));
        carregarLocadoreseProcuradoresOperacao();
    };

    const deleteLocadoreProcurador = (data) => {

        let items = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("locadorprocuradoroperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("locadorprocuradoroperacao_db");
        }
        carregarLocadoreseProcuradoresOperacao();
    };

    const carregarLocadoreseProcuradoresOperacao = async () => {
        const cepStorage = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));
        setLocadorProcuradorEmEdicao(cepStorage);
    };


    const addLocatarioeProcurador = (locatario, procurador) => {

        var newDataVeP = initialLocatarioProcuradorOperacao;

        var getId = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));

        newDataVeP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataVeP.cdNomeLocatario = locatario.cdNomes;
        newDataVeP.nomeLocatario = locatario.nome;
        newDataVeP.cdTipoNomeLocatario = locatario.cdTipoNome;
        newDataVeP.cdNomeProcurador = procurador.cdNomes;
        newDataVeP.nomeProcurador = procurador.nome;
        newDataVeP.cdTipoNomeProcurador = procurador.cdTipoNome;

        const newLocatarioProcurador = !isEligible(getId) || !isEligible(getId.length) ? [newDataVeP] : [...JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db")), newDataVeP];
        localStorage.setItem("locatarioprocuradoroperacao_db", JSON.stringify(newLocatarioProcurador));
        carregarLocatarioeProcuradoresOperacao();

    };

    const deleteLocatarioeProcurador = (data) => {

        let items = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("locatarioprocuradoroperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("locatarioprocuradoroperacao_db");
        }
        carregarLocatarioeProcuradoresOperacao();
    };

    const carregarLocatarioeProcuradoresOperacao = async () => {
        const vepStorage = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));
        setLocatarioProcuradorEmEdicao(vepStorage);
    };


    const addTaxaIntermediacao = (corretor, honorario) => {

        var newDataCP = initialTaxaIntermediacaoCorretoresOperacoes;

        var getId = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));

        newDataCP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataCP.cdPessoaFisica = corretor.cdNomes;
        newDataCP.nomeCompleto = corretor.nome;
        newDataCP.valorTaxaIntermediacao = honorario;


        const newTaxaIntermediacaoCorretor = !isEligible(getId) || !isEligible(getId.length) ? [newDataCP] : [...JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db")), newDataCP];
        localStorage.setItem("taxaintermediacaooperacao_db", JSON.stringify(newTaxaIntermediacaoCorretor));
        carregarTaxaIntermediacaoCorretorOperacao();


    };

    const deleteTaxaIntermediacao = (data) => {

        let items = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("taxaintermediacaooperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("taxaintermediacaooperacao_db");
        }
        carregarTaxaIntermediacaoCorretorOperacao();
    };


    const carregarTaxaIntermediacaoCorretorOperacao = async () => {
        const cpStorage = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));
        setTaxaIntermediacaoCorretoresEmEdicao(cpStorage);
    };

    const limpaBaseLocadores = (items) => {

        localStorage.setItem("locadorprocurador_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("locadorprocurador_db");
        }

    }

    const limpaBaseLocatarios = (items) => {

        localStorage.setItem("locatarioprocurador_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("locatarioprocurador_db");
        }

    }

    const limpaBaseTaxaIntermediacao = (items) => {

        localStorage.setItem("taxaintermediacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("taxaintermediacao_db");
        }
    }


    const carregaMinutaPadrao = async () => {

        const minutasPadraoContratoLStorage = JSON.parse(localStorage.getItem("minutaspadraolocacao_db"));

        if (minutasPadraoContratoLStorage) {
            const selectComp = minutasPadraoContratoLStorage.reduce((max, game) => max.id > game.id ? max : game);
            valorTextoMinuta = selectComp.texto;
        }
    };


    const salvarContratoLocacao = (ccv) => {

        if (isEligible(ccv.id)) {

            //save locadores
            let locadorOperacao = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));

            let items = JSON.parse(localStorage.getItem("locadorprocurador_db"));
            items = items.filter((item) => item.cdLocadores !== ccv.cdLocadores);

            limpaBaseLocadores(items);

            saveLocadores(ccv.cdContratoLocacao, locadorOperacao, ccv.cdLocadores);
            ccv.cdLocadores = cdLocadorProcuradorSave;

            //save locatarios
            let locatarioOperacao = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));

            let itemsv = JSON.parse(localStorage.getItem("locatarioprocurador_db"));
            itemsv = itemsv.filter((item) => item.cdLocatarios !== ccv.cdLocatarios);

            limpaBaseLocatarios(itemsv);

            saveLocatarios(ccv.cdContratoLocacao, locatarioOperacao, ccv.cdLocatarios);
            ccv.cdLocatarios = cdLocatarioProcuradorSave;

            //save taxa intermediacao    
            let taxaIntermediacaoOperacao = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));

            let itemsh = JSON.parse(localStorage.getItem("taxaintermediacao_db"));
            itemsh = itemsh.filter((item) => item.cdTaxaIntermediacaoCorretores !== ccv.cdTaxaIntermediacaoCorretores);

            limpaBaseTaxaIntermediacao(itemsh);

            saveTaxaIntermediacao(ccv.cdContratoLocacao, taxaIntermediacaoOperacao, ccv.cdTaxaIntermediacaoCorretores);
            ccv.cdTaxaIntermediacaoCorretores = cdTaxaIntermediacaoCorretoresSave;


            //updateMinuta
            if (ccv.tipoMinuta === 'padrao') {
                carregaMinutaPadrao();
                ccv.textoMinuta = valorTextoMinuta;
            }



            var updateContrato = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
            updateContrato[updateContrato.findIndex((x) => x.id === ccv.id)] = ccv;
            localStorage.setItem("contratolocacaobase_db", JSON.stringify(updateContrato));
            return;
        }

        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        var getId = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        getId = !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;


        const locadorOperacao = JSON.parse(localStorage.getItem("locadorprocuradoroperacao_db"));
        if (locadorOperacao) {
            saveLocadores(getId, locadorOperacao, null);
        }

        const locatarioOperacao = JSON.parse(localStorage.getItem("locatarioprocuradoroperacao_db"));
        if (locatarioOperacao) {
            saveLocatarios(getId, locatarioOperacao, null);
        }

        const taxaIntermediacaoCorretorOperacao = JSON.parse(localStorage.getItem("taxaintermediacaooperacao_db"));
        if (taxaIntermediacaoCorretorOperacao) {
            saveTaxaIntermediacao(getId, taxaIntermediacaoCorretorOperacao, null);
        }


        //updateMinuta
        if (ccv.tipoMinuta === 'padrao') {
            carregaMinutaPadrao();
            ccv.textoMinuta = valorTextoMinuta;
        }


        ccv.id = getId;
        ccv.cdContratoLocacao = getId;
        ccv.cdLocadores = cdLocadorProcuradorSave;
        ccv.descLocadores = 'nomes locadores';
        ccv.cdLocatarios = cdLocatarioProcuradorSave;
        ccv.descLocatarios = 'nomes locatarios';
        ccv.cdTaxaIntermediacaoCorretores = cdTaxaIntermediacaoCorretoresSave;
        ccv.descCorretoresIntermediacaoCorretores = 'nomes corretores tx intermediacao';
        ccv.isValido = true;
        ccv.status = 'RASCUNHO';
        ccv.dataAdd = getCurrentDate();
        ccv.usuarioAdd = userStorage.id;

        const newCCVS = getId === null ? [ccv] : [...JSON.parse(localStorage.getItem("contratolocacaobase_db")), ccv];
        localStorage.setItem("contratolocacaobase_db", JSON.stringify(newCCVS));

    };

    const saveLocadores = (cdContrato, locadorOperacao, cdLocadorLocatario) => {

        var newLocador = {};
        const listLocadores = [];


        if (!isEligible(JSON.parse(localStorage.getItem("locadorprocurador_db")))) {
            localStorage.setItem("locadorprocurador_db", JSON.stringify([]));
        }
        const locadorDb = JSON.parse(localStorage.getItem("locadorprocurador_db"));
        var getCd = !isEligible(locadorDb.length) ? 1 : locadorDb.length + 1;
        var getId = locadorDb.length;

        cdLocadorProcuradorSave = cdLocadorLocatario === null ? getCd : cdLocadorLocatario;


        if (isEligible(locadorOperacao)) {

            locadorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newLocador.id = getId;
                newLocador.cdContratoLocacao = cdContrato;
                newLocador.cdLocadores = cdLocadorProcuradorSave;
                newLocador.cdNomeLocador = item.cdNomeLocador;
                newLocador.nomeLocador = item.nomeLocador;
                newLocador.cdTipoNomeLocador = item.cdTipoNomeLocador;
                newLocador.cdNomeProcurador = item.cdNomeProcurador;
                newLocador.nomeProcurador = item.nomeProcurador;
                newLocador.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listLocadores.push(newLocador);
                newLocador = {};

            });

            const verifica = JSON.parse(localStorage.getItem("locadorprocurador_db"));
            const nlc = !isEligible(verifica.length) ? listLocadores : verifica.concat(listLocadores);
            localStorage.setItem("locadorprocurador_db", JSON.stringify(nlc));

        }

    }


    const saveLocatarios = (cdContrato, locatarioOperacao, cdLocadorLocatario) => {

        var newLocatario = {};
        const listLocatarios = [];


        if (!isEligible(JSON.parse(localStorage.getItem("locatarioprocurador_db")))) {
            localStorage.setItem("locatarioprocurador_db", JSON.stringify([]));
        }
        const locatarioDb = JSON.parse(localStorage.getItem("locatarioprocurador_db"));
        var getCd = !isEligible(locatarioDb.length) ? 1 : locatarioDb.length + 1;
        var getId = locatarioDb.length;

        cdLocatarioProcuradorSave = cdLocadorLocatario === null ? getCd : cdLocadorLocatario;


        if (isEligible(locatarioOperacao)) {

            locatarioOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newLocatario.id = getId;
                newLocatario.cdContratoLocacao = cdContrato;
                newLocatario.cdLocatarios = cdLocatarioProcuradorSave;
                newLocatario.cdNomeLocatario = item.cdNomeLocatario;
                newLocatario.nomeLocatario = item.nomeLocatario;
                newLocatario.cdTipoNomeLocatario = item.cdTipoNomeLocatario;
                newLocatario.cdNomeProcurador = item.cdNomeProcurador;
                newLocatario.nomeProcurador = item.nomeProcurador;
                newLocatario.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listLocatarios.push(newLocatario);
                newLocatario = {};

            });

            const verifica = JSON.parse(localStorage.getItem("locatarioprocurador_db"));
            const nlc = !isEligible(verifica.length) ? listLocatarios : verifica.concat(listLocatarios);
            localStorage.setItem("locatarioprocurador_db", JSON.stringify(nlc));

        }

    }

    const saveTaxaIntermediacao = (cdContrato, taxaIntermediacaoCorretorOperacao, cdTaxaIntermediacaoCorretores) => {

        var newTaxaIntermediacaoCorretor = {};
        const listTaxaIntermediacaoCorretores = [];


        if (!isEligible(JSON.parse(localStorage.getItem("taxaintermediacao_db")))) {
            localStorage.setItem("taxaintermediacao_db", JSON.stringify([]));
        }
        const taxaIntermediacaoDb = JSON.parse(localStorage.getItem("taxaintermediacao_db"));
        var getCd = !isEligible(taxaIntermediacaoDb.length) ? 1 : taxaIntermediacaoDb.length + 1;
        var getId = taxaIntermediacaoDb.length;

        cdTaxaIntermediacaoCorretoresSave = cdTaxaIntermediacaoCorretores === null ? getCd : cdTaxaIntermediacaoCorretores;


        if (isEligible(taxaIntermediacaoCorretorOperacao)) {

            taxaIntermediacaoCorretorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newTaxaIntermediacaoCorretor.id = getId;
                newTaxaIntermediacaoCorretor.cdContratoLocacao = cdContrato;
                newTaxaIntermediacaoCorretor.cdTaxaIntermediacaoCorretores = cdTaxaIntermediacaoCorretoresSave;
                newTaxaIntermediacaoCorretor.cdPessoaFisica = item.cdPessoaFisica;
                newTaxaIntermediacaoCorretor.nomeCompleto = item.nomeCompleto;
                newTaxaIntermediacaoCorretor.valorTaxaIntermediacao = item.valorTaxaIntermediacao;

                listTaxaIntermediacaoCorretores.push(newTaxaIntermediacaoCorretor);
                newTaxaIntermediacaoCorretor = {};


            });

            const verifica = JSON.parse(localStorage.getItem("taxaintermediacao_db"));
            const nlc = !isEligible(verifica.length) ? listTaxaIntermediacaoCorretores : verifica.concat(listTaxaIntermediacaoCorretores);
            localStorage.setItem("taxaintermediacao_db", JSON.stringify(nlc));

        }

    }


    const limparContratoLocacao = () => {
        setContratoLocacaoEmEdicao(initialContratosdeLocacaoBase);

        setLocadorProcuradorEmEdicao(initialLocadorProcuradorOperacao);
        localStorage.setItem("locadorprocuradoroperacao_db", JSON.stringify([]));

        setLocatarioProcuradorEmEdicao(initialLocatarioProcuradorOperacao);
        localStorage.setItem("locatarioprocuradoroperacao_db", JSON.stringify([]));

        setTaxaIntermediacaoCorretoresEmEdicao(initialTaxaIntermediacaoCorretoresOperacoes);
        localStorage.setItem("taxaintermediacaooperacao_db", JSON.stringify([]));

        setLocadorLocatarioNomes([]);
        setCorretorNomes([]);
        setPessoaFisica([]);

        carregarNomes();

    };

    return (
        <AppMenu>
            <CadastroContratoLocacao
                contratolocacaocad={contratoLocacaoEmEdicao}

                locadoreprocurador={locadorProcuradorEmEdicao}
                addlocadoreprocurador={addLocadoreProcurador}
                deletelocadoreprocurador={deleteLocadoreProcurador}

                locatarioeprocurador={locatarioProcuradorEmEdicao}
                addlocatarioeprocurador={addLocatarioeProcurador}
                deletelocatarioeprocurador={deleteLocatarioeProcurador}

                taxaintermediacaocorretores={taxaIntermediacaoCorretoresEmEdicao}
                addtaxaintermediacao={addTaxaIntermediacao}
                deletetaxaintermediacao={deleteTaxaIntermediacao}

                locadorlocatarionomes={locadorLocatarioNomes}
                corretorenomes={corretorNomes}
                procuradornomes={pessoaFisica}
                enderecodb={enderecoDb}

                salvar={salvarContratoLocacao}
                limpar={limparContratoLocacao}

            />
        </AppMenu>
    );
};

export default ContratoLocacaoCad;
