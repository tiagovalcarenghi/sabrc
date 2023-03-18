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
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { msgAtencao, msgCadSuccess, msgExcludeRLancamentoOperacoes, msgExcludeRLancamentoOperacoesSuccess, msgInsertLancamentoSuccess, msgLancamentoError, msgLancamentoInsertContaError, msgLancamentoInsertDescricaoError, msgLancamentoInsertError, msgLancamentoInsertValoresError, msgLancamentoSaveError } from "../../../../util/applicationresources";
import React, { useState } from "react";
import { getDateFormat, isEligible, verificaContas, verificaValores } from "../../../../util/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { initialValuesLancamentoBancoBase, initialValuesLancamentoBancoOperacao } from "../../../../util/MainMenu/LancamentoBancos/constants";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f9b046',
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        borderColor: '#f9b046',
        border: 0,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CadastroLancamentoBancos = (props) => {

    const { lancamentobancooperacao, salvar, limpar, deletelancamentocontabiloperacao, addlancamento, centrosdecusto, contas, contascomplementares } = props;
    const [filterCdCentrodeCusto, setFilterCdCentrodeCusto] = useState({});;
    const [filterCdConta, setFilterCdConta] = useState({});;
    const [filterCdContaComplementar, setFilterCdContaComplementar] = useState({});;
    const [dataLancamento, setDataLancamento] = useState(dayjs());
    const [valorCredito, setValorCredito] = useState(0);
    const [valorDebito, setValorDebito] = useState(0);
    const navigate = useNavigate();

    const handleChange = (newValue) => {
        setDataLancamento(newValue);
    };

    const navigateToComponent = () => {
        navigate("/operacoes/lancamentobancos", { state: { value: 1 } });
    };


    const handleExcluirLancamento = (l) => {
        deletelancamentocontabiloperacao(l);
    };

    const validaValores = () => {

        var totalCredito = 0;
        var totalDebito = 0;
        let items = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));
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

        const newl = initialValuesLancamentoBancoOperacao;
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


        let items = JSON.parse(localStorage.getItem("lancamentosbancooperacao_db"));

        return items.length > 0 ? true : false;
    }


    const formik = useFormik({

        enableReinitialize: true,
        initialValues: initialValuesLancamentoBancoBase,
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
                    navigate("/operacoes/lancamentobancos");

                }
            }
        }

    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Conciliação Bancária</Typography>
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
                                        <StyledTableCell align="left">Descrição</StyledTableCell>
                                        <StyledTableCell align="center">Centro de Custo</StyledTableCell>
                                        <StyledTableCell align="center">Conta Contábil</StyledTableCell>
                                        <StyledTableCell align="center">Conta Complementar</StyledTableCell>
                                        <StyledTableCell align="center">Crédito</StyledTableCell>
                                        <StyledTableCell align="center">Débito</StyledTableCell>

                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {lancamentobancooperacao && lancamentobancooperacao.length > 0 && (
                                        <TableBody>
                                            {lancamentobancooperacao.map((lc) => (
                                                <StyledTableRow key={lc.id}>
                                                    <StyledTableCell align="left" width="20%">
                                                        {lc.descLancamento}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="15%">
                                                        {lc.descCentrodeCusto}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="15%">
                                                        {lc.descConta}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="15%">
                                                        {lc.descContaComplementar}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="10%">
                                                        {lc.valorCredito}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="10%">
                                                        {lc.valorDebito}
                                                    </StyledTableCell>

                                                    <StyledTableCell width="5%" align="center">
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
                                                    </StyledTableCell>
                                                </StyledTableRow>
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

export default CadastroLancamentoBancos;
