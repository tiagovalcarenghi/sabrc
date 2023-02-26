import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroLancamentoContabil from "../../../components/MainMenu/LancamentoContabil/CadastroLancamentoContabil";
import { initialValuesLancamentoContabilBase, initialValuesLancamentoContabilOperacao } from "../../../util/MainMenu/LancamentoContabil/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
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


        limparLancamentoContabil();
        carregarLancamentoContabilOperacoes();
        carregarDadosSelects();
    }, [location.state]);

    const carregarLancamentoContabilOperacoes = async () => {
        const lancamentoContabilStorage = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        setLancamentoContabilOperacaoEmEdicao(lancamentoContabilStorage);
    };


    const carregarDadosSelects = async () => {
        setCentrosDeCusto(JSON.parse(localStorage.getItem("centrodecusto_db")));
        setContas(JSON.parse(localStorage.getItem("contascontabeis_db")));
        setContasComplementares(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }

    const salvarLancamentoContabil = (lc) => {

        const newLancamentoContabil = [];
        const items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        const userStorage = JSON.parse(localStorage.getItem("user_storage"));

        var getIdCdLancamento = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getIdCdLancamento = !isEligible(getIdCdLancamento) || !isEligible(getIdCdLancamento.length) ? 1 : getIdCdLancamento[getIdCdLancamento.length - 1].cdLancamentoContabil + 1;


        var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
        getId = getId.length;
        var getOrdem = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        getOrdem = getOrdem.length;

        var x = 0;

        items.map((item) => {

            getId = !isEligible(getId) ? 1 : getId + 1;
            getOrdem = !isEligible(getOrdem) ? 1 : x + 1;

            item.id = getId;
            item.cdLancamentoContabil = getIdCdLancamento;
            item.ordemLancamento = getOrdem;
            item.isValido = true;
            item.status = 'VALIDO';
            item.dataLancamento = getCurrentDate();
            item.dataSelecionada = lc.dataSelecionada;
            item.usuarioLancamento = userStorage.id;

            x++;
            newLancamentoContabil.push(item);

        });

        const verifica = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));

        const nlc = !isEligible(verifica.length) ? newLancamentoContabil : verifica.concat(newLancamentoContabil);

        localStorage.setItem("lancamentoscontabeisabase_db", JSON.stringify(nlc));
        setLancamentoContabilEdicao(initialValuesLancamentoContabilBase);
        insertLancamentoContabilGeral(newLancamentoContabil);
        //falta insert lancamentocontasresultado
        //falta insert lancamentocontaspatromonial
    };

    const insertLancamentoContabilGeral = (lc) => {

        var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getId = getId.length;

        lc.map((item) => {
            getId = !isEligible(getId) ? 1 : getId + 1;
            item.id = getId;
        });

        const verifica = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        const nlc = !isEligible(verifica.length) ? lc : verifica.concat(lc);
        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(nlc));

    }


    const limparLancamentoContabil = () => {
        setLancamentoContabilEdicao(initialValuesLancamentoContabilBase);
        setLancamentoContabilOperacaoEmEdicao(initialValuesLancamentoContabilOperacao);
        localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify([]));
    };

    const deleteLancamentoContabilOperacao = (data) => {
        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("lancamentoscontabeisaoperacao_db");
        }
        carregarLancamentoContabilOperacoes();

    };

    const addLancamento = (data) => {

        var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));

        data.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;

        const newLancamento = !isEligible(getId) || !isEligible(getId.length) ? [data] : [...JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db")), data];
        localStorage.setItem("lancamentoscontabeisaoperacao_db", JSON.stringify(newLancamento));

        carregarLancamentoContabilOperacoes();

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
