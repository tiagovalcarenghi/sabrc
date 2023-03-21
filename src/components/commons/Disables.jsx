
export const verificaDisableDelete = () => {

    const usuario = JSON.parse(localStorage.getItem("user_storage"));

    if (usuario && usuario.tipoUser === "ADMIN") {
        return false;
    } else {
        return true;
    }

};

export const verificaDisableValida = () => {

    const usuario = JSON.parse(localStorage.getItem("user_storage"));

    if (usuario && usuario.tipoUser === "ADMIN" || usuario.tipoUser === "MASTER") {
        return false;
    } else {
        return true;
    }

};


export const verificaDisableEdit = () => {

    const usuario = JSON.parse(localStorage.getItem("user_storage"));

    if (usuario && usuario.tipoUser === "ADMIN" || usuario.tipoUser === "MASTER") {
        return false;
    } else {
        return true;
    }

};

