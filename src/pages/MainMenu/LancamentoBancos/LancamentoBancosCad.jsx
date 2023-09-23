import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroLancamentoBancos from "../../../components/MainMenu/LancamentoBancos/CadastroLancamentoBancos";
import { initialValuesLancamentoBancoOperacao } from "../../../util/MainMenu/LancamentoBancos/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const LancamentoBancosCad = () => {
    const [LancamentoContabilOperacao, setLancamentoContabilOperacaoEmEdicao] = useState(initialValuesLancamentoBancoOperacao);
    const [centrosDeCusto, setCentrosDeCusto] = useState([]);
    const [contas, setContas] = useState([]);
    const [contasComplementares, setContasComplementares] = useState([]);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        limparLancamentoContabil();
        carregarLancamentoBancoOperacoes();
        carregarDadosSelects();
    }, [location.state]);

    const carregarLancamentoBancoOperacoes = async () => {
        const lancamentoContabilStorage = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));
        setLancamentoContabilOperacaoEmEdicao(lancamentoContabilStorage);
    };


    const carregarDadosSelects = async () => {
        setCentrosDeCusto(JSON.parse(localStorage.getItem("centrodecusto_db")));
        setContas(JSON.parse(localStorage.getItem("contascontabeis_db")));
        setContasComplementares(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }

    const salvarLancamentoContabil = (lc) => {

        const newLancamentoContabil = [];
        const items = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));
        const userStorage = JSON.parse(localStorage.getItem("user_storage"));

        var getIdCdLancamento = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getIdCdLancamento = !isEligible(getIdCdLancamento) || !isEligible(getIdCdLancamento.length) ? 1 : getIdCdLancamento[getIdCdLancamento.length - 1].cdLancamentoContabil + 1;


        var getId = JSON.parse(localStorage.getItem("lancamentosbancobase_db"));
        getId = getId.length;
        var getOrdem = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));
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

        const verifica = JSON.parse(localStorage.getItem("lancamentosbancobase_db"));

        const nlc = !isEligible(verifica.length) ? newLancamentoContabil : verifica.concat(newLancamentoContabil);

        localStorage.setItem("lancamentosbancobase_db", JSON.stringify(nlc));
        insertLancamentoContabilGeral(newLancamentoContabil);
        //falta insert lancamentocontasresultado
        //falta insert lancamentocontaspatrimonial
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
        setLancamentoContabilOperacaoEmEdicao(initialValuesLancamentoBancoOperacao);
        localStorage.setItem("lancamentosbancooperacao_db", JSON.stringify([]));
    };

    const deleteLancamentoBancoOperacao = (data) => {
        let items = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));
        items = items.filter((item) => item.id !== data.id);
        items = items.filter((item) => item.idBanco !== data.idBanco);
        localStorage.setItem("lancamentosbancooperacao_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("lancamentosbancooperacao_db");
        }

        carregarLancamentoBancoOperacoes();

    };

    const addLancamento = (data) => {

        var getId = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));

        data.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        data.idBanco = data.id;

        const newLancamento = !isEligible(getId) || !isEligible(getId.length) ? [data] : [...JSON.parse(localStorage.getItem("lancamentosbancooperacao_db")), data];
        localStorage.setItem("lancamentosbancooperacao_db", JSON.stringify(newLancamento));


        carregarLancamentoBancoOperacoes();

        addLancamentoBanco(data);

    };


    const addLancamentoBanco = (data) => {


        var getId = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));

        var vc = data.valorCredito;
        var vb = data.valorDebito;

        data.id = !isEligible(getId) || !isEligible(getId.length) ? 1 : getId[getId.length - 1].id + 1;
        data.cdCentrodeCusto = '';
        data.descCentrodeCusto = '';
        data.cdConta = 5; //pegar o valor fixo da conta BANCO
        data.descConta = 'Banco';
        data.cdContaComplementar = '';
        data.descContaComplementar = '';
        data.valorCredito = Number(vb);
        data.valorDebito = Number(vc);

        const newLancamento = !isEligible(getId) || !isEligible(getId.length) ? [data] : [...JSON.parse(localStorage.getItem("lancamentosbancooperacao_db")), data];
        localStorage.setItem("lancamentosbancooperacao_db", JSON.stringify(newLancamento));

        carregarLancamentoBancoOperacoes();

    }

    return (
        <AppMenu>
            <CadastroLancamentoBancos
                lancamentobancooperacao={LancamentoContabilOperacao}
                salvar={salvarLancamentoContabil}
                limpar={limparLancamentoContabil}
                deletelancamentocontabiloperacao={deleteLancamentoBancoOperacao}
                addlancamento={addLancamento}
                centrosdecusto={centrosDeCusto}
                contas={contas}
                contascomplementares={contasComplementares}
            />
        </AppMenu>
    );
};

export default LancamentoBancosCad;
