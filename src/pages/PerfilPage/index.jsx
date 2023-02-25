import { useEffect, useState } from "react";
import EditaPerfil from "../../components/Perfil";
import { initialPerfil } from "../../util/Perfil/contants";
import AppMenu from "../AppNavBar/AppMenu";


const PerfilPage = () => {
    const [perfilEmEdicao, setPerfilEmEdicao] = useState(initialPerfil);


    useEffect(() => {
        carregarUser();
    }, []);

    const carregarUser = async () => {

        const userStorage = JSON.parse(localStorage.getItem("user_storage"));
        const editaPerfil = initialPerfil;
        editaPerfil.idUser = userStorage.id;
        editaPerfil.tipoUser = userStorage.tipoUser;
        editaPerfil.oldPassword = userStorage.password;
        setPerfilEmEdicao(editaPerfil);

    };

    const salvarPerfil = (data) => {

        let itemUpdateS = JSON.parse(localStorage.getItem("user_storage"));
        let itemUpdate = JSON.parse(localStorage.getItem("users_db"));
        const n = itemUpdate?.filter((obj) => obj.id === data.idUser);
        n[0].password = data.newPassword;
        itemUpdateS.password = data.newPassword;

        itemUpdate[itemUpdate.findIndex((x) => x.id === n[0].id)] = n[0];

        localStorage.setItem("users_db", JSON.stringify(itemUpdate));
        localStorage.setItem("user_storage", JSON.stringify(itemUpdateS));

        carregarUser();

    };

    return (
        <>
            <AppMenu>
                <EditaPerfil
                    perfil_db={perfilEmEdicao}
                    salvar={salvarPerfil}
                />
            </AppMenu>
        </>
    );
};

export default PerfilPage;
