import { useEffect, useState } from "react";
import { verificaDisableDelete, verificaDisableValida } from "../../../components/commons/Disables";
import GridContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/GridContratoCompraeVenda";
import { initialValuesLancamentoContabilAll } from "../../../util/MainMenu/LancamentoContabil/constants";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoCompraeVendaHome = () => {

    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [disableValida, setDisableValida] = useState(true);
    const [contratoCompraeVendaDb, setContratoCompraeVendaDb] = useState([]);

    useEffect(() => {
        setContratoCompraeVendaDb(JSON.parse(localStorage.getItem("contratocompraevendabase_db")));
    }, []);


    useEffect(() => {
        setDisableDelete(verificaDisableDelete());
        setDisableEdit(false);
        setDisableValida(verificaDisableValida());
    }, []);




    const deleteContratoCompraeVenda = (data) => {
        let items = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("contratocompraevendabase_db", JSON.stringify(items));

        deleteLancamentoContabilAll(data);
        setContratoCompraeVendaDb(JSON.parse(localStorage.getItem("contratocompraevendabase_db")));
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

    const validaContratoCompraeVenda = (data) => {
        let items = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.status = 'VALIDO';
            }
        });

        localStorage.setItem("contratocompraevendabase_db", JSON.stringify(items));

        validarLancamentoContabil(data);
        setContratoCompraeVendaDb(JSON.parse(localStorage.getItem("contratocompraevendabase_db")));
    };


    const validarLancamentoContabil = (data) => {

        //inicializa dados para lançamento
        const newLancamentoContabil = [];
        var lancamento = {};

        //busca usuário sistema
        const userStorage = JSON.parse(localStorage.getItem("user_storage"));

        //pega dados do cdlanamento e id
        var getIdCdLancamento = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getIdCdLancamento = !isEligible(getIdCdLancamento) || !isEligible(getIdCdLancamento.length) ? 1 : getIdCdLancamento[getIdCdLancamento.length - 1].cdLancamentoContabil + 1;

        var getId = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        getId = !isEligible(getId.length) ? 1 : getId.length + 1;

        //salva cdLancamento no contrato
        let contratobase = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        contratobase.map((item) => {
            if (item.id === data.id) {
                item.cdLancamentoContabil = getIdCdLancamento;
            }
        });

        //lançamento endereço imovel ordem 1
        lancamento.id = getId;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 1;
        lancamento.descLancamento = "Negocio realizado contrato número " + data.cdContratoCompraeVenda;
        lancamento.cdConta = 100; //buscar cdconta fixada da conta 'Creditos a Realizar'
        lancamento.descConta = 'Creditos a Realizar';
        lancamento.cdContaComplementar = data.cdEndereco;
        lancamento.descContaComplementar = data.enderecoCompleto;
        lancamento.valorCredito = 0;
        lancamento.valorDebito = data.totalHonorarios;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.dataSelecionada = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        newLancamentoContabil.push(lancamento);

        /////CASO HAJA CORRETORES PARCEIROS
        const items = JSON.parse(localStorage.getItem("honorarioscorretorparceiro_db"));
        const selectHonorarios = items?.filter((cc) => cc.cdContratoCompraeVenda === data.cdContratoCompraeVenda);

        if (isEligible(selectHonorarios)) {

            var getOrdem = selectHonorarios.length;

            var x = 1;

            selectHonorarios.map((item) => {

                lancamento = {};
                getId = getId + 1;
                getOrdem = !isEligible(getOrdem) ? 2 : x + 1;

                lancamento.id = getId;
                lancamento.cdLancamentoContabil = getIdCdLancamento;
                lancamento.ordemLancamento = getOrdem;
                lancamento.descLancamento = "Negocio realizado contrato número " + item.cdContratoCompraeVenda;
                lancamento.cdConta = 101; //buscar cdconta fixada da conta 'Comissão'
                lancamento.descConta = 'Comissão';
                lancamento.cdContaComplementar = item.cdPessoaFisica;
                lancamento.descContaComplementar = item.nomeCompleto;
                lancamento.valorCredito = item.valorHonorario;
                lancamento.valorDebito = 0;
                lancamento.isValido = true;
                lancamento.status = 'VALIDO';
                lancamento.dataLancamento = getCurrentDate();
                lancamento.dataSelecionada = getCurrentDate();
                lancamento.usuarioLancamento = userStorage.id;

                x++;
                newLancamentoContabil.push(lancamento);


            });

        }

        //lançamento da ultima linha do contrato
        lancamento = {};

        getOrdem = !isEligible(selectHonorarios.length) ? 2 : selectHonorarios.length + 2;
        getId = getId + 1;

        lancamento.id = getId;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = getOrdem;
        lancamento.descLancamento = "Negocio realizado contrato número " + data.cdContratoCompraeVenda;
        lancamento.cdConta = 102; //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.descConta = 'Receita Operacional';
        lancamento.cdCentrodeCusto = 555; //buscar centro de custo fixo 'Intermediação'
        lancamento.descCentrodeCusto = 'Intermediação';
        lancamento.valorCredito = 0;
        lancamento.valorDebito = data.honorarioImobiliaria;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.dataSelecionada = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        newLancamentoContabil.push(lancamento);


        const verifica = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));

        const nlc = !isEligible(verifica.length) ? newLancamentoContabil : verifica.concat(newLancamentoContabil);

        localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(nlc));

    };

    const filtraContratoCompraeVenda = (cdContratoCompraeVenda, cdEndereco) => {
        if (!cdContratoCompraeVenda && !cdEndereco) {
            setContratoCompraeVendaDb(JSON.parse(localStorage.getItem("contratocompraevendabase_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("contratocompraevendabase_db"));
        if (isEligible(cdContratoCompraeVenda)) { items = filterer(((x) => x.cdContratoCompraeVenda.toString() === cdContratoCompraeVenda))(run(items)); }
        if (isEligible(cdEndereco)) { items = filterer(((x) => x.cdEndereco === cdEndereco))(run(items)); }


        setContratoCompraeVendaDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));



    return (
        <>
            <AppMenu>
                <GridContratoCompraeVenda
                    contratocompraevendagrid_db={contratoCompraeVendaDb}
                    deletacontratocompraevenda={deleteContratoCompraeVenda}
                    validacontratocompraevenda={validaContratoCompraeVenda}
                    filter={filtraContratoCompraeVenda}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                    disableValida={disableValida}
                />
            </AppMenu>
        </>
    );
};

export default ContratoCompraeVendaHome;
