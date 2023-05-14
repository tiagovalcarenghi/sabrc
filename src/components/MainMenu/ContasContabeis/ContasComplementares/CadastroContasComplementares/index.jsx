import { Breadcrumbs, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel, } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesContasComplementares } from "../../../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import { msgCadPessoaSuccess, msgCadSuccess } from "../../../../../util/applicationresources";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { isEligible } from "../../../../../util/utils";

const CadastroContasComplementares = (props) => {
    const { contacomplementar, salvar, nomes_db } = props;
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: contacomplementar || initialValuesContasComplementares,
        onSubmit: (values) => {

            if (!isEligible(selectContaComplementar.id)) {

                Swal.fire({
                    icon: "error",
                    title: "ERRO",
                    text: "Erro ao cadastrar Conta Complementar. Verifique.",
                });


            } else {

                Swal.fire({
                    icon: "success",
                    title: msgCadSuccess,
                    text: msgCadPessoaSuccess,
                });


                let NomesStorage = JSON.parse(localStorage.getItem("nomes_db"));
                var ContaComp = NomesStorage?.filter((item) => item.id === selectContaComplementar.id);
                values.desccContaComplementar = ContaComp[0].nome;
                values.cdTipoContaComplementar = ContaComp[0].cdTipoNome;
                values.cdCadastro = ContaComp[0].cdCadastroNomes;
                values.isBanco = checked;


                salvar(values);
                formik.resetForm();
                navigate("/cadastro/contascontabeis/contascomplementares");

            }

        },
    });


    const [selectContaComplementar, setContaComplementar] = useState({});
    const [checked, setChecked] = useState(false);

    const changeContaComplementar = (event) => {
        const {
            target: { value },
        } = event;
        setContaComplementar(value);
    };

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };



    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Contábeis</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Complementares</Typography>
                <Typography color="text.primary">Cadastro</Typography>
            </Breadcrumbs>


            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px 0px 0px 0px",
                    margin: "10px 10px 10px 10px",
                }}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Nova Conta Complementar</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="selectContaComplementar"
                                label="Nova Conta Complementar"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={selectContaComplementar}
                                onChange={changeContaComplementar}
                                required
                            >

                                {nomes_db.map((nome) => (
                                    <MenuItem
                                        key={nome.id}
                                        value={nome}

                                    >
                                        {nome.nome}
                                    </MenuItem>
                                ))}


                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Banco"
                            size="small"
                            type="text"
                            checked={checked}
                            value={checked}
                            onChange={handleChangeCheck}
                        />

                    </Grid>

                </Grid>




                <Grid container spacing={2} justifyContent="flex-start">
                    <Grid item>
                        <Button
                            color="success"
                            variant="outlined"
                            type="submit"
                            startIcon={<SaveIcon />}
                        >
                            SALVAR
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            color="info"
                            variant="outlined"
                            onClick={(e) => {
                                e.preventDefault();
                                formik.resetForm();
                                setContaComplementar({});
                                setChecked(false);
                            }}
                            startIcon={<RefreshIcon />}
                        >
                            LIMPAR
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            color="primary"
                            variant="outlined"
                            component={Link}
                            to="/cadastro/contascontabeis/contascomplementares"
                            startIcon={<ArrowBackIcon />}
                        >
                            VOLTAR
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default CadastroContasComplementares;
