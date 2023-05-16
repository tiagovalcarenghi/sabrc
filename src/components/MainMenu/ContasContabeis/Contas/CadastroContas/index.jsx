import { Breadcrumbs, Button, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel, } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesContasContabeis, tipoContaContabilOptions, tipoSaldoOptions } from "../../../../../util/MainMenu/ContasContabeis/Contas/contants";
import { msgCadPessoaSuccess, msgCadSuccess } from "../../../../../util/applicationresources";
import { useEffect, useState } from "react";
import { isEligible } from "../../../../../util/utils";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';


const CadastroContas = (props) => {
    const { contacontabil, salvar, limpar } = props;
    const navigate = useNavigate();

    useEffect(() => {

        if (contacontabil) {
            setSaldo(contacontabil.saldo);
            setCdTipoConta(contacontabil.cdTipoConta)
            setCdTipoSaldo(contacontabil.cdTipoSaldo)
        }

    }, [contacontabil]);


    const [disableContaResultado, setDisableContaResultado] = useState(false);
    const [cdTipoConta, setCdTipoConta] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [cdTipoSaldo, setCdTipoSaldo] = useState('');



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: contacontabil || initialValuesContasContabeis,
        onSubmit: (values) => {

            if (!disableContaResultado && (!isEligible(saldo) || !isEligible(cdTipoSaldo))) {

                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Campo(s) SALDO e/ou TIPO SALDO está(ão) nulo(s).",
                });

            } else {



                Swal.fire({
                    icon: "success",
                    title: msgCadSuccess,
                    text: msgCadPessoaSuccess,
                });

                values.cdTipoConta = cdTipoConta;
                values.saldo = saldo;
                values.cdTipoSaldo = cdTipoSaldo;


                let itemsTipoConta = tipoContaContabilOptions;
                itemsTipoConta = itemsTipoConta?.filter((item) => item.cdTipoConta === values.cdTipoConta);
                values.descTipoConta = itemsTipoConta[0].descTipoConta;

                let itemsTipoSaldo = tipoSaldoOptions;
                itemsTipoSaldo = itemsTipoSaldo?.filter((item) => item.cdTipoSaldo === values.cdTipoSaldo);
                values.descTipoSaldo = itemsTipoSaldo[0].descTipoSaldo;


                salvar(values);
                formik.resetForm();
                navigate("/cadastro/contascontabeis/contas");

            }

        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Contábeis</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas</Typography>
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
                        <TextField
                            size="small"
                            fullWidth
                            name="desContaContabil"
                            label="Nome Conta"
                            value={formik.values.desContaContabil}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Tipo Conta</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="cdTipoConta"
                                label="Tipo Conta"
                                labelId="select-label-id"
                                id="select-label-id"
                                required
                                value={cdTipoConta}
                                onChange={(e) => {
                                    setCdTipoConta(e.target.value);

                                    if (cdTipoConta === 1) {
                                        setDisableContaResultado(true);
                                        setSaldo(0);
                                        setCdTipoSaldo(3);
                                    } else {
                                        setDisableContaResultado(false);
                                    }
                                }}


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
                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>
                        <CurrencyTextField
                            disabled={disableContaResultado}
                            size="small"
                            variant="outlined"
                            fullWidth
                            name="saldo"
                            label="Saldo"
                            value={saldo}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setSaldo(value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Tipo Saldo</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="cdTipoSaldo"
                                label="Tipo Saldo"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={cdTipoSaldo}
                                onChange={(e) => { setCdTipoSaldo(e.target.value) }}

                                disabled={disableContaResultado}

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
                            to="/cadastro/contascontabeis/contas"
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

export default CadastroContas;
