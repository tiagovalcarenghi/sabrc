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
    Button, Grid, TableHead, TextField
} from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../commons/GridCommons";
import { validaExclusao } from "../../../commons/ValidaExclusao";
import { msgAtencao, msgExcludeOS, msgExcludeOSError, msgExcludeOSSuccess } from "../../../../util/applicationresources";


const GridOrdemdeServico = (props) => {
    const { ordemdeservico_db, deletaordemdeservico, filter, disableDelete } = props;

    const [filterOrdemdeServico, setFilterOrdemdeServico] = useState("");
    const [filterEndereco, setFilterEndereco] = useState("");


    const handleExcluir = (os) => {
        deletaordemdeservico(os);
    };

    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/operacoes/cadordemdeservico", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterOrdemdeServico("");
            setFilterEndereco("");

        } else {
            filter(
                filterOrdemdeServico,
                filterEndereco
            );
        }
    };

    const verificaNulo = () => {
        return !!ordemdeservico_db ? ordemdeservico_db.length : 0;
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


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Ordem de Serviço</Typography>
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
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Número Ordem de Serviço"
                                type="text"
                                value={filterOrdemdeServico}
                                required={false}
                                onChange={(e) => setFilterOrdemdeServico(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Endereço"
                                type="text"
                                value={filterEndereco}
                                required={false}
                                onChange={(e) => setFilterEndereco(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={4}>
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
                                    <StyledTableCell align="center">Ordem de Serviço</StyledTableCell>
                                    <StyledTableCell align="left">Endereço</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {ordemdeservico_db && ordemdeservico_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? ordemdeservico_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : ordemdeservico_db
                                        ).map((os) => (
                                            <StyledTableRow key={os.id}>
                                                <StyledTableCell align="center" width="10%">
                                                    {os.cdOrdemdeServico}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="70%">
                                                    {os.enderecoCompleto}
                                                </StyledTableCell>

                                                <StyledTableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableDelete || !os.isValido}
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeOS,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeOSError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgExcludeOSSuccess);
                                                                        handleExcluir(os);
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

export default GridOrdemdeServico;
