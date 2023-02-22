import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesContasComplementares } from "../../../../../util/MainMenu/ContasContabeis/ContasComplementares/contants";
import { msgCadPessoaSuccess, msgCadSuccess } from "../../../../../util/applicationresources";
import { useState } from "react";

const CadastroContasComplementares = (props) => {
    const { contacomplementar, salvar, limpar, pessoafisicaoptions } = props;
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: contacomplementar || initialValuesContasComplementares,
        onSubmit: (values) => {
            Swal.fire({
                icon: "success",
                title: msgCadSuccess,
                text: msgCadPessoaSuccess,
            });

            values.desccContaComplementar = vefificaNome(selectTipoContaComplementar, selectContaComplementar);
            values.cdTipoContaComplementar = selectTipoContaComplementar;
            values.cdCadastro = verificarCdCadastro(selectTipoContaComplementar, selectContaComplementar);
            values.isBanco = false;

            salvar(values);
            formik.resetForm();
            navigate("/cadastro/contascontabeis/contascomplementares");

        },
    });


    const [selectContaComplementar, setContaComplementar] = useState({});
    const [selectTipoContaComplementar, setTipoContaComplementar] = useState(0);

    const changeContaComplementar = (event, tipo) => {
        const {
            target: { value },
        } = event;
        setContaComplementar(value);
        setTipoContaComplementar(tipo);
    };

    const vefificaNome = (tipo, value) => {
        switch (tipo) {
            case 1:
                return value.nomeCompleto;
        }
    }

    const verificarCdCadastro = (tipo, value) => {
        switch (tipo) {
            case 1:
                return value.cdPessoaFisica;
        }
    }




    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px",
                    margin: "10px 10px 10px 10px",
                }}
            >
                <Stack direction="row" spacing={1}>
                    <Chip label="Cadastro Contas Complementares" />
                </Stack>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    {/* <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Pessoa Física</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="selectRepresentanteLegal"
                                label="Pessoa Física"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={selectContaComplementar}
                                onChange={(e) => changeContaComplementar(e, 1)}
                                required
                            >

                                {pessoafisicaoptions && pessoafisicaoptions.length > 0 && (

                                    pessoafisicaoptions.map((rl) => (
                                        <MenuItem
                                            key={rl.id}
                                            value={rl}

                                        >
                                            {rl.nomeCompleto}
                                        </MenuItem>
                                    ))

                                )}


                            </Select>
                        </FormControl>
                    </Grid> */}

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
                                limpar();
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
