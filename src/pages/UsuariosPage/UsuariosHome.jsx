import { useEffect, useState } from "react";
import GridUsuarios from "../../components/Usuario/GridUsuarios";
import AppMenu from "../AppNavBar/AppMenu";


const UsuariosHome = () => {
    const [usuarioDb, setUsuarioDb] = useState([]);


    useEffect(() => {
        setUsuarioDb(JSON.parse(localStorage.getItem("users_db")));
    }, []);


    const deleteUsuario = (data) => {
        let items = JSON.parse(localStorage.getItem("users_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("users_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("users_db");
        }
        setUsuarioDb(JSON.parse(localStorage.getItem("users_db")));
    };

    const filtraUsuario = (nameUser, email, tipoUser) => {
        if (!nameUser && !email && !tipoUser) {
            setUsuarioDb(JSON.parse(localStorage.getItem("users_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("users_db"));
        items = filterer((x) => x.nameUser.toLowerCase().includes(nameUser.toLowerCase()))
            ((x) => x.email.toLowerCase().includes(email.toLowerCase()))
            ((x) => x.tipoUser.toLowerCase().includes(tipoUser.toLowerCase()))

            (run(items));

        setUsuarioDb(items);
    };

    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridUsuarios
                    users_db={usuarioDb}
                    deleteusuario={deleteUsuario}
                    filter={filtraUsuario}
                />
            </AppMenu>
        </>
    );
};

export default UsuariosHome;
