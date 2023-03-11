import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/CadastroContratoCompraeVenda";
import { initialCompradorProcuradorOperacao, initialContratosdeCompraeVendaBase, initialHonorariosCorretorParceiroOperacoes, initialVendedorProcuradorOperacao } from "../../../util/MainMenu/ContratoCompraeVenda/constants";
import { initialValuesMinutasPadraoCeV } from "../../../util/MainMenu/MinutasPadrao/ContratoCompraeVenda/constants";
import { isEligible } from "../../../util/utils";
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
    const [minutasPadraoContratoCeVEmEdicao, setminutasPadraoContratoCeVEmEdicao] = useState(initialValuesMinutasPadraoCeV);

    useEffect(() => {

        console.log(location.state);

        if (!location.state.id) {
            setContratoCompraeVendaEmEdicao(initialContratosdeCompraeVendaBase);
            setCompradorProcuradorEmEdicao(initialCompradorProcuradorOperacao);
            setVendedorProcuradorEmEdicao(initialVendedorProcuradorOperacao);
            setHonorariosCorretorParceiroEmEdicao(initialHonorariosCorretorParceiroOperacoes);
            setCompradorVendedorNomes([]);
            setPessoaFisica([]);
            setEnderecoNomes([]);
            carregarNomes();
            carregarMinutaPadraoCeV();
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
        carregarNomes();
    };

    const carregarMinutaPadraoCeV = async () => {
        const minutasPadraoContratoCeVStorage = JSON.parse(localStorage.getItem("minutaspadraocev_db"));
        if (minutasPadraoContratoCeVStorage) {
            setminutasPadraoContratoCeVEmEdicao(minutasPadraoContratoCeVStorage.reduce((max, game) => max.id > game.id ? max : game));
        }
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

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


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

        // insertContratoCompraeVenda();
        // insertCompradores();
        // insertVendedores();
        // insertHonorarios();


        // updateContratoCompraeVenda();
        // updateCompradores();
        // updateVendedores();
        // updateHonorarios();

    };


    const limparContratoCompraeVenda = () => {
        setContratoCompraeVendaEmEdicao(initialContratosdeCompraeVendaBase);
        setCompradorProcuradorEmEdicao(initialCompradorProcuradorOperacao);
        setVendedorProcuradorEmEdicao(initialVendedorProcuradorOperacao);
        setHonorariosCorretorParceiroEmEdicao(initialHonorariosCorretorParceiroOperacoes);
    };

    return (
        <AppMenu>
            <CadastroContratoCompraeVenda
                contratocompraevenda={contratoCompraeVendaEmEdicao}

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
                minutaspadraocev_db={minutasPadraoContratoCeVEmEdicao}

                salvar={salvarContratoCompraeVenda}
                limpar={limparContratoCompraeVenda}

            />
        </AppMenu>
    );
};

export default ContratoCompraeVendaCad;
