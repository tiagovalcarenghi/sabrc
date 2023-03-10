import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CadastroUsuarios from "../../components/Usuario/CadastroUsuarios";
import { initialUsuarios } from "../../util/Usuarios/constants";
import AppMenu from "../AppNavBar/AppMenu";


const UsuarioCad = () => {
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(initialUsuarios);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);

        if (!location.state.id) {
            setUsuarioEmEdicao(initialUsuarios);
            return;
        }
        carregarUsuario(location.state.id);
    }, [location.state]);

    const carregarUsuario = async (id) => {
        const usuarioStorage = JSON.parse(localStorage.getItem("users_db"));
        const selectUsuario = usuarioStorage?.filter((cc) => cc.id === id);
        setUsuarioEmEdicao(selectUsuario[0]);
    };

    const salvarusuario = (u) => {
        if (u.id) {
            var updateUsuario = JSON.parse(localStorage.getItem("users_db"));
            updateUsuario[updateUsuario.findIndex((x) => x.id === u.id)] = u;
            localStorage.setItem("users_db", JSON.stringify(updateUsuario));
            setUsuarioEmEdicao(initialUsuarios);
            return;
        }

        var getId = JSON.parse(localStorage.getItem("users_db"));
        u.id = getId === null ? 1 : getId[getId.length - 1].id + 1;
        const newUsuario = getId === null ? [u] : [...JSON.parse(localStorage.getItem("users_db")), u];
        localStorage.setItem("users_db", JSON.stringify(newUsuario));
        setUsuarioEmEdicao(initialUsuarios);

    };


    const limparUsuarioEmEdicao = () => {
        setUsuarioEmEdicao(initialUsuarios);
    };

    return (
        <AppMenu>
            <CadastroUsuarios
                usuario={usuarioEmEdicao}
                salvar={salvarusuario}
                limpar={limparUsuarioEmEdicao}
            />
        </AppMenu>
    );
};

export default UsuarioCad;
