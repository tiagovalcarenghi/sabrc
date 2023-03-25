import { useEffect, useState } from "react";
import GridRelatoriosContabeis from "../../../components/MainMenu/RelatoriosContabeis/GridRelatoriosContabeis";
import { getDateFormat, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";



const RelatoriosContabeisHome = () => {
    const [lancamentoscontabeisAll, setLacantamentosContabeisAll] = useState([]);
    const [centrosDeCusto, setCentrosDeCusto] = useState([]);
    const [contas, setContas] = useState([]);
    const [contasComplementares, setContasComplementares] = useState([]);


    useEffect(() => {
        setLacantamentosContabeisAll(JSON.parse(localStorage.getItem("lancamentoscontabeisall_db")));
        setCentrosDeCusto(JSON.parse(localStorage.getItem("centrodecusto_db")));
        setContas(JSON.parse(localStorage.getItem("contascontabeis_db")));
        setContasComplementares(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }, []);



    const filtaRelatorioContabil = (cdLancamentoContabil, descLancamento, cdCentrodeCusto, cdConta, cdContaComplementar, isValido, dataInicial, dataFinal) => {
        if (!cdLancamentoContabil && !descLancamento && !cdCentrodeCusto && !cdConta && !cdContaComplementar && !isValido && !dataInicial && !dataFinal) {
            setLacantamentosContabeisAll(JSON.parse(localStorage.getItem("lancamentoscontabeisall_db")));
            return;
        }

        dataInicial = getDateFormat(dataInicial);
        dataFinal = getDateFormat(dataFinal);

        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        items = filterer((x) => x.descLancamento.toLowerCase().includes(descLancamento.toLowerCase()))(run(items));
        if (isEligible(cdLancamentoContabil)) { items = filterer(((x) => x.cdLancamentoContabil.toString() === cdLancamentoContabil))(run(items)); }
        if (isEligible(cdCentrodeCusto)) { items = filterer(((x) => x.cdCentrodeCusto === cdCentrodeCusto))(run(items)); }
        if (isEligible(cdConta)) { items = filterer(((x) => x.cdConta === cdConta))(run(items)); }
        if (isEligible(cdContaComplementar)) { items = filterer(((x) => x.cdContaComplementar === cdContaComplementar))(run(items)); }
        if (isEligible(isValido)) { items = filterer(((x) => x.isValido === isValido))(run(items)); }

        if (isEligible(dataInicial) && isEligible(dataFinal)) {
            items = filterer(((x) => x.dataSelecionada >= dataInicial && x.dataSelecionada <= dataFinal))(run(items));
        } else {
            if (isEligible(dataInicial) && !isEligible(dataFinal)) { items = filterer(((x) => x.dataSelecionada >= dataInicial))(run(items)); }
            if (!isEligible(dataInicial) && isEligible(dataFinal)) { items = filterer(((x) => x.dataSelecionada <= dataFinal))(run(items)); }
        }

        setLacantamentosContabeisAll(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridRelatoriosContabeis
                    lancamentocontabeisall={lancamentoscontabeisAll}
                    filter={filtaRelatorioContabil}
                    centrosdecusto={centrosDeCusto}
                    contas={contas}
                    contascomplementares={contasComplementares}
                />
            </AppMenu>
        </>
    );
};

export default RelatoriosContabeisHome;
