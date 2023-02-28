import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router-dom";
import {
    Button, Grid, TableHead, TextField, FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { msgAtencao, msgExcludeLancamentoContabilError, msgExcludeRLancamentoOperacoes, msgSuccessExcludeLancamentoContabil } from "../../../../util/applicationresources";
import { getDateFormat } from "../../../../util/utils";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

///----------------- TABLE PAGINATION ACTIONS START-------------------/////

export function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="primeira mágina"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="página anterior"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="próxima página"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="última página"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

///----------------- TABLE PAGINATION ACTIONS END-------------------/////

const GridLancamentoContabil = (props) => {
    const { lancamentoscontabeisabase_db, deletelancamentocontabil, filter, disableDelete, centrosdecusto, contas, contascomplementares } = props;

    const [filterCdLancamentoContabil, setFilterCdLancamentoContabil] = useState("");
    const [filterDescLancamento, setFilterDescLancamento] = useState("");
    const [filterCdCentrodeCusto, setFilterCdCentrodeCusto] = useState("");
    const [filterCdConta, setFilterCdConta] = useState("");
    const [filterCdContaComplementar, setFilterCdContaComplementar] = useState("");
    const [filterIsValido, setFilterIsValido] = useState("");
    const [filterDataInicial, setFilterDataInicial] = React.useState(dayjs());
    const [filterDataFinal, setFilterDataFinal] = React.useState(dayjs());
    const [checked, setChecked] = React.useState(false);

    const handleExcluir = (lancamentocontabil) => {
        deletelancamentocontabil(lancamentocontabil);
    };

    const validaExclusao = () => {
        const usuario = JSON.parse(localStorage.getItem("user_storage"));
        if (usuario) {
            return usuario.tipoUser === "ADMIN" ? true : false;
        }
    };

    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/operacoes/cadlancamentocontabil", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterCdLancamentoContabil("");
            setFilterDescLancamento("");
            setFilterCdCentrodeCusto("");
            setFilterCdConta("");
            setFilterCdContaComplementar("");
            setFilterIsValido("");
            setFilterDataInicial(dayjs());
            setFilterDataFinal(dayjs());
            setChecked(false)
        } else {
            filter(
                filterCdLancamentoContabil,
                filterDescLancamento,
                filterCdCentrodeCusto,
                filterCdConta,
                filterCdContaComplementar,
                filterIsValido,
                filterDataInicial,
                filterDataFinal,
            );
        }
    };

    const verificaNulo = () => {
        return !!lancamentoscontabeisabase_db ? lancamentoscontabeisabase_db.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //   page > 0
    //     ? Math.max(0, (1 + page) * rowsPerPage - lancamentoscontabeisabase_db.length)
    //     : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //----------PAGINATION END--------////


    const handleChange = (event) => {
        setChecked(event.target.checked);
        setFilterIsValido(event.target.checked);
    };

    const handleChangeDataInicial = (newValue) => {
        setFilterDataInicial(newValue);
    };

    const handleChangeDataFinal = (newValue) => {
        setFilterDataFinal(newValue);
    };



    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Lançamento Contábil</Typography>
                <Typography color="text.primary">Informações</Typography>
            </Breadcrumbs>


            <Grid
                container
                spacing={0}
                justifyContent="left"
                style={{ minHeight: "30vh" }}
            >
                <Grid item xs={12}>

                    <Grid
                        container
                        rowSpacing={5}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Número Lançamento"
                                type="text"
                                value={filterCdLancamentoContabil}
                                required={false}
                                onChange={(e) => setFilterCdLancamentoContabil(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Descrição"
                                type="text"
                                value={filterDescLancamento}
                                required={false}
                                onChange={(e) => setFilterDescLancamento(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>

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
                                            value={cdc.cdCentrodeCusto}

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
                                            value={cc.cdContaContabil}

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
                                            value={cco.cdContaComplementar}

                                        >
                                            {cco.desccContaComplementar}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                    </Grid>

                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >


                        <Grid item xs={2}>

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lançamento Válido"
                                size="small"
                                // type="text"
                                checked={checked}
                                value={filterIsValido}
                                required={false}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={3}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DesktopDatePicker
                                    label="Data Inicial"
                                    inputFormat="DD/MM/YYYY"
                                    value={filterDataInicial}
                                    onChange={handleChangeDataInicial}
                                    renderInput={(params) => <TextField
                                        fullWidth
                                        name="filterDataInicial"
                                        size="small"
                                        {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>

                        <Grid item xs={3}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Data Final"
                                    inputFormat="DD/MM/YYYY"
                                    value={filterDataFinal}
                                    onChange={handleChangeDataFinal}
                                    renderInput={(params) => <TextField
                                        fullWidth
                                        name="filterDataFinal"
                                        size="small"
                                        {...params} />}
                                />
                            </LocalizationProvider>


                        </Grid>


                        <Grid item xs={1}>
                            <IconButton
                                color="info"
                                variant="outlined"
                                onClick={() => {
                                    handleFilter();
                                }}
                            >
                                <SearchIcon></SearchIcon>
                            </IconButton>

                            <IconButton
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    handleFilter(1);
                                }}
                            >
                                <RefreshIcon></RefreshIcon>
                            </IconButton>
                        </Grid>

                        <Grid item xs={1}>
                            <Button
                                color="info"
                                variant="outlined"
                                onClick={() => {
                                    navigateToComponent(null);
                                }}
                                startIcon={<AddBoxRoundedIcon />}
                            >
                                NOVO
                            </Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 500 }}
                            size="small"
                            aria-label="custom pagination table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Número Lançamento</TableCell>
                                    <TableCell align="left">Ordem</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="left">Centro de Custo</TableCell>
                                    <TableCell align="left">Conta</TableCell>
                                    <TableCell align="left">Conta Complementar</TableCell>
                                    <TableCell align="left">Crédito</TableCell>
                                    <TableCell align="left">Débito</TableCell>
                                    <TableCell align="left">Data de Lançamento</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="center" colSpan={2}></TableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {lancamentoscontabeisabase_db && lancamentoscontabeisabase_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? lancamentoscontabeisabase_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : lancamentoscontabeisabase_db
                                        ).map((lancamentocontabil) => (
                                            <TableRow key={lancamentocontabil.id}>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.cdLancamentoContabil}
                                                </TableCell>
                                                <TableCell align="left" width="5%">
                                                    {lancamentocontabil.ordemLancamento}
                                                </TableCell>
                                                <TableCell align="left" width="15%">
                                                    {lancamentocontabil.descLancamento}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.descCentrodeCusto}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.descConta}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.descContaComplementar}
                                                </TableCell>
                                                <TableCell align="left" width="5%">
                                                    {lancamentocontabil.valorCredito}
                                                </TableCell>
                                                <TableCell align="left" width="5%">
                                                    {lancamentocontabil.valorDebito}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.dataSelecionada}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {lancamentocontabil.status}
                                                </TableCell>

                                                {/* 
                                                <TableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableEdit}
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(lancamentocontabil.id);
                                                        }}
                                                    >
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                </TableCell> */}
                                                <TableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableDelete || !lancamentocontabil.isValido}
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
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeLancamentoContabilError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeLancamentoContabil);
                                                                        handleExcluir(lancamentocontabil);
                                                                    }
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
                            </>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={5}
                                        count={verificaNulo()}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label": "Linhas por Página",
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default GridLancamentoContabil;
