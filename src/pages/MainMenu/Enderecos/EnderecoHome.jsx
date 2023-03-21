import { useEffect, useState } from "react";
import { verificaDisableDelete, verificaDisableEdit } from "../../../components/commons/Disables";
import GridEndereco from "../../../components/MainMenu/Enderecos/GridEndereco";
import AppMenu from "../../AppNavBar/AppMenu";


const EnderecoHome = () => {
    const [disableDelete, setDisableDelete] = useState(true);
    const [disableEdit, setDisableEdit] = useState(true);
    const [enderecoDb, setEnderecoDb] = useState([]);


    useEffect(() => {
        setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
    }, []);


    useEffect(() => {
        setDisableDelete(verificaDisableDelete());
        setDisableEdit(verificaDisableEdit());
    }, []);


    const deleteEndereco = (data) => {
        let items = JSON.parse(localStorage.getItem("enderecos_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("enderecos_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("enderecos_db");
        }
        setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
        deleteName(data);
    };


    const deleteName = (data) => {

        let itemDeletado = JSON.parse(localStorage.getItem("nomes_db"));
        itemDeletado = itemDeletado?.filter((obj) => obj.cdTipoNome === 3 && obj.cdCadastroNomes === data.cdEndereco);

        let items = JSON.parse(localStorage.getItem("nomes_db"));
        items = items.filter((item) => item.id !== itemDeletado[0].id);

        localStorage.setItem("nomes_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("nomes_db");
        }
    };

    const filtraEndereco = (logradouro, cep, bairro, localidade, uf) => {
        if (!logradouro && !cep && !bairro && !localidade && !uf) {
            setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("enderecos_db"));
        items = filterer((x) => x.logradouro.toLowerCase().includes(logradouro.toLowerCase()))
            ((x) => x.cep.toLowerCase().includes(cep.toLowerCase()))
            ((x) => x.bairro.toLowerCase().includes(bairro.toLowerCase()))
            ((x) => x.localidade.toLowerCase().includes(localidade.toLowerCase()))
            ((x) => x.uf.toLowerCase().includes(uf.toLowerCase()))

            (run(items));

        setEnderecoDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridEndereco
                    enderecos_db={enderecoDb}
                    deleteendereco={deleteEndereco}
                    filter={filtraEndereco}
                    disableDelete={disableDelete}
                    disableEdit={disableEdit}
                />
            </AppMenu>
        </>
    );
};

export default EnderecoHome;
