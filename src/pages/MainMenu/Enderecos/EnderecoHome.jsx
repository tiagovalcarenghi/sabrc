import { useEffect, useState } from "react";
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
                break;
            case 2:
                setDisableDelete(true);
                setDisableEdit(false);
                break;
            default:
                setDisableDelete(true);
                setDisableEdit(true);
        }
    };

    const deleteEndereco = (data) => {
        let items = JSON.parse(localStorage.getItem("enderecos_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("enderecos_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("enderecos_db");
        }
        setEnderecoDb(JSON.parse(localStorage.getItem("enderecos_db")));
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
