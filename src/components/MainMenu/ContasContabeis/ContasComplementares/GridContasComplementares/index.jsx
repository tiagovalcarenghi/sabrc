import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TableHead, TextField, Typography, Breadcrumbs } from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { msgAtencao, msgExcludeContaC, msgExcludeContaCError, msgSuccessExcludeContaC } from "../../../../../util/applicationresources";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../../commons/GridCommons";
import { validaExclusao } from "../../../../commons/ValidaExclusao";

const GridContasComplementares = (props) => {
    const { contascomplementares_db, deletecontacomplementar, filter, disableDelete, } = props;

    const [filterDesContaComplementar, setFilterDesContaComplementar] = useState("");
    const [checked, setChecked] = useState(false);
    const [filterIsBanco, setFilterIsBanco] = useState(false);

    const handleExcluir = (conta) => {
        deletecontacomplementar(conta);
    };



    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/cadastro/contascontabeis/cadcontascomplementares", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterDesContaComplementar("");
            setFilterIsBanco(false);
            setChecked(false);
        } else {
            filter(
                filterDesContaComplementar,
                filterIsBanco
            );
        }
    };

    const verificaNulo = () => {
        return !!contascomplementares_db ? contascomplementares_db.length : 0;
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
        setFilterIsBanco(event.target.checked);
    };

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Contábeis</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contas Complementares</Typography>
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
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Nome Conta Complementar"
                                type="text"
                                value={filterDesContaComplementar}
                                required={false}
                                onChange={(e) => setFilterDesContaComplementar(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Banco"
                                size="small"
                                type="text"
                                checked={checked}
                                value={filterIsBanco}
                                required={false}
                                onChange={handleChange}
                            />

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
                                    <StyledTableCell align="center">Banco</StyledTableCell>
                                    <StyledTableCell align="right" colSpan={2}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {contascomplementares_db && contascomplementares_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? contascomplementares_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : contascomplementares_db
                                        ).map((contacomplementar) => (
                                            <StyledTableRow key={contacomplementar.id}>
                                                <StyledTableCell align="left" width="40%">
                                                    {contacomplementar.desccContaComplementar}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="15%">
                                                    {contacomplementar.isBanco === false ? "Não" : "Sim"}
                                                </StyledTableCell>


                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        disabled={disableDelete}
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeContaC,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeContaCError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeContaC);
                                                                        handleExcluir(contacomplementar);
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
                                        rowsPerPageOptions={[10, 25, 50]}
                                        colSpan={3}
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

export default GridContasComplementares;
