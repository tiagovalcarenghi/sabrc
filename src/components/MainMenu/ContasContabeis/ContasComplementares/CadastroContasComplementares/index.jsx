import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
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


const CadastroContasComplementares = (props) => {
    const { contacomplementar, salvar, limpar } = props;
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


            // let itemsTipoConta = tipoContaContabilOptions;
            // itemsTipoConta = itemsTipoConta?.filter((item) => item.cdTipoConta === values.cdTipoConta);
            // values.descTipoConta = itemsTipoConta[0].descTipoConta;

            // let itemsTipoSaldo = tipoSaldoOptions;
            // itemsTipoSaldo = itemsTipoSaldo?.filter((item) => item.cdTipoSaldo === values.cdTipoSaldo);
            // values.descTipoSaldo = itemsTipoSaldo[0].descTipoSaldo;


            salvar(values);
            formik.resetForm();
            navigate("/cadastro/contascontabeis/contascomplementares");

        },
    });

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
                            <InputLabel id="demo-controlled-open-select-label">Tipo Conta</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="cdTipoConta"
                                label="Tipo Conta"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.cdTipoConta}
                                onChange={formik.handleChange}
                                required

                            >
                                {tipoContaContabilOptions.map((tc) => (
                                    <MenuItem
                                        key={tc.id}
                                        value={tc.cdTipoConta}

                                    >
                                        {tc.descTipoConta}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> */}

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    {/* <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Tipo Saldo</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="cdTipoSaldo"
                                label="Tipo Saldo"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.cdTipoSaldo}
                                onChange={formik.handleChange}
                                required

                            >
                                {tipoSaldoOptions.map((ts) => (
                                    <MenuItem
                                        key={ts.id}
                                        value={ts.cdTipoSaldo}

                                    >
                                        {ts.descTipoSaldo}
                                    </MenuItem>
                                ))}
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
