import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/CadastroContratoCompraeVenda";
import { initialCompradorProcuradorOperacao, initialContratosdeCompraeVendaBase, initialHonorariosCorretorParceiroOperacoes, initialVendedorProcuradorOperacao } from "../../../util/MainMenu/ContratoCompraeVenda/constants";
import { initialValuesMinutasPadraoCeV } from "../../../util/MainMenu/MinutasPadrao/ContratoCompraeVenda/constants";
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

    const addCompradoreProcurador = (data) => {
    };

    const deleteCompradoreProcurador = (data) => {
    };


    const addVendedoreProcurador = (data) => {
    };

    const deleteVendedoreProcurador = (data) => {
    };


    const addHonorarios = (data) => {
    };

    const deleteHonorarios = (data) => {
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
