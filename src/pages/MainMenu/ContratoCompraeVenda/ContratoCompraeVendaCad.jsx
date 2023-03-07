import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/CadastroContratoCompraeVenda";
import { initialCompradorProcuradorOperacao, initialContratosdeCompraeVendaBase, initialHonorariosCorretorParceiroOperacoes, initialVendedorProcuradorOperacao } from "../../../util/MainMenu/ContratoCompraeVenda/constants";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoCompraeVendaCad = () => {
    const [contratoCompraeVendaEmEdicao, setContratoCompraeVendaEmEdicao] = useState(initialContratosdeCompraeVendaBase);
    const [compradorProcuradorEmEdicao, setCompradorProcuradorEmEdicao] = useState(initialCompradorProcuradorOperacao);
    const [vendedorProcuradorEmEdicao, setVendedorProcuradorEmEdicao] = useState(initialVendedorProcuradorOperacao);
    const [honorariosCorretorParceiroEmEdicao, setHonorariosCorretorParceiroEmEdicao] = useState(initialHonorariosCorretorParceiroOperacoes);
    const location = useLocation();

    useEffect(() => {

        if (!location.state) {
            setContratoCompraeVendaEmEdicao(initialContratosdeCompraeVendaBase);
            setCompradorProcuradorEmEdicao(initialCompradorProcuradorOperacao);
            setVendedorProcuradorEmEdicao(initialVendedorProcuradorOperacao);
            setHonorariosCorretorParceiroEmEdicao(initialHonorariosCorretorParceiroOperacoes);
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
    };

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

                salvar={salvarContratoCompraeVenda}
                limpar={limparContratoCompraeVenda}

            />
        </AppMenu>
    );
};

export default ContratoCompraeVendaCad;
