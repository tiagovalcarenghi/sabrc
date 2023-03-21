import { useEffect, useState } from "react";
import { verificaDisableDelete } from "../../../components/commons/Disables";
import GridOrdemdeServico from "../../../components/MainMenu/OrdemdeServico/GridOrdemdeServico";
import { isEligible } from "../../../util/utils";
import AppMenu from "../../AppNavBar/AppMenu";


const OrdemdeServicoHome = () => {

    const [disableDelete, setDisableDelete] = useState(true);
    const [ordemdeServicoDb, setOrdemdeServicoDb] = useState([]);

    useEffect(() => {
        setOrdemdeServicoDb(JSON.parse(localStorage.getItem("ordemdeservico_db")));
        setDisableDelete(verificaDisableDelete());
    }, []);


    const deleteOrdemdeServico = (data) => {
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
                    filter={filtraOrdemdeServico}
                    disableDelete={disableDelete}

                />
            </AppMenu>
        </>
    );
};

export default OrdemdeServicoHome;
