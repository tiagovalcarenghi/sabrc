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
import { StyledTableCell, StyledTableRow } from "../../../commons/GridCommons";
import { validaExclusao } from "../../../commons/ValidaExclusao";
import GridFooter from "../../../commons/TableFooter";


const GridContratoLocacao = (props) => {
    const { contratolocacaogrid_db, deletecontratolocacao, validacontratolocacao, filter, disableDelete, disableEdit, disableValida } = props;

    const [filterCdContratoLocacao, setFilterCdContratoLocacao] = useState("");
    const [filterEndereco, setFilterEndereco] = useState("");


    const handleExcluir = (contrato) => {
        deletecontratolocacao(contrato);
    };

    const handleValidar = (contrato) => {
        validacontratolocacao(contrato);
    };

    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/operacoes/cadcontratolocacao", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterCdContratoLocacao("");
            setFilterEndereco("");

        } else {
            filter(
                filterCdContratoLocacao,
                filterEndereco
            );
        }
    };


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contrato de Locação</Typography>
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
                                value={filterCdContratoLocacao}
                                required={false}
                                onChange={(e) => setFilterCdContratoLocacao(e.target.value)}
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
                                    <StyledTableCell align="center">Número do Contrato</StyledTableCell>
                                    <StyledTableCell align="left">Endereço</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {contratolocacaogrid_db && contratolocacaogrid_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? contratolocacaogrid_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : contratolocacaogrid_db
                                        ).map((contrato) => (
                                            <StyledTableRow key={contrato.id}>
                                                <StyledTableCell align="center" width="12%">
                                                    {contrato.cdContratoLocacao}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="68%">
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

                            {/* tablefooter */}
                            <GridFooter db={contratolocacaogrid_db} />

                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default GridContratoLocacao;
