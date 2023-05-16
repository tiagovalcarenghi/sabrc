import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Grid, TableHead, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { msgAtencao, msgExcludeCdC, msgExcludeCdCError, msgSuccessExcludeCdC } from "../../../../../util/applicationresources";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../../commons/GridCommons";
import { validaExclusao } from "../../../../commons/ValidaExclusao";


const GridCentrodeCusto = (props) => {
    const { centrodecusto_db, deletecentrodecusto, filter, disableDelete, disableEdit } = props;

    const [filterDescCentrodeCusto, setfilterDescCentrodeCusto] = useState("");

    const handleExcluir = (cdc) => {
        deletecentrodecusto(cdc);
    };



    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/cadastro/contascontabeis/cadcentrodecusto", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setfilterDescCentrodeCusto("");
        } else {
            filter(
                filterDescCentrodeCusto
            );
        }
    };

    const verificaNulo = () => {
        return !!centrodecusto_db ? centrodecusto_db.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0
    //         ? Math.max(0, (1 + page) * rowsPerPage - centrodecusto_db.length)
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
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Centro de Custo</Typography>
                <Typography color="text.primary">Informações</Typography>
            </Breadcrumbs>


            <Grid
                container
                spacing={0}
                justifyContent="left"
                style={{
                    padding: "20px 0px 0px 0px",
                }}
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
                                label="Nome Centro de Custo"
                                type="text"
                                value={filterDescCentrodeCusto}
                                required={false}
                                onChange={(e) => setfilterDescCentrodeCusto(e.target.value)}
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
                                    <StyledTableCell align="left">Id</StyledTableCell>
                                    <StyledTableCell align="left">Centro de Custo</StyledTableCell>
                                    <StyledTableCell align="right" colSpan={2}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {centrodecusto_db && centrodecusto_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? centrodecusto_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : centrodecusto_db
                                        ).map((centrodecusto) => (
                                            <StyledTableRow key={centrodecusto.id}>
                                                <StyledTableCell align="left" width="15%">
                                                    {centrodecusto.id}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="45%">
                                                    {centrodecusto.descCentrodeCusto}
                                                </StyledTableCell>

                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        disabled={disableEdit}
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(centrodecusto.id);
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
                                                                title: msgExcludeCdC,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeCdCError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeCdC);
                                                                        handleExcluir(centrodecusto);
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

export default GridCentrodeCusto;
