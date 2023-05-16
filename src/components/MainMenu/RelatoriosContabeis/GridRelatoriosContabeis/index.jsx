import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBR from 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../commons/GridCommons";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BackupTableIcon from '@mui/icons-material/BackupTable';



const GridRelatoriosContabeis = (props) => {
    const { lancamentocontabeisall, filter, centrosdecusto, contas, contascomplementares } = props;

    const [filterCdLancamentoContabil, setFilterCdLancamentoContabil] = useState("");
    const [filterDescLancamento, setFilterDescLancamento] = useState("");
    const [filterCdCentrodeCusto, setFilterCdCentrodeCusto] = useState("");
    const [filterCdConta, setFilterCdConta] = useState("");
    const [filterCdContaComplementar, setFilterCdContaComplementar] = useState("");
    const [filterIsValido, setFilterIsValido] = useState("");
    const [filterDataInicial, setFilterDataInicial] = useState(dayjs());
    const [filterDataFinal, setFilterDataFinal] = useState(dayjs());
    const [checked, setChecked] = useState(false);



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
        return !!lancamentocontabeisall ? lancamentocontabeisall.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Relatórios</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Relatórios Contábeis</Typography>
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

                        <Grid item xs={6}>
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

                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={ptBR}>

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

                        <Grid item xs={2}>

                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={ptBR}>
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

                    </Grid>


                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >

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

                        <Grid item xs={3}>

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lançamentos Válidos"
                                size="small"
                                // type="text"
                                checked={checked}
                                value={filterIsValido}
                                required={false}
                                onChange={handleChange}
                            />

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



                        <Grid item xs={2}>



                            <Grid item>
                                <Button
                                    color="warning"
                                    variant="outlined"
                                    type="submit"
                                    onClick={() => {
                                        Swal.fire({
                                            icon: "info",
                                            title: "ATENÇÃO",
                                            text: "RELATORIOS CONTÁBEIS serãop gerados pelo banco de dados portanto a geração dos lançamentos não entrará no front-end",
                                        });
                                    }}
                                    startIcon={<AppRegistrationIcon />}
                                >
                                    BUSCAR DADOS
                                </Button>
                            </Grid>

                        </Grid>


                        <Grid item xs={2}>



                            <Grid item>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={() => {
                                        Swal.fire({
                                            icon: "info",
                                            title: "ATENÇÃO",
                                            text: "RELATORIOS CONTÁBEIS serãop gerados pelo banco de dados portanto a geração dos lançamentos não entrará no front-end",
                                        });
                                    }}
                                    startIcon={<PictureAsPdfIcon />}
                                >
                                    EXPORTAR PDF
                                </Button>
                            </Grid>



                        </Grid>

                        <Grid item xs={2}>


                            <Grid item>
                                <Button
                                    color="success"
                                    variant="outlined"
                                    onClick={() => {
                                        Swal.fire({
                                            icon: "info",
                                            title: "ATENÇÃO",
                                            text: "RELATORIOS CONTÁBEIS serãop gerados pelo banco de dados portanto a geração dos lançamentos não entrará no front-end",
                                        });
                                    }}
                                    startIcon={<BackupTableIcon />}
                                >
                                    EXPORTAR XLS
                                </Button>


                            </Grid>

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
                                    <StyledTableCell align="center">Lançamento</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                    <StyledTableCell align="left">Centro de Custo</StyledTableCell>
                                    <StyledTableCell align="left">Conta</StyledTableCell>
                                    <StyledTableCell align="left">Conta Complementar</StyledTableCell>
                                    <StyledTableCell align="center">Crédito</StyledTableCell>
                                    <StyledTableCell align="center">Débito</StyledTableCell>
                                    <StyledTableCell align="center">Data de Lançamento</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {lancamentocontabeisall && lancamentocontabeisall.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? lancamentocontabeisall.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : lancamentocontabeisall
                                        ).map((lancamentocontabil) => (
                                            <StyledTableRow key={lancamentocontabil.id}>
                                                <StyledTableCell align="center" width="10%">
                                                    {lancamentocontabil.cdLancamentoContabil}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="28%">
                                                    {lancamentocontabil.descLancamento}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="13%">
                                                    {lancamentocontabil.descCentrodeCusto}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="13%">
                                                    {lancamentocontabil.descConta}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="13%">
                                                    {lancamentocontabil.descContaComplementar}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="6%">
                                                    {lancamentocontabil.valorCredito}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="6%">
                                                    {lancamentocontabil.valorDebito}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="10%">
                                                    {lancamentocontabil.dataSelecionada}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="3%">
                                                    {lancamentocontabil.status}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                )}
                            </>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        colSpan={9}
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

export default GridRelatoriosContabeis;
