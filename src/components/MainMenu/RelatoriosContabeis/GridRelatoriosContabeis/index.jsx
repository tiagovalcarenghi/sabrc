import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Button, Grid, TableHead, TextField, FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
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
import TableViewIcon from '@mui/icons-material/TableView';
import { formatCurrency } from "../../../commons/FormatoMonetarioBr";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';


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
    const idTable = document.getElementById('myTable');



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
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 25));
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
                        spacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >

                        <Grid item>
                            <Button
                                color="warning"
                                variant="outlined"
                                type="submit"
                                onClick={() => {
                                    handleFilter();
                                }}
                                startIcon={<AppRegistrationIcon />}
                            >
                                Buscar
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                color="info"
                                variant="outlined"
                                type="submit"
                                onClick={() => {
                                    handleFilter();
                                }}
                                startIcon={<RefreshIcon />}
                            >
                                Limpar
                            </Button>
                        </Grid>




                        <Grid item>
                            <IconButton
                                color="error"
                                variant="outlined"
                                onClick={() => {
                                    
                                            // var doc = new jsPDF('p', 'pt');
                                            // var res = doc.autoTableHtmlToJson(idTable);
                                            // doc.autoTable(res.columns, res.data);
                                            // doc.save("table.pdf");

                                            const unit = 'pt';
                                            const size = 'A4'; // Use A4 or any other size you need
                                            const orientation = 'landscape'; // 'portrait' or 'landscape'
                                            const marginLeft = 20;
                                            const doc = new jsPDF(orientation, unit, size);
                                            const title = '';
                                        
                                            const headers = [];
                                            const data = [];
                                        
                                            // Extract header data
                                            idTable.querySelectorAll('thead th').forEach((th) => {
                                              headers.push(th.innerText);
                                            });
                                        
                                            // Extract table data
                                            idTable.querySelectorAll('tbody tr').forEach((row) => {
                                              const rowData = [];
                                              row.querySelectorAll('td').forEach((td) => {
                                                rowData.push(td.innerText);
                                              });
                                              data.push(rowData);
                                            });
                                        
                                            doc.text(title, marginLeft, 40);
                                            doc.autoTable({
                                              startY: 50,
                                              head: [headers],
                                              body: data,
                                              columnStyles: {
                                                // Use your logic to set the column widths based on the table structure.
                                                // For simplicity, we'll set all columns to a fixed width of 100 for this example.
                                                0: { columnWidth: 70 },
                                                1: { columnWidth: 200 },
                                                2: { columnWidth: 80 },
                                                3: { columnWidth: 100 },
                                                4: { columnWidth: 80 },
                                                5: { columnWidth: 70 },
                                                6: { columnWidth: 70 },
                                                7: { columnWidth: 60 },
                                                8: { columnWidth: 50 },
                                                // Add more column styles as needed
                                              },
                                            });
                                        
                                            doc.save('dados.pdf');
                                    
                                }}

                            >
                                <PictureAsPdfIcon />
                            </IconButton>


                        </Grid>



                        <Grid item>
                            <IconButton
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                    const workBook = XLSX.utils.table_to_book(idTable);
                                    XLSX.writeFile(workBook, 'RelatorioContábil.xlsx');
                                }}
                            >
                                <TableViewIcon />
                            </IconButton>
                        </Grid>

                    </Grid>


                    <TableContainer component={Paper}>
                        <Table id="myTable"
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
                                                    {formatCurrency(lancamentocontabil.valorCredito)}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="6%">
                                                    {formatCurrency(lancamentocontabil.valorDebito)}
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
                                        rowsPerPageOptions={[25, 50, 100]}
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
