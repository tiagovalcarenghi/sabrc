import { useEffect, useState } from "react";
import { verificaDisableDelete, verificaDisableValida } from "../../../components/commons/Disables";
import GridContratoLocacao from "../../../components/MainMenu/ContratoLocacao/GridContratoLocacao";
import { getCurrentDate, isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoLocacaoHome = () => {

    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [disableValida, setDisableValida] = useState(true);
    const [contratoLocacaoDb, setContratoLocacaoDb] = useState([]);

    useEffect(() => {
        setContratoLocacaoDb(JSON.parse(localStorage.getItem("contratolocacaobase_db")));
    }, []);


    useEffect(() => {
        setDisableDelete(verificaDisableDelete());
        setDisableEdit(false);
        setDisableValida(verificaDisableValida());
    }, []);




    const deleteContratoLocacao = (data) => {
        let items = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.isValido = false;
                item.status = 'CANCELADO';
            }
        });

        localStorage.setItem("contratolocacaobase_db", JSON.stringify(items));

        deleteLancamentoContabilAll(data);
        setContratoLocacaoDb(JSON.parse(localStorage.getItem("contratolocacaobase_db")));
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

    const validaContratoLocacao = (data) => {
        let items = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        items.map((item) => {
            if (item.id === data.id) {
                item.status = 'VALIDO';
            }
        });

        localStorage.setItem("contratolocacaobase_db", JSON.stringify(items));

        validarLancamentoContabil(data);
        setContratoLocacaoDb(JSON.parse(localStorage.getItem("contratolocacaobase_db")));
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

        console.log(data);

        //salva cdLancamento no contrato
        let contratobase = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        contratobase.map((item) => {
            if (item.id === data.id) {
                item.cdLancamentoContabil = getIdCdLancamento;
            }
        });
        localStorage.setItem("contratolocacaobase_db", JSON.stringify(contratobase));

        //lançamento taxa intermediacao bomlar ordem 1
        lancamento.id = getId;
        lancamento.cdLancamentoContabil = getIdCdLancamento;
        lancamento.ordemLancamento = 1;
        lancamento.descLancamento = "Geração de Contrato de Locação Numero CL" + data.cdContratoLocacao;
        lancamento.cdCentrodeCusto = 665; //buscar centro de custo fixo 'Locação'
        lancamento.descCentrodeCusto = 'Locação'; //Locação
        lancamento.cdConta = 102; //buscar cdconta fixada da conta 'Receita Operacional'
        lancamento.descConta = 'Receita Operacional';
        lancamento.valorCredito = data.taxaIntermediacaoBomlar;
        lancamento.valorDebito = 0;
        lancamento.isValido = true;
        lancamento.status = 'VALIDO';
        lancamento.dataLancamento = getCurrentDate();
        lancamento.dataSelecionada = getCurrentDate();
        lancamento.usuarioLancamento = userStorage.id;

        newLancamentoContabil.push(lancamento);

        /////CASO HAJA CORRETORES NA INTERMEDIACAO
        const items = JSON.parse(localStorage.getItem("taxaintermediacao_db"));
        const selectHonorarios = items?.filter((cc) => cc.cdContratoLocacao === data.cdContratoLocacao);

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
                lancamento.descLancamento = "Geração de Contrato de Locação Numero CL" + data.cdContratoLocacao;
                lancamento.cdConta = 101; //buscar cdconta fixada da conta 'Comissão'
                lancamento.descConta = 'Comissão';
                lancamento.cdContaComplementar = item.cdPessoaFisica;
                lancamento.descContaComplementar = item.nomeCompleto;
                lancamento.valorCredito = item.valorTaxaIntermediacao;
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
        lancamento.descLancamento = "Geração de Contrato de Locação Numero CL" + data.cdContratoLocacao;
        lancamento.cdConta = 2258; //buscar cdconta fixada da conta 'CLIENTE'
        lancamento.descConta = 'Cliente';
        lancamento.cdContaComplementar = data.cdEndereco;
        lancamento.descContaComplementar = data.enderecoCompleto;
        lancamento.valorCredito = 0;
        lancamento.valorDebito = data.taxaIntermediacaoTotal;
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

    const filtraContratoLocacao = (cdContratoLocacao, cdEndereco) => {
        if (!cdContratoLocacao && !cdEndereco) {
            setContratoLocacaoDb(JSON.parse(localStorage.getItem("contratolocacaobase_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("contratolocacaobase_db"));
        if (isEligible(cdContratoLocacao)) { items = filterer(((x) => x.cdContratoLocacao.toString() === cdContratoLocacao))(run(items)); }
        if (isEligible(cdEndereco)) { items = filterer(((x) => x.cdEndereco === cdEndereco))(run(items)); }


        setContratoLocacaoDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));



    return (
        <>
            <AppMenu>
                <GridContratoLocacao
                    contratolocacaogrid_db={contratoLocacaoDb}
                    deletecontratolocacao={deleteContratoLocacao}
                    validacontratolocacao={validaContratoLocacao}
                    filter={filtraContratoLocacao}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                    disableValida={disableValida}
                />
            </AppMenu>
        </>
    );
};

export default ContratoLocacaoHome;
