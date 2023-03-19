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
import EditIcon from '@mui/icons-material/Edit';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { msgAtencao, msgExcludeContrato, msgExcludeContratoError, msgExcludeContratoSuccess, msgValidaContrato, msgValidaContratoError, msgValidaContratoSuccess } from "../../../../util/applicationresources";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../commons/GridCommons";


const GridContratoCompraeVenda = (props) => {
    const { contratocompraevendagrid_db, deletacontratocompraevenda, validacontratocompraevenda, filter, disableDelete, disableEdit, disableValida } = props;

    const [filterCdContratoCompraeVenda, setFilterCdContratoCompraeVenda] = useState("");
    const [filterEndereco, setFilterEndereco] = useState("");


    const handleExcluir = (contrato) => {
        deletacontratocompraevenda(contrato);
    };

    const handleValidar = (contrato) => {
        validacontratocompraevenda(contrato);
    };

    const validaExclusao = () => {
        const usuario = JSON.parse(localStorage.getItem("user_storage"));
        if (usuario) {
            return usuario.tipoUser === "ADMIN" ? true : false;
        }
    };

    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/operacoes/cadcontratocompraevenda", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterCdContratoCompraeVenda("");
            setFilterEndereco("");

        } else {
            filter(
                filterCdContratoCompraeVenda,
                filterEndereco
            );
        }
    };

    const verificaNulo = () => {
        return !!contratocompraevendagrid_db ? contratocompraevendagrid_db.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contrato de Compra e Venda</Typography>
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
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Número Lançamento"
                                type="text"
                                value={filterCdContratoCompraeVenda}
                                required={false}
                                onChange={(e) => setFilterCdContratoCompraeVenda(e.target.value)}
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


                        <Grid item xs={3}>
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
                                    <StyledTableCell align="left">Número do Contrato</StyledTableCell>
                                    <StyledTableCell align="left">Endereço</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {contratocompraevendagrid_db && contratocompraevendagrid_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? contratocompraevendagrid_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : contratocompraevendagrid_db
                                        ).map((contrato) => (
                                            <StyledTableRow key={contrato.id}>
                                                <StyledTableCell align="left" width="5%">
                                                    {contrato.cdContratoCompraeVenda}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="80%">
                                                    {contrato.enderecoCompleto}
                                                </StyledTableCell>

                                                <StyledTableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableValida || !contrato.isValido || contrato.status !== "RASCUNHO"}
                                                        color="success"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgValidaContrato,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgValidaContratoError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgValidaContratoSuccess);
                                                                        handleValidar(contrato);
                                                                    }
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        <FactCheckIcon></FactCheckIcon>
                                                    </IconButton>
                                                </StyledTableCell>


                                                <StyledTableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableEdit || !contrato.isValido || contrato.status !== "RASCUNHO"}
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(contrato.id);
                                                        }}
                                                    >
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                </StyledTableCell>

                                                <StyledTableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableDelete || !contrato.isValido}
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeContrato,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeContratoError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgExcludeContratoSuccess);
                                                                        handleExcluir(contrato);
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

export default GridContratoCompraeVenda;
