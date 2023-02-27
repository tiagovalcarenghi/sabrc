import { useEffect, useState } from "react";
import GridLancamentoContabil from "../../../components/MainMenu/LancamentoContabil/GridLancamentoContabil";
import { getDateFormat, isEligible } from "../../../util/utils";
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
        items.map((item) => {
            if (item.cdLancamentoContabil === data.cdLancamentoContabil) {
                item.valorCredito = 0;
                item.valorDebito = 0;
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("lancamentoscontabeisabase_db", JSON.stringify(items));

        deleteLancamentoContabilAll(data);
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

    const deleteLancamentoContabilAll = (data) => {
        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        items.map((item) => {
            if (item.cdLancamentoContabil === data.cdLancamentoContabil) {
                item.valorCredito = 0;
                item.valorDebito = 0;
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(items));
    };

    const filtraLancamentoContabil = (cdLancamentoContabil, descLancamento, cdCentrodeCusto, cdConta, cdContaComplementar, isValido, dataInicial, dataFinal) => {
        if (!cdLancamentoContabil && !descLancamento && !cdCentrodeCusto && !cdConta && !cdContaComplementar && !isValido && !dataInicial && !dataFinal) {
            setLancamentoContabilDb(JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db")));
            return;
        }

        dataInicial = getDateFormat(dataInicial);
        dataFinal = getDateFormat(dataFinal);

        console.log(dataInicial);
        console.log(dataFinal);


        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisabase_db"));
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
