
export const validaExclusao = () => {
    const usuario = JSON.parse(localStorage.getItem("user_storage"));
    if (usuario) {
        return usuario.tipoUser === "ADMIN" ? true : false;
    }
};