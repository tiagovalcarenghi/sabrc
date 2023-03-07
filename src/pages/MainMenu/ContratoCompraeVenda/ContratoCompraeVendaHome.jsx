import { useEffect, useState } from "react";
import GridContratoCompraeVenda from "../../../components/MainMenu/ContratoCompraeVenda/GridContratoCompraeVenda";
import { isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const ContratoCompraeVendaHome = (props) => {

    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [disableValida, setDisableValida] = useState(true);
    const [contratoCompraeVendaDb, setContratoCompraeVendaDb] = useState([]);

    useEffect(() => {
        setContratoCompraeVendaDb(JSON.parse(localStorage.getItem("contratocompraevendabase_db")));
    }, []);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user_storage"));
        if (usuario) {
            usuario.tipoUser === "ADMIN"
                ? disables(1)
                : usuario.tipoUser === "MASTER"
                    ? disables(2)
                    : disables(0);
        }
    }, []);

    const disables = (data) => {
        switch (data) {
            case 1:
                setDisableDelete(false);
                setDisableEdit(false);
                setDisableValida(false);
                break;
            case 2:
                setDisableDelete(true);
                setDisableEdit(false);
                setDisableValida(false);
                break;
            default:
                setDisableDelete(true);
                setDisableEdit(false);
                setDisableValida(true);
        }
    };


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

        //FAZER O LANÇAMENTO COMPLETO

        // let items = JSON.parse(localStorage.getItem("lancamentoscontabeisall_db"));
        // items.map((item) => {
        //     if (item.cdLancamentoContabil === data.cdLancamentoContabil) {
        //         item.isValido = true;
        //         item.status = 'VALIDO';
        //     }
        // });

        // localStorage.setItem("lancamentoscontabeisall_db", JSON.stringify(items));
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
                    contratocompraevendabase_db={contratoCompraeVendaDb}
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
