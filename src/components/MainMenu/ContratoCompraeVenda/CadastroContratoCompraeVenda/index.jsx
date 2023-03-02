import {
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TableHead,
    Breadcrumbs,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { initialValuesLancamentoContabilBase, initialValuesLancamentoContabilOperacao } from "../../../../util/MainMenu/LancamentoContabil/constants";
import { msgAtencao, msgCadSuccess, msgExcludeRLancamentoOperacoes, msgExcludeRLancamentoOperacoesSuccess, msgInsertLancamentoSuccess, msgLancamentoError, msgLancamentoInsertContaError, msgLancamentoInsertDescricaoError, msgLancamentoInsertError, msgLancamentoInsertValoresError, msgLancamentoSaveError } from "../../../../util/applicationresources";
import React from "react";
import { getDateFormat, isEligible, verificaContas, verificaValores } from "../../../../util/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const CadastroContratoCompraeVenda = (props) => {

    const { lancamentocontabiloperacao, salvar, limpar, deletelancamentocontabiloperacao, addlancamento, centrosdecusto, contas, contascomplementares } = props;
    const [filterCdCentrodeCusto, setFilterCdCentrodeCusto] = React.useState({});;
    const [filterCdConta, setFilterCdConta] = React.useState({});;
    const [filterCdContaComplementar, setFilterCdContaComplementar] = React.useState({});;
    const [dataLancamento, setDataLancamento] = React.useState(dayjs());
    const [valorCredito, setValorCredito] = React.useState(0);
    const [valorDebito, setValorDebito] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (newValue) => {
        setDataLancamento(newValue);
    };

    const navigateToComponent = () => {
        navigate("/operacoes/lancamentocontabil", { state: { value: 1 } });
    };


    const handleExcluirLancamento = (l) => {
        deletelancamentocontabiloperacao(l);
    };

    const validaValores = () => {

        var totalCredito = 0;
        var totalDebito = 0;
        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));
        items.map((item) => {
            totalCredito = totalCredito + Number(item.valorCredito);
            totalDebito = totalDebito + Number(item.valorDebito);
        });

        return totalCredito !== totalDebito;
    }

    const addLancamento = () => {

        setValorCredito(isEligible(valorCredito) ? Number(valorCredito) : Number(0));
        setValorDebito(isEligible(valorDebito) ? Number(valorDebito) : Number(0));


        if (!isEligible(formik.values.descLancamento)) {

            Swal.fire({
                icon: "error",
                title: msgLancamentoError,
                text: msgLancamentoInsertDescricaoError,
            });

        } else {

            if (!verificaContas(filterCdConta.cdTipoConta, filterCdContaComplementar.cdContaComplementar, filterCdCentrodeCusto.cdCentrodeCusto)) {

                Swal.fire({
                    icon: "error",
                    title: msgLancamentoError,
                    text: msgLancamentoInsertContaError,
                });


            } else {

                console.log(valorCredito);
                console.log(valorDebito);

                if (!verificaValores(valorCredito, valorDebito)) {

                    Swal.fire({
                        icon: "error",
                        title: msgLancamentoError,
                        text: msgLancamentoInsertValoresError,
                    });

                } else {

                    insertNewLancamento();

                }
            }
        }
    };


    const insertNewLancamento = () => {

        const newl = initialValuesLancamentoContabilOperacao;
        newl.descLancamento = formik.values.descLancamento;
        newl.cdCentrodeCusto = filterCdCentrodeCusto.cdCentrodeCusto;
        newl.descCentrodeCusto = filterCdCentrodeCusto.descCentrodeCusto;
        newl.cdConta = filterCdConta.cdContaContabil;
        newl.descConta = filterCdConta.desContaContabil;
        newl.cdContaComplementar = filterCdContaComplementar.cdContaComplementar;
        newl.descContaComplementar = filterCdContaComplementar.desccContaComplementar;
        newl.valorCredito = valorCredito;
        newl.valorDebito = valorDebito;

        addlancamento(newl);

        formik.resetForm();
        setFilterCdCentrodeCusto({});
        setFilterCdConta({});
        setFilterCdContaComplementar({});
        setValorCredito(0);
        setValorDebito(0);
    }

    const validaGridOperacoes = () => {


        let items = JSON.parse(localStorage.getItem("lancamentoscontabeisaoperacao_db"));

        return items.length > 0 ? true : false;
    }


    const formik = useFormik({

        enableReinitialize: true,
        initialValues: initialValuesLancamentoContabilBase,
        onSubmit: (values) => {

            if (!validaGridOperacoes()) {

                Swal.fire({
                    icon: "error",
                    title: msgLancamentoError,
                    text: msgLancamentoSaveError,
                });

            } else {

                if (validaValores()) {

                    Swal.fire({
                        icon: "error",
                        title: msgLancamentoError,
                        text: msgLancamentoInsertError,
                    });

                } else {

                    Swal.fire({
                        icon: "success",
                        title: msgCadSuccess,
                        text: msgInsertLancamentoSuccess,
                    });

                    values.dataSelecionada = getDateFormat(dataLancamento);

                    salvar(values);
                    formik.resetForm();
                    navigate("/operacoes/lancamentocontabil");

                }
            }
        }

    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Lançamento Contábil</Typography>
                <Typography color="text.primary">Cadastrar</Typography>
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

                    <Grid item xs={12}>
                        <TextField
                            rows={4}
                            multiline
                            size="small"
                            fullWidth
                            name="descLancamento"
                            label="Descrição"
                            value={formik.values.descLancamento}
                            onChange={formik.handleChange}

                        />
                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Centro de Custo</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdCentrodeCusto"
                                label="Centro de Custo"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdCentrodeCusto}
                                onChange={(e) => setFilterCdCentrodeCusto(e.target.value)}

                            >
                                {centrosdecusto.map((cdc) => (
                                    <MenuItem
                                        key={cdc.id}
                                        value={cdc}

                                    >
                                        {cdc.descCentrodeCusto}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Contas</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdConta"
                                label="Contas"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdConta}
                                onChange={(e) => setFilterCdConta(e.target.value)}


                            >
                                {contas.map((cc) => (
                                    <MenuItem
                                        key={cc.id}
                                        value={cc}

                                    >
                                        {cc.desContaContabil}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Contas Complementares</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdContaComplementar"
                                label="Contas Complementares"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdContaComplementar}
                                onChange={(e) => setFilterCdContaComplementar(e.target.value)}

                            >
                                {contascomplementares.map((cco) => (
                                    <MenuItem
                                        key={cco.id}
                                        value={cco}

                                    >
                                        {cco.desccContaComplementar}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>
                        <CurrencyTextField
                            size="small"
                            fullWidth
                            name="valorCredito"
                            label="Crédito"
                            variant="standard"
                            value={valorCredito}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setValorCredito(value)}
                        />
                    </Grid>

                    <Grid item xs={3}>

                        <CurrencyTextField
                            size="small"
                            fullWidth
                            name="valorDebito"
                            label="Débito"
                            variant="standard"
                            value={valorDebito}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setValorDebito(value)}
                        />


                    </Grid>


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addLancamento();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Lançamento
                        </Button>


                    </Grid>


                    <Grid item xs={3}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DesktopDatePicker
                                label="Data do Lançamento"
                                inputFormat="DD/MM/YYYY"
                                value={dataLancamento}
                                onChange={handleChange}
                                renderInput={(params) => <TextField
                                    fullWidth
                                    name="dataLancamento"
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>


                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 500 }}
                                size="small"
                                aria-label="custom pagination table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Descrição</TableCell>
                                        <TableCell align="left">Centro de Custo</TableCell>
                                        <TableCell align="left">Conta Contábil</TableCell>
                                        <TableCell align="left">Conta Complementar</TableCell>
                                        <TableCell align="left">Crédito</TableCell>
                                        <TableCell align="left">Débito</TableCell>

                                        <TableCell align="center" colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {lancamentocontabiloperacao && lancamentocontabiloperacao.length > 0 && (
                                        <TableBody>
                                            {lancamentocontabiloperacao.map((lc) => (
                                                <TableRow key={lc.id}>
                                                    <TableCell align="left" width="20%">
                                                        {lc.descLancamento}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descCentrodeCusto}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descConta}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descContaComplementar}
                                                    </TableCell>
                                                    <TableCell align="left" width="10%">
                                                        {lc.valorCredito}
                                                    </TableCell>
                                                    <TableCell align="left" width="10%">
                                                        {lc.valorDebito}
                                                    </TableCell>

                                                    <TableCell width="5%" align="center">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: msgExcludeRLancamentoOperacoes,
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#3085d6",
                                                                    cancelButtonColor: "#d33",
                                                                    confirmButtonText: "Sim",
                                                                    cancelButtonText: "Não",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        Swal.fire(msgAtencao, msgExcludeRLancamentoOperacoesSuccess);
                                                                        handleExcluirLancamento(lc);
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <DeleteRoundedIcon></DeleteRoundedIcon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>
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
                                setFilterCdCentrodeCusto({});
                                setFilterCdConta({});
                                setFilterCdContaComplementar({});
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
                            onClick={() => {
                                navigateToComponent();
                            }}
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

export default CadastroContratoCompraeVenda;