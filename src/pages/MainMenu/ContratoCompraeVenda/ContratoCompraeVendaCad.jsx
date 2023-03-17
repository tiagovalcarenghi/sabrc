import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/CadastroContratoCompraeVenda";
import { initialCompradorProcuradorOperacao, initialContratosdeCompraeVendaBase, initialHonorariosCorretorParceiroOperacoes, initialVendedorProcuradorOperacao } from "../../../util/MainMenu/ContratoCompraeVenda/constants";
import { initialValuesMinutasPadraoCeV } from "../../../util/MainMenu/MinutasPadrao/ContratoCompraeVenda/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoCompraeVendaCad = () => {
    const [contratoCompraeVendaEmEdicao, setContratoCompraeVendaEmEdicao] = useState(initialContratosdeCompraeVendaBase);
    const [compradorProcuradorEmEdicao, setCompradorProcuradorEmEdicao] = useState(initialCompradorProcuradorOperacao);
    const [vendedorProcuradorEmEdicao, setVendedorProcuradorEmEdicao] = useState(initialVendedorProcuradorOperacao);
    const [honorariosCorretorParceiroEmEdicao, setHonorariosCorretorParceiroEmEdicao] = useState(initialHonorariosCorretorParceiroOperacoes);
    const [compradorVendedorNomes, setCompradorVendedorNomes] = useState([]);
    const [pessoaFisica, setPessoaFisica] = useState([]);
    const [enderecoNomes, setEnderecoNomes] = useState([]);
    const location = useLocation();
    let cdCompradorProcuradorSave = null;
    let cdCVendedorProcuradorSave = null;
    let cdHonorariosSave = null;
    let totalHonorariosSave = 0;
    let valorTextoMinuta = '';

    useEffect(() => {


        if (!location.state.id) {
            limparContratoCompraeVenda();
            carregarNomes();
            return;
        }
        carregarContratoCompraeVenda(location.state.id);
    }, [location.state.id]);

    const carregarContratoCompraeVenda = async (id) => {

        limparContratoCompraeVenda();

        const contratoStorage = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        const selectContrato = contratoStorage?.filter((cc) => cc.id === id);
        setContratoCompraeVendaEmEdicao(selectContrato[0]);

        if (selectContrato[0].cdCompradorProcurador) {
            carregarCompradoreseProcuradores(selectContrato[0]);
        }

        if (selectContrato[0].cdVendedorProcurador) {
            carregarVendedoreseProcuradores(selectContrato[0]);
        }

        if (selectContrato[0].cdHonorariosCorretorParceiro) {
            carregarHonorariosCorretoresParceiros(selectContrato[0]);
        }

        carregarNomes();
    };



    const carregarNomes = async () => {

        const nomesStorage = JSON.parse(localStorage.getItem("nomes_db"));

        const selectComp = nomesStorage?.filter((cc) => cc.cdTipoNome === 1 || cc.cdTipoNome === 2);
        setCompradorVendedorNomes(selectComp);

        const sectPf = nomesStorage?.filter((cc) => cc.cdTipoNome === 1);
        setPessoaFisica(sectPf);

        const selctAdress = nomesStorage?.filter((cc) => cc.cdTipoNome === 3);
        setEnderecoNomes(selctAdress);

    }

    const run = (value = []) => ({ type: run, value: value });


    const carregarCompradoreseProcuradores = async (selectContrato) => {
        const compradoreProcuradorStorage = JSON.parse(localStorage.getItem("compradorprocurador_db"));
        const selectCompradoreseProcuradores = compradoreProcuradorStorage?.filter((cc) => cc.cdContratoCompraeVenda === selectContrato.cdContratoCompraeVenda);

        let compradoresOperacao = {};
        let listaCompradoresOperacao = [];

        console.log(selectContrato.cdContratoCompraeVenda);
        console.log(selectCompradoreseProcuradores.length);

        if (isEligible(selectCompradoreseProcuradores.length)) {

            selectCompradoreseProcuradores.map((item) => {

                compradoresOperacao.id = item.id;;
                compradoresOperacao.cdNomeComprador = item.cdNomeComprador;
                compradoresOperacao.nomeComprador = item.nomeComprador;
                compradoresOperacao.cdTipoNomeComprador = item.cdTipoNomeComprador;
                compradoresOperacao.cdNomeProcurador = item.cdNomeProcurador;
                compradoresOperacao.nomeProcurador = item.nomeProcurador;
                compradoresOperacao.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listaCompradoresOperacao.push(compradoresOperacao);
                compradoresOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaCompradoresOperacao : verifica.concat(listaCompradoresOperacao);
            localStorage.setItem("compradorprocuradoroperacao_db", JSON.stringify(nlc));

            setCompradorProcuradorEmEdicao(nlc);
        };

    }

    const carregarVendedoreseProcuradores = async (selectContrato) => {

        const vendedoreProcuradorStorage = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
        const selectVendedoreseProcuradores = vendedoreProcuradorStorage?.filter((cc) => cc.cdContratoCompraeVenda === selectContrato.cdContratoCompraeVenda);

        let vendedoresOperacao = {};
        let listaVendedoresOperacao = [];


        if (isEligible(selectVendedoreseProcuradores.length)) {

            selectVendedoreseProcuradores.map((item) => {

                vendedoresOperacao.id = item.id;;
                vendedoresOperacao.cdNomeVendedor = item.cdNomeVendedor;
                vendedoresOperacao.nomeVendedor = item.nomeVendedor;
                vendedoresOperacao.cdTipoNomeVendedor = item.cdTipoNomeVendedor;
                vendedoresOperacao.cdNomeProcurador = item.cdNomeProcurador;
                vendedoresOperacao.nomeProcurador = item.nomeProcurador;
                vendedoresOperacao.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listaVendedoresOperacao.push(vendedoresOperacao);
                vendedoresOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaVendedoresOperacao : verifica.concat(listaVendedoresOperacao);
            localStorage.setItem("vendedorprocuradoroperacao_db", JSON.stringify(nlc));

            setVendedorProcuradorEmEdicao(nlc);
        };
    };

    const carregarHonorariosCorretoresParceiros = async (selectContrato) => {

        const honorariosStorage = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
        const selectHonorarios = honorariosStorage?.filter((cc) => cc.cdContratoCompraeVenda === selectContrato.cdContratoCompraeVenda);

        let honorariosOperacao = {};
        let listaHonorariosOperacao = [];


        if (isEligible(selectHonorarios.length)) {

            selectHonorarios.map((item) => {

                honorariosOperacao.id = item.id;;
                honorariosOperacao.cdPessoaFisica = item.cdPessoaFisica;
                honorariosOperacao.nomeCompleto = item.nomeCompleto;
                honorariosOperacao.valorHonorario = item.valorHonorario;

                listaHonorariosOperacao.push(honorariosOperacao);
                honorariosOperacao = {};

            });

            const verifica = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));
            const nlc = !isEligible(verifica.length) ? listaHonorariosOperacao : verifica.concat(listaHonorariosOperacao);
            localStorage.setItem("honorarioscorretorparceirooperacao_db", JSON.stringify(nlc));

            setHonorariosCorretorParceiroEmEdicao(nlc);
        };
    };


    const addCompradoreProcurador = (comprador, procurador) => {

        var newDataCeP = initialCompradorProcuradorOperacao;

        var getId = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));

        newDataCeP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataCeP.cdNomeComprador = comprador.cdNomes;
        newDataCeP.nomeComprador = comprador.nome;
        newDataCeP.cdTipoNomeComprador = comprador.cdTipoNome;
        newDataCeP.cdNomeProcurador = procurador.cdNomes;
        newDataCeP.nomeProcurador = procurador.nome;
        newDataCeP.cdTipoNomeProcurador = procurador.cdTipoNome;

        const newCompradorProcurador = !isEligible(getId) || !isEligible(getId.length) ? [newDataCeP] : [...JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db")), newDataCeP];
        localStorage.setItem("compradorprocuradoroperacao_db", JSON.stringify(newCompradorProcurador));
        carregarCompradoreseProcuradoresOperacao();
    };

    const deleteCompradoreProcurador = (data) => {

        let items = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("compradorprocuradoroperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("compradorprocuradoroperacao_db");
        }
        carregarCompradoreseProcuradoresOperacao();
    };

    const carregarCompradoreseProcuradoresOperacao = async () => {
        const cepStorage = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));
        setCompradorProcuradorEmEdicao(cepStorage);
    };


    const addVendedoreProcurador = (vendedor, procurador) => {

        var newDataVeP = initialVendedorProcuradorOperacao;

        var getId = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));

        newDataVeP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataVeP.cdNomeVendedor = vendedor.cdNomes;
        newDataVeP.nomeVendedor = vendedor.nome;
        newDataVeP.cdTipoNomeVendedor = vendedor.cdTipoNome;
        newDataVeP.cdNomeProcurador = procurador.cdNomes;
        newDataVeP.nomeProcurador = procurador.nome;
        newDataVeP.cdTipoNomeProcurador = procurador.cdTipoNome;

        const newVendedorProcurador = !isEligible(getId) || !isEligible(getId.length) ? [newDataVeP] : [...JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db")), newDataVeP];
        localStorage.setItem("vendedorprocuradoroperacao_db", JSON.stringify(newVendedorProcurador));
        carregarVendedoreProcuradoresOperacao();

    };

    const deleteVendedoreProcurador = (data) => {

        let items = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("vendedorprocuradoroperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("vendedorprocuradoroperacao_db");
        }
        carregarVendedoreProcuradoresOperacao();
    };

    const carregarVendedoreProcuradoresOperacao = async () => {
        const vepStorage = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));
        setVendedorProcuradorEmEdicao(vepStorage);
    };


    const addHonorarios = (corretor, honorario) => {

        var newDataCP = initialHonorariosCorretorParceiroOperacoes;

        var getId = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));

        newDataCP.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        newDataCP.cdPessoaFisica = corretor.cdNomes;
        newDataCP.nomeCompleto = corretor.nome;
        newDataCP.valorHonorario = honorario;


        const newCorretorParceiro = !isEligible(getId) || !isEligible(getId.length) ? [newDataCP] : [...JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db")), newDataCP];
        localStorage.setItem("honorarioscorretorparceirooperacao_db", JSON.stringify(newCorretorParceiro));
        carregarCorretorParceiroOperacao();


    };

    const deleteHonorarios = (data) => {

        let items = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("honorarioscorretorparceirooperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("honorarioscorretorparceirooperacao_db");
        }
        carregarCorretorParceiroOperacao();
    };


    const carregarCorretorParceiroOperacao = async () => {
        const cpStorage = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));
        setHonorariosCorretorParceiroEmEdicao(cpStorage);
    };

    const limpaBaseProcuradores = (items) => {

        localStorage.setItem("compradorprocurador_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("compradorprocurador_db");
        }

    }

    const limpaBaseVendedores = (items) => {

        localStorage.setItem("vendedorprocurador_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("vendedorprocurador_db");
        }

    }

    const limpaBaseHonorarios = (items) => {

        localStorage.setItem("honorarioscorretorparceiro_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("honorarioscorretorparceiro_db");
        }
    }


    const carregaMinutaPadrao = async () => {

        const minutasPadraoContratoCeVStorage = JSON.parse(localStorage.getItem("minutaspadraocev_db"));

        if (minutasPadraoContratoCeVStorage) {
            const selectComp = minutasPadraoContratoCeVStorage.reduce((max, game) => max.id > game.id ? max : game);
            valorTextoMinuta = selectComp.texto;
        }
    };


    const salvarContratoCompraeVenda = (ccv) => {

        if (isEligible(ccv.id)) {

            //save compradores
            let compradorOperacao = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));

            let items = JSON.parse(localStorage.getItem("compradorprocurador_db"));
            items = items.filter((item) => item.cdCompradorProcurador !== ccv.cdCompradorProcurador);

            limpaBaseProcuradores(items);

            saveCompradores(ccv.cdContratoCompraeVenda, compradorOperacao, ccv.cdCompradorProcurador);
            ccv.cdCompradorProcurador = cdCompradorProcuradorSave;

            //save vendedores
            let vendedorOperacao = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));

            let itemsv = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
            itemsv = itemsv.filter((item) => item.cdVendedorProcurador !== ccv.cdVendedorProcurador);

            limpaBaseVendedores(itemsv);

            saveVendedores(ccv.cdContratoCompraeVenda, vendedorOperacao, ccv.cdVendedorProcurador);
            ccv.cdVendedorProcurador = cdCVendedorProcuradorSave;

            //save honorarios    
            let honorarioOperacao = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));

            let itemsh = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
            itemsh = itemsh.filter((item) => item.cdHonorariosCorretorParceiro !== ccv.cdHonorariosCorretorParceiro);

            limpaBaseHonorarios(itemsh);

            saveHonorarios(ccv.cdContratoCompraeVenda, honorarioOperacao, ccv.cdHonorariosCorretorParceiro);
            ccv.cdHonorariosCorretorParceiro = cdHonorariosSave;


            //updateMinuta
            if (ccv.tipoMinuta === 'padrao') {
                carregaMinutaPadrao();
                ccv.textoMinuta = valorTextoMinuta;
            }



            var updateContrato = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
            updateContrato[updateContrato.findIndex((x) => x.id === ccv.id)] = ccv;
            localStorage.setItem("contratocompraevendabase_db", JSON.stringify(updateContrato));
            return;
        }

        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        var getId = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        getId = !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;


        const compradorOperacao = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));
        if (compradorOperacao) {
            saveCompradores(getId, compradorOperacao, null);
        }

        const vendedorOperacao = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));
        if (vendedorOperacao) {
            saveVendedores(getId, vendedorOperacao, null);
        }

        const corretorParceiroOperacao = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));
        if (corretorParceiroOperacao) {
            saveHonorarios(getId, corretorParceiroOperacao, null);
        }


        //updateMinuta
        if (ccv.tipoMinuta === 'padrao') {
            carregaMinutaPadrao();
            ccv.textoMinuta = valorTextoMinuta;
        }


        ccv.id = getId;
        ccv.cdContratoCompraeVenda = getId;
        ccv.cdCompradorProcurador = cdCompradorProcuradorSave;
        ccv.descCompradorProcurador = 'nomes compradores';
        ccv.cdVendedorProcurador = cdCVendedorProcuradorSave;
        ccv.descVendedorProcurador = 'nomes vendedor';
        ccv.cdHonorariosCorretorParceiro = cdHonorariosSave;
        ccv.descCorretoresParceiros = 'nomes corretores parceiros';
        ccv.totalHonorarios = totalHonorariosSave + Number(ccv.honorarioImobiliaria);
        ccv.isValido = true;
        ccv.status = 'RASCUNHO';
        ccv.dataAdd = getCurrentDate();
        ccv.usuarioAdd = userStorage.id;

        const newCCVS = getId === null ? [ccv] : [...JSON.parse(localStorage.getItem("contratocompraevendabase_db")), ccv];
        localStorage.setItem("contratocompraevendabase_db", JSON.stringify(newCCVS));

    };

    const saveCompradores = (cdContrato, compradorOperacao, cdCompradorVendedor) => {

        var newComprador = {};
        const listCompradores = [];


        if (!isEligible(JSON.parse(localStorage.getItem("compradorprocurador_db")))) {
            localStorage.setItem("compradorprocurador_db", JSON.stringify([]));
        }
        const compradorDb = JSON.parse(localStorage.getItem("compradorprocurador_db"));
        var getCd = !isEligible(compradorDb.length) ? 1 : compradorDb.length + 1;
        var getId = compradorDb.length;

        cdCompradorProcuradorSave = cdCompradorVendedor === null ? getCd : cdCompradorVendedor;


        if (isEligible(compradorOperacao)) {

            compradorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newComprador.id = getId;
                newComprador.cdContratoCompraeVenda = cdContrato;
                newComprador.cdCompradorProcurador = cdCompradorProcuradorSave;
                newComprador.cdNomeComprador = item.cdNomeComprador;
                newComprador.nomeComprador = item.nomeComprador;
                newComprador.cdTipoNomeComprador = item.cdTipoNomeComprador;
                newComprador.cdNomeProcurador = item.cdNomeProcurador;
                newComprador.nomeProcurador = item.nomeProcurador;
                newComprador.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listCompradores.push(newComprador);
                newComprador = {};

            });

            const verifica = JSON.parse(localStorage.getItem("compradorprocurador_db"));
            const nlc = !isEligible(verifica.length) ? listCompradores : verifica.concat(listCompradores);
            localStorage.setItem("compradorprocurador_db", JSON.stringify(nlc));

        }

    }


    const saveVendedores = (cdContrato, vendedorOperacao, cdCompradorVendedor) => {

        var newVendedor = {};
        const listVendedores = [];


        if (!isEligible(JSON.parse(localStorage.getItem("vendedorprocurador_db")))) {
            localStorage.setItem("vendedorprocurador_db", JSON.stringify([]));
        }
        const vendedorDb = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
        var getCd = !isEligible(vendedorDb.length) ? 1 : vendedorDb.length + 1;
        var getId = vendedorDb.length;

        cdCVendedorProcuradorSave = cdCompradorVendedor === null ? getCd : cdCompradorVendedor;


        if (isEligible(vendedorOperacao)) {

            vendedorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newVendedor.id = getId;
                newVendedor.cdContratoCompraeVenda = cdContrato;
                newVendedor.cdVendedorProcurador = cdCVendedorProcuradorSave;
                newVendedor.cdNomeVendedor = item.cdNomeVendedor;
                newVendedor.nomeVendedor = item.nomeVendedor;
                newVendedor.cdTipoNomeVendedor = item.cdTipoNomeVendedor;
                newVendedor.cdNomeProcurador = item.cdNomeProcurador;
                newVendedor.nomeProcurador = item.nomeProcurador;
                newVendedor.cdTipoNomeProcurador = item.cdTipoNomeProcurador;

                listVendedores.push(newVendedor);
                newVendedor = {};

            });

            const verifica = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
            const nlc = !isEligible(verifica.length) ? listVendedores : verifica.concat(listVendedores);
            localStorage.setItem("vendedorprocurador_db", JSON.stringify(nlc));

        }

    }

    const saveHonorarios = (cdContrato, corretorParceiroOperacao, cdHonorariosCorretorParceiro) => {

        var newCorretorParceiro = {};
        const listCorretoresParceiros = [];


        if (!isEligible(JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db")))) {
            localStorage.setItem("honorarioscorretorparceiro_db", JSON.stringify([]));
        }
        const honorariosDb = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
        var getCd = !isEligible(honorariosDb.length) ? 1 : honorariosDb.length + 1;
        var getId = honorariosDb.length;

        cdHonorariosSave = cdHonorariosCorretorParceiro === null ? getCd : cdHonorariosCorretorParceiro;


        if (isEligible(corretorParceiroOperacao)) {

            corretorParceiroOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newCorretorParceiro.id = getId;
                newCorretorParceiro.cdContratoCompraeVenda = cdContrato;
                newCorretorParceiro.cdHonorariosCorretorParceiro = cdHonorariosSave;
                newCorretorParceiro.cdPessoaFisica = item.cdPessoaFisica;
                newCorretorParceiro.nomeCompleto = item.nomeCompleto;
                newCorretorParceiro.valorHonorario = item.valorHonorario;

                totalHonorariosSave = totalHonorariosSave + Number(item.valorHonorario);

                listCorretoresParceiros.push(newCorretorParceiro);
                newCorretorParceiro = {};


            });

            const verifica = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
            const nlc = !isEligible(verifica.length) ? listCorretoresParceiros : verifica.concat(listCorretoresParceiros);
            localStorage.setItem("honorarioscorretorparceiro_db", JSON.stringify(nlc));

        }

    }


    const limparContratoCompraeVenda = () => {
        setContratoCompraeVendaEmEdicao(initialContratosdeCompraeVendaBase);

        setCompradorProcuradorEmEdicao(initialCompradorProcuradorOperacao);
        localStorage.setItem("compradorprocuradoroperacao_db", JSON.stringify([]));

        setVendedorProcuradorEmEdicao(initialVendedorProcuradorOperacao);
        localStorage.setItem("vendedorprocuradoroperacao_db", JSON.stringify([]));

        setHonorariosCorretorParceiroEmEdicao(initialHonorariosCorretorParceiroOperacoes);
        localStorage.setItem("honorarioscorretorparceirooperacao_db", JSON.stringify([]));

        setCompradorVendedorNomes([]);
        setPessoaFisica([]);
        setEnderecoNomes([]);

        carregarNomes();

    };

    return (
        <AppMenu>
            <CadastroContratoCompraeVenda
                contratocompraevendacad={contratoCompraeVendaEmEdicao}

                compradoreprocurador={compradorProcuradorEmEdicao}
                addcompradoreprocurador={addCompradoreProcurador}
                deletecompradoreprocurador={deleteCompradoreProcurador}

                vendedoreprocurador={vendedorProcuradorEmEdicao}
                addvendedoreprocurador={addVendedoreProcurador}
                deletevendedoreprocurador={deleteVendedoreProcurador}

                honorarioscorretorparceiro={honorariosCorretorParceiroEmEdicao}
                addhonorarios={addHonorarios}
                deletehonorarios={deleteHonorarios}

                compradorvendedornomes={compradorVendedorNomes}
                procuradornomes={pessoaFisica}
                endereco={enderecoNomes}

                salvar={salvarContratoCompraeVenda}
                limpar={limparContratoCompraeVenda}

            />
        </AppMenu>
    );
};

export default ContratoCompraeVendaCad;
