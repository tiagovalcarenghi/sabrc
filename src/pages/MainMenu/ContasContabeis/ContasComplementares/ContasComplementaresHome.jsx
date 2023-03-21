import { useEffect, useState } from "react";
import { verificaDisableDelete } from "../../../../components/commons/Disables";
import GridContasComplementares from "../../../../components/MainMenu/ContasContabeis/ContasComplementares/GridContasComplementares";
import AppMenu from "../../../AppNavBar/AppMenu";


const ContasComplementaresHome = () => {
    const [disableDelete, setDisableDelete] = useState(true);
    const [contasComplementaresDb, setContasComplementaresDb] = useState([]);

    useEffect(() => {
        setContasComplementaresDb(JSON.parse(localStorage.getItem("contascomplementares_db")));
    }, []);


    useEffect(() => {
        setDisableDelete(verificaDisableDelete());
    }, []);


    const deleteContaComplementar = (data) => {
        let items = JSON.parse(localStorage.getItem("contascomplementares_db"));
        items = items.filter((item) => item.id !== data.id);
        localStorage.setItem("contascomplementares_db", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("contascomplementares_db");
        }
        setContasComplementaresDb(JSON.parse(localStorage.getItem("contascomplementares_db")));
    };

    const filtraContaComplementar = (desccContaComplementar, isBanco) => {
        if (!desccContaComplementar && !isBanco) {
            setContasComplementaresDb(JSON.parse(localStorage.getItem("contascomplementares_db")));
            return;
        }

        let items = JSON.parse(localStorage.getItem("contascomplementares_db"));
        items = filterer((x) => x.desccContaComplementar.toLowerCase().includes(desccContaComplementar.toLowerCase()))
            ((x) => x.isBanco === isBanco)
            (run(items));


        setContasComplementaresDb(items);
    };


    const run = (value = []) => ({ type: run, value: value });

    const filterer = (f) => (g) =>
        g && g.type === run
            ? g.value.filter((x) => f(x))
            : filterer((x) => f(x) && g(x));


    return (
        <>
            <AppMenu>
                <GridContasComplementares
                    contascomplementares_db={contasComplementaresDb}
                    deletecontacomplementar={deleteContaComplementar}
                    filter={filtraContaComplementar}
                    disableDelete={disableDelete}
                />
            </AppMenu>
        </>
    );
};

export default ContasComplementaresHome;
