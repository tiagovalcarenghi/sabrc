import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TableHead, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { tipoContaContabilOptions, tipoSaldoOptions } from "../../../../../util/MainMenu/ContasContabeis/Contas/contants";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Breadcrumbs
} from "@mui/material";
import { msgAtencao, msgExcludeConta, msgExcludeContaError, msgSuccessExcludeConta } from "../../../../../util/applicationresources";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../../commons/GridCommons";
import { validaExclusao } from "../../../../commons/ValidaExclusao";


const GridContas = (props) => {
    const { contascontabeis_db, deleteconta, filter, disableDelete, disableEdit } = props;

    const [filterDesContaContabil, setfilterDesContaContabil] = useState("");
    const [filterCdTipoConta, setfilterCdTipoConta] = useState("");
    const [filterCdTipoSaldo, setfilterCdTipoSaldo] = useState("");

    const handleExcluir = (conta) => {
        deleteconta(conta);
    };



    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/cadastro/contascontabeis/cadcontas", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setfilterDesContaContabil("");
            setfilterCdTipoConta("");
            setfilterCdTipoSaldo("");
        } else {
            filter(
                filterDesContaContabil,
                filterCdTipoConta,
                filterCdTipoSaldo
            );
        }
    };

    const verificaNulo = () => {
        return !!contascontabeis_db ? contascontabeis_db.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0
    //         ? Math.max(0, (1 + page) * rowsPerPage - contascontabeis_db.length)
    //         : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //----------PAGINATION END--------////

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Contábeis</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas</Typography>
                <Typography color="text.primary">Informações</Typography>
            </Breadcrumbs>


            <Grid
                container
                spacing={0}
                justifyContent="left"
                style={{ minHeight: "30vh", padding: "20px 0px 0px 0px" }}
            >
                <Grid item xs={12}>


                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Nome Conta"
                                type="text"
                                value={filterDesContaContabil}
                                required={false}
                                onChange={(e) => setfilterDesContaContabil(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={3}>

                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-controlled-open-select-label">Tipo Conta</InputLabel>
                                <Select
                                    fullWidth
                                    size="small"
                                    name="filterCdTipoConta"
                                    label="Tipo Conta"
                                    labelId="select-label-id"
                                    id="select-label-id"
                                    value={filterCdTipoConta}
                                    onChange={(e) => setfilterCdTipoConta(e.target.value)}

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

                        <Grid item xs={3}>

                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-controlled-open-select-label">Tipo Saldo</InputLabel>
                                <Select
                                    fullWidth
                                    size="small"
                                    name="filterCdTipoSaldo"
                                    label="Tipo Conta"
                                    labelId="select-label-id"
                                    id="select-label-id"
                                    value={filterCdTipoSaldo}
                                    onChange={(e) => setfilterCdTipoSaldo(e.target.value)}

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
                                    <StyledTableCell align="left">Nome Conta</StyledTableCell>
                                    <StyledTableCell align="left">Tipo Conta</StyledTableCell>
                                    <StyledTableCell align="center">Saldo</StyledTableCell>
                                    <StyledTableCell align="center">Tipo Saldo</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {contascontabeis_db && contascontabeis_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? contascontabeis_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : contascontabeis_db
                                        ).map((contacontabil) => (
                                            <StyledTableRow key={contacontabil.id}>
                                                <StyledTableCell align="left" width="30%">
                                                    {contacontabil.desContaContabil}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="18%">
                                                    {contacontabil.descTipoConta}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="22%">
                                                    {contacontabil.saldo}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="15%">
                                                    {contacontabil.descTipoSaldo}
                                                </StyledTableCell>
                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        disabled={disableEdit}
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(contacontabil.id);
                                                        }}
                                                    >
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        disabled={disableDelete}
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeConta,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeContaError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeConta);
                                                                        handleExcluir(contacontabil);
                                                                    }
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

export default GridContas;
