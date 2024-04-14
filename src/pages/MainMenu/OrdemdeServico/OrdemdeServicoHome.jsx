import { useEffect, useState } from "react";
import { verificaDisableDelete, verificaDisableValida } from "../../../components/commons/Disables";
import GridOrdemdeServico from "../../../components/MainMenu/OrdemdeServico/GridOrdemdeServico";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const OrdemdeServicoHome = () => {
    
    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [disableValida, setDisableValida] = useState(true);
    const [ordemdeServicoDb, setOrdemdeServicoDb] = useState([]);
    const userStorage = JSON.parse(localStorage.getItem("user_storage"));

    useEffect(() => {
        setOrdemdeServicoDb(JSON.parse(localStorage.getItem("ordemdeservico_db")));
        setDisableDelete(verificaDisableDelete());
        setDisableEdit(false);
        setDisableValida(verificaDisableValida());
    }, []);


    const deleteOrdemdeServico = (data) => {
        debugger
        let items = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("ordemdeservico_db", JSON.stringify(items));

        deleteLancamentoContabilAll(data);
        setOrdemdeServicoDb(JSON.parse(localStorage.getItem("ordemdeservico_db")));
    };


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

    const validaOrdemDeServico = (data) => {
        let items = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.status = 'VALIDO';
            }
        });

        localStorage.setItem("ordemdeservico_db", JSON.stringify(items));

        validarLancamentoContabil(data);
        setOrdemdeServicoDb(JSON.parse(localStorage.getItem("ordemdeservico_db")));
    };

    const validarLancamentoContabil = (data) => {

        //lançamento all
        var getIdLancamentoAll = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        var getIdCdLancamento = !isEligible(getIdLancamentoAll) || !isEligible(getIdLancamentoAll.length) ? 1 : getIdLancamentoAll[getIdLancamentoAll.length - 1].cdLancamentoContabil + 1;
        getIdLancamentoAll = !isEligible(getIdLancamentoAll.length) ? 1 : getIdLancamentoAll.length + 1;

        
        //salva cdLancamento no contrato
        let osbase = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        osbase.map((item) => {
            if (item.id === data.id) {
                item.cdLancamentoContabil = getIdCdLancamento;
            }
        });
        localStorage.setItem("ordemdeservico_db", JSON.stringify(osbase));


        insertLancamentoContabilGeral(data, getIdLancamentoAll, getIdCdLancamento);

    };

    const insertLancamentoContabilGeral = (os, getId, getIdCdLancamento) => {

        let lancamento = {};
        let listaOs = [];

        //lançamento ordem de serviço
        lancamento.id = getId;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 1;
        lancamento.descLancamento = "Geração de Ordem de Serviço Número - " + os.cdOrdemdeServico;
        lancamento.cdCentrodeCusto = 3; //verificar cd centro de custo fixo nome 'Ordem de Serviço'
        lancamento.descCentrodeCusto = "Ordem de Serviço"; //verificar centro de custo fixo nome 'Ordem de Serviço'
        lancamento.cdConta = 3; // //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.descConta = 'Receita Operacional'; //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.valorCredito = Number(os.valorServico);
        lancamento.valorDebito = 0;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.dataSelecionada = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        listaOs.push(lancamento);

        lancamento = {};

        //lançamento endereço
        lancamento.id = getId + 1;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 2;
        lancamento.descLancamento = "Geração de Ordem de Serviço Número - " + os.cdOrdemdeServico;
        lancamento.cdConta = os.cdContratante
        lancamento.descConta = os.nomeContratante;
        lancamento.cdContaComplementar = os.cdEndereco;
        lancamento.descContaComplementar = os.enderecoCompleto;
        lancamento.valorCredito = 0;
        lancamento.valorDebito = os.valorServico;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.dataSelecionada = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        listaOs.push(lancamento);


        const verifica = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        const nlc = !isEligible(verifica.length) ? listaOs : verifica.concat(listaOs);
        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(nlc));
    }



    const filtraOrdemdeServico = (cdOrdemdeServico, cdEndereco) => {
        if (!cdOrdemdeServico && !cdEndereco) {
            setOrdemdeServicoDb(JSON.parse(localStorage.getItem("ordemdeservico_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("ordemdeservico_db"));
        if (isEligible(cdOrdemdeServico)) { items = filterer(((x) => x.cdOrdemdeServico.toString() === cdOrdemdeServico))(run(items)); }
        if (isEligible(cdEndereco)) { items = filterer(((x) => x.cdEndereco === cdEndereco))(run(items)); }


        setOrdemdeServicoDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));



    return (
        <>
            <AppMenu>
                <GridOrdemdeServico
                    ordemdeservico_db={ordemdeServicoDb}
                    deletaordemdeservico={deleteOrdemdeServico}
                    validaordemdeservico={validaOrdemDeServico}
                    filter={filtraOrdemdeServico}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                    disableValida={disableValida}

                />
            </AppMenu>
        </>
    );
};

export default OrdemdeServicoHome;
