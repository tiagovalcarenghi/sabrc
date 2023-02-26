import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroLancamentoContabil from "../../../components/MainMenu/LancamentoContabil/CadastroLancamentoContabil";
import { initialValuesLancamentoContabilBase, initialValuesLancamentoContabilOperacao } from "../../../util/MainMenu/LancamentoContabil/constants";
import { getCurrentDate } from "../../../util/getCurrentDate";
import AppMenu from "../../AppNavBar/AppMenu";


const LancamentoContabilCad = () => {
    const [lancamentoContabilEmEdicao, setLancamentoContabilEdicao] = useState(initialValuesLancamentoContabilBase);
    const [LancamentoContabilOperacao, setLancamentoContabilOperacaoEmEdicao] = useState(initialValuesLancamentoContabilOperacao);
    const [centrosDeCusto, setCentrosDeCusto] = useState([]);
    const [contas, setContas] = useState([]);
    const [contasComplementares, setContasComplementares] = useState([]);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state) {
            setLancamentoContabilEdicao(initialValuesLancamentoContabilBase);
            setLancamentoContabilOperacaoEmEdicao(initialValuesLancamentoContabilOperacao);
            return;
        }
        //carregarLancamentoContabil(location.state.id);
        // carregaRepresentantesLegais(location.state.id);
        carregarDadosSelects();
    }, [location.state]);

    // const carregarLancamentoContabil = async (id) => {
    //     const lancamentoContabilStorage = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
    //     const selectLancamentoContabil = lancamentoContabilStorage?.filter((pj) => pj.id === id);
    //     setLancamentoContabilEdicao(selectLancamentoContabil[0]);
    // };

    // const carregaRepresentantesLegais = async (id) => {
    //     const pessoaRepresentantesLegaisStorage = JSON.parse(localStorage.getItem("representanteslegais_db"));
    //     const selectRepresentantesLegais = pessoaRepresentantesLegaisStorage?.filter((rl) => rl.cdPessoaJuridica === id);
    //     setLancamentoContabilOperacaoEmEdicao(selectRepresentantesLegais);

    // }

    const carregarDadosSelects = async () => {
        setCentrosDeCusto(JSON.parse(localStorage.getItem("centrodecusto_db")));
        setContas(JSON.parse(localStorage.getItem("contascontabeis_db")));
        setContasComplementares(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }

    const salvarLancamentoContabil = (lc) => {

        const newLancamentoContabil = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
        const items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        const userStorage = JSON.parse(localStorage.getItem("user_storage"));

        var getIdCdLancamento = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getIdCdLancamento = getIdCdLancamento === null ? 1 : getIdCdLancamento[getIdCdLancamento.length - 1].id + 1;

        items = items.map((item) => {
            var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
            var getIdOrdem = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));

            newLancamentoContabil.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
            newLancamentoContabil.cdLancamentoContabil = getIdCdLancamento;
            newLancamentoContabil.ordemLancamento = getIdOrdem === null ? 1 : getIdOrdem[getIdOrdem.length - 1].id + 1;
            newLancamentoContabil.descLancamento = item.descLancamento;
            newLancamentoContabil.cdCentrodeCusto = item.cdCentrodeCusto;
            newLancamentoContabil.descCentrodeCusto = item.descCentrodeCusto;
            newLancamentoContabil.cdConta = item.cdConta;
            newLancamentoContabil.descConta = item.descConta;
            newLancamentoContabil.cdContaComplementar = item.cdContaComplementar;
            newLancamentoContabil.descContaComplementar = item.descContaComplementar;
            newLancamentoContabil.valorCredito = item.valorCredito;
            newLancamentoContabil.valorDebito = item.valorDebito;
            newLancamentoContabil.isValido = true;
            newLancamentoContabil.status = 'VALIDO';
            newLancamentoContabil.dataLancamento = getCurrentDate();
            newLancamentoContabil.dataSelecionada = lc.dataSelecionada;
            newLancamentoContabil.usuarioLancamento = userStorage.id;

        });

        const newLC = !newLancamentoContabil ? [newLancamentoContabil] : [...JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db")), newLancamentoContabil];
        localStorage.setItem("lancamentoscontabeisabase_db", JSON.stringify(newLC));
        setLancamentoContabilEdicao(initialValuesLancamentoContabilBase);
        insertLancamentoContabilGeral(newLancamentoContabil);
        //falta insert lancamentocontasresultado
        //falta insert lancamentocontaspatromonial
    };

    const insertLancamentoContabilGeral = (lc) => {

        lc = lc.map((item) => {
            var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
            item.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        });

        const newLC = !lc ? [lc] : [...JSON.parse(localStorage.getItem("lancamentoscontabeisall_db")), lc];
        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(newLC));

    }


    const limparLancamentoContabil = () => {
        setLancamentoContabilEdicao(initialValuesLancamentoContabilBase);
        setLancamentoContabilOperacaoEmEdicao(initialValuesLancamentoContabilOperacao);
    };

    const deleteLancamentoContabilOperacao = (data) => {
        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("lancamentoscontabeisaoperacao_db");
        }

    };

    const addLancamento = (data) => {

        var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));

        data.id = getId === null ? 1 : getId[getId.length - 1].id + 1;

        const newLancamento = getId === null ? [data] : [...JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db")), data];
        localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify(newLancamento));

    };

    return (
        <AppMenu>
            <CadastroLancamentoContabil
                lancamentocontabil={lancamentoContabilEmEdicao}
                lancamentocontabiloperacao={LancamentoContabilOperacao}
                salvar={salvarLancamentoContabil}
                limpar={limparLancamentoContabil}
                deletelancamentocontabiloperacao={deleteLancamentoContabilOperacao}
                addlancamento={addLancamento}
                centrosdecusto={centrosDeCusto}
                contas={contas}
                contascomplementares={contasComplementares}
            />
        </AppMenu>
    );
};

export default LancamentoContabilCad;
