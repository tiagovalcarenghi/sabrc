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
    // const [minutasPadraoContratoCeVEmEdicao, setminutasPadraoContratoCeVEmEdicao] = useState(initialValuesMinutasPadraoCeV);
    let cdCompradorProcuradorSave = null;
    let cdCVendedorProcuradorSave = null;
    let cdHonorariosSave = null;
    let totalHonorariosSave = 0;

    useEffect(() => {

        carregarNomes();


        if (!location.state) {
            setContratoCompraeVendaEmEdicao(initialContratosdeCompraeVendaBase);
            setCompradorProcuradorEmEdicao(initialCompradorProcuradorOperacao);
            setVendedorProcuradorEmEdicao(initialVendedorProcuradorOperacao);
            setHonorariosCorretorParceiroEmEdicao(initialHonorariosCorretorParceiroOperacoes);
            setCompradorVendedorNomes([]);
            setPessoaFisica([]);
            setEnderecoNomes([]);
            // carregarMinutaPadraoCeV();
            return;
        }
        carregarContratoCompraeVenda(location.state.id);
    }, [location.state]);

    const carregarContratoCompraeVenda = async (id) => {
        const contratoStorage = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        const selectContrato = contratoStorage?.filter((cc) => cc.id === id);
        setContratoCompraeVendaEmEdicao(selectContrato[0]);
        carregarCompradoreseProcuradores(selectContrato[0]);
        carregarVendedoreseProcuradores(selectContrato[0]);
        carregarHonorariosCorretoresParceiros(selectContrato[0]);
        // carregarMinutaEdit(selectContrato[0]);
    };

    // const carregarMinutaEdit = async (s) => {

    //     const editMinuta = initialValuesMinutasPadraoCeV;

    //     if (s) {
    //         editMinuta.id = s.cdMinutaPadraoContratoCeV;
    //         editMinuta.cdMinutaPadraoContratoCeV = s.cdMinutaPadraoContratoCeV;
    //         editMinuta.texto = s.textoMinuta;
    //     }


    //     setminutasPadraoContratoCeVEmEdicao(editMinuta.texto);
    // }


    // const carregarMinutaPadraoCeV = async () => {
    //     const minutasPadraoContratoCeVStorage = JSON.parse(localStorage.getItem("minutaspadraocev_db"));
    //     if (minutasPadraoContratoCeVStorage) {
    //         const selectComp = minutasPadraoContratoCeVStorage.reduce((max, game) => max.id > game.id ? max : game);
    //         setminutasPadraoContratoCeVEmEdicao(selectComp.texto);
    //     } else {
    //         const editMinuta = initialValuesMinutasPadraoCeV;
    //         setminutasPadraoContratoCeVEmEdicao(editMinuta.texto);
    //     }
    // };

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
        setCompradorProcuradorEmEdicao(selectCompradoreseProcuradores);
    };

    const carregarVendedoreseProcuradores = async (selectContrato) => {
        const vendedoreProcuradorStorage = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
        const selectVendedoreseProcuradores = vendedoreProcuradorStorage?.filter((cc) => cc.cdContratoCompraeVenda === selectContrato.cdContratoCompraeVenda);
        setVendedorProcuradorEmEdicao(selectVendedoreseProcuradores);
    };

    const carregarHonorariosCorretoresParceiros = async (selectContrato) => {
        const honorariosStorage = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
        const selectHonorarios = honorariosStorage?.filter((cc) => cc.cdContratoCompraeVenda === selectContrato.cdContratoCompraeVenda);
        setHonorariosCorretorParceiroEmEdicao(selectHonorarios);
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



    const salvarContratoCompraeVenda = (ccv) => {

        alert(isEligible(ccv.id));

        if (isEligible(ccv.id)) {
            updateCompradores(ccv.cdContratoCompraeVenda, ccv.cdCompradorProcurador);
            // updateVendedores();
            // updateHonorarios();
            var updateContrato = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
            updateContrato[updateContrato.findIndex((x) => x.id === ccv.id)] = ccv;
            localStorage.setItem("contratocompraevendabase_db", JSON.stringify(updateContrato));
            limparContratoCompraeVenda();
            return;
        }

        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        var getId = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        getId = !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;


        insertCompradores(getId);
        insertVendedores(getId);
        insertHonorarios(getId);

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
        limparContratoCompraeVenda();
    };

    const updateCompradores = (cdContrato, cdCompradorVendedor) => {

        var newComprador = {};
        const listCompradores = [];

        //DELETE
        let items = JSON.parse(localStorage.getItem("compradorprocurador_db"));
        items = items.filter((item) => item.cdCompradorProcurador === cdCompradorVendedor);

        localStorage.setItem("compradorprocurador_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("compradorprocurador_db");
        }

        //UPDATE
        const compradorDb = JSON.parse(localStorage.getItem("compradorprocurador_db"));
        var getId = compradorDb.length;

        const compradorOperacao = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));

        if (isEligible(compradorOperacao.length)) {

            compradorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newComprador.id = getId;
                newComprador.cdContratoCompraeVenda = cdContrato;
                newComprador.cdCompradorProcurador = cdCompradorVendedor;
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

    const insertCompradores = (cdContrato) => {

        var newComprador = {};
        const listCompradores = [];

        const compradorDb = JSON.parse(localStorage.getItem("compradorprocurador_db"));
        var getCd = !isEligible(compradorDb.length) ? 1 : compradorDb.length + 1;
        var getId = compradorDb.length;

        const compradorOperacao = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));

        if (isEligible(compradorOperacao.length)) {

            cdCompradorProcuradorSave = getCd;

            compradorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newComprador.id = getId;
                newComprador.cdContratoCompraeVenda = cdContrato;
                newComprador.cdCompradorProcurador = getCd;
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



    const insertVendedores = (cdContrato) => {

        var newVendedor = {};
        const listVendedores = [];

        const cvendedorDb = JSON.parse(localStorage.getItem("vendedorprocurador_db"));
        var getCd = !isEligible(cvendedorDb.length) ? 1 : cvendedorDb.length + 1;
        var getId = cvendedorDb.length;


        const vendedorOperacao = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));


        if (isEligible(vendedorOperacao.length)) {

            cdCVendedorProcuradorSave = getCd;


            vendedorOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newVendedor.id = getId;
                newVendedor.cdContratoCompraeVenda = cdContrato;
                newVendedor.cdVendedorProcurador = getCd;
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

    const insertHonorarios = (cdContrato) => {

        var newCorretorParceiro = {};
        const listCorretoresParceiros = [];

        const corretorParceiroDb = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
        var getCd = !isEligible(corretorParceiroDb.length) ? 1 : corretorParceiroDb.length + 1;
        var getId = corretorParceiroDb.length;



        const corretorParceiroOperacao = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));

        if (isEligible(corretorParceiroOperacao.length)) {

            cdHonorariosSave = getCd;

            corretorParceiroOperacao.map((item) => {

                getId = !isEligible(getId) ? 1 : getId + 1;

                newCorretorParceiro.id = getId;
                newCorretorParceiro.cdContratoCompraeVenda = cdContrato;
                newCorretorParceiro.cdHonorariosCorretorParceiro = getCd;
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
                // minutaspadraocev_db={minutasPadraoContratoCeVEmEdicao}

                salvar={salvarContratoCompraeVenda}
                limpar={limparContratoCompraeVenda}

            />
        </AppMenu>
    );
};

export default ContratoCompraeVendaCad;
