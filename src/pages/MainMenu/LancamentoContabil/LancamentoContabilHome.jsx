import { useEffect, useState } from "react";
import GridLancamentoContabil from "../../../components/MainMenu/LancamentoContabil/GridLancamentoContabil";
import { isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const LancamentoContabilHome = (props) => {

    const { disableDelete, disableEdit } = props;
    const [lancamentoContabilDb, setLancamentoContabilDb] = useState([]);
    const [centrosDeCusto, setCentrosDeCusto] = useState([]);
    const [contas, setContas] = useState([]);
    const [contasComplementares, setContasComplementares] = useState([]);


    useEffect(() => {
        setLancamentoContabilDb(JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db")));
        setCentrosDeCusto(JSON.parse(localStorage.getItem("centrodecusto_db")));
        setContas(JSON.parse(localStorage.getItem("contascontabeis_db")));
        setContasComplementares(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }, []);


    const deleteLancamentoContabil = (data) => {
        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
        items = items.map((item) => {
            if (item.id === data.id) {
                item.valorCredito = '';
                item.valorDebito = '';
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("lancamentoscontabeisabase_db", JSON.stringify(items));

        // deleteLancamentoContabilAll(data);
        setLancamentoContabilDb(JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db")));
        // deleteLancamentoContasResultadoPatrimonial(data);
    };


    // const deleteLancamentoContasResultadoPatrimonial = (data) => {

    //     let itemDeletado = JSON.parse(localStorage.getItem("nomes_db"));
    //     itemDeletado = itemDeletado?.filter((obj) => obj.cdTipoNome === 2 && obj.cdCadastroNomes === data.cdPessoaJuridica);

    //     let items = JSON.parse(localStorage.getItem("nomes_db"));
    //     items = items.filter((item) => item.id !== itemDeletado[0].id);

    //     localStorage.setItem("nomes_db", JSON.stringify(items));
    //     if (items.length === 0) {
    //         localStorage.removeItem("nomes_db");
    //     }
    // };

    // const deleteLancamentoContabilAll = (data) => {
    //     let items = JSON.parse(localStorage.getItem("representanteslegais_db"));
    //     items = items.filter((item) => item.cdPessoaJuridica !== data.cdPessoaJuridica);
    //     localStorage.setItem("representanteslegais_db", JSON.stringify(items));
    //     if (items.length === 0) {
    //         localStorage.removeItem("representanteslegais_db");
    //     }
    // };

    const filtraLancamentoContabil = (cdLancamentoContabil, descLancamento, cdCentrodeCusto, cdConta, cdContaComplementar, isValido, dataInicial, dataFinal) => {
        if (!cdLancamentoContabil && !descLancamento && !cdCentrodeCusto && !cdConta && !cdContaComplementar && !isValido && !dataInicial && !dataFinal) {
            setLancamentoContabilDb(JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
        items = filterer((x) => x.descLancamento.toLowerCase().includes(descLancamento.toLowerCase()))
        if (isEligible(cdLancamentoContabil)) { items = filterer(((x) => x.cdLancamentoContabil === cdLancamentoContabil)) }
        if (isEligible(cdCentrodeCusto)) { items = filterer(((x) => x.cdCentrodeCusto === cdCentrodeCusto)) }
        if (isEligible(cdConta)) { items = filterer(((x) => x.cdConta === cdConta)) }
        if (isEligible(cdContaComplementar)) { items = filterer(((x) => x.cdContaComplementar === cdContaComplementar)) }
        if (isEligible(isValido)) { items = filterer(((x) => x.isValido === isValido)) }

        if (isEligible(dataInicial) && isEligible(dataFinal)) {
            items = filterer(((x) => x.dataInicial >= dataInicial && x.dataFinal <= dataFinal))
        } else {
            if (isEligible(dataInicial) && !isEligible(dataFinal)) { items = filterer(((x) => x.dataInicial >= dataInicial)) }
            if (!isEligible(dataInicial) && isEligible(dataFinal)) { items = filterer(((x) => x.dataFinal <= dataFinal)) }
        }

        (run(items));

        setLancamentoContabilDb(items);
    };



    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));



    return (
        <>
            <AppMenu>
                <GridLancamentoContabil
                    lancamentoscontabeisabase_db={lancamentoContabilDb}
                    deletelancamentocontabil={deleteLancamentoContabil}
                    filter={filtraLancamentoContabil}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                    centrosdecusto={centrosDeCusto}
                    contas={contas}
                    contascomplementares={contasComplementares}
                />
            </AppMenu>
        </>
    );
};

export default LancamentoContabilHome;
