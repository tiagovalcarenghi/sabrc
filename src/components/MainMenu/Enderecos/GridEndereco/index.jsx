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
    Button, Grid, TableHead, TextField, Typography, FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { ufOptions } from "../../../../util/MainMenu/Enderecos/constants";
import { msgAtencao, msgExcludeEndereco, msgExcludeEnderecoCError, msgSuccessExcludeEndereco } from "../../../../util/applicationresources";

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

const GridEndereco = (props) => {
    const { enderecos_db, deleteendereco, filter, disableDelete, disableEdit } = props;

    const [filterLogradouro, setFilterLogradouro] = useState("");
    const [filterCep, setFilterCep] = useState("");
    const [filterBairro, setFilterBairro] = useState("");
    const [filterLocalidade, setFilterLocalidade] = useState("");
    const [filterUf, setFilterUf] = useState("");

    const handleExcluir = (cdc) => {
        deleteendereco(cdc);
    };

    const validaExclusao = () => {
        const usuario = JSON.parse(localStorage.getItem("user_storage"));
        if (usuario) {
            return usuario.tipoUser === "ADMIN" ? true : false;
        }
    };

    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/cadastro/cadenderecos", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterLogradouro("");
            setFilterCep("");
            setFilterBairro("");
            setFilterLocalidade("");
            setFilterUf("");

        } else {
            filter(
                filterLogradouro,
                filterCep,
                filterBairro,
                filterLocalidade,
                filterUf,
            );
        }
    };

    const verificaNulo = () => {
        return !!enderecos_db ? enderecos_db.length : 0;
    };

    //----------PAGINATION START--------////
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0
    //         ? Math.max(0, (1 + page) * rowsPerPage - enderecos_db.length)
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
            <Grid
                container
                spacing={0}
                justifyContent="left"
                style={{ minHeight: "30vh" }}
            >
                <Grid item xs={12}>
                    <Typography>Pesquisar Dados:</Typography>

                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            margin: "0px 0px 10px 0px",
                        }}
                    >
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Logradouro"
                                type="text"
                                value={filterLogradouro}
                                required={false}
                                onChange={(e) => setFilterLogradouro(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="CEP"
                                type="text"
                                value={filterCep}
                                required={false}
                                onChange={(e) => setFilterCep(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Bairro"
                                type="text"
                                value={filterBairro}
                                required={false}
                                onChange={(e) => setFilterBairro(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Cidade"
                                type="text"
                                value={filterLocalidade}
                                required={false}
                                onChange={(e) => setFilterLocalidade(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={2}>

                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-controlled-open-select-label">Estado</InputLabel>
                                <Select
                                    fullWidth
                                    size="small"
                                    name="filterUf"
                                    label="Estado"
                                    labelId="select-label-id"
                                    id="select-label-id"
                                    value={filterUf}
                                    onChange={(e) => setFilterUf(e.target.value)}

                                >
                                    {ufOptions.map((e) => (
                                        <MenuItem
                                            key={e.uf}
                                            value={e.uf}
                                        >
                                            {e.nome}
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
                                    <TableCell align="left">CEP</TableCell>
                                    <TableCell align="left">Logradouro</TableCell>
                                    <TableCell align="left">Número</TableCell>
                                    <TableCell align="left">Complemento</TableCell>
                                    <TableCell align="left">Bairro</TableCell>
                                    <TableCell align="left">Cidade</TableCell>
                                    <TableCell align="left">Estado</TableCell>
                                    <TableCell align="center" colSpan={2}></TableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {enderecos_db && enderecos_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? enderecos_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : enderecos_db
                                        ).map((endereco) => (
                                            <TableRow key={endereco.id}>
                                                <TableCell align="left" width="10%">
                                                    {endereco.cep}
                                                </TableCell>
                                                <TableCell align="left" width="15%">
                                                    {endereco.logradouro}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {endereco.numero}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {endereco.complemento}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {endereco.bairro}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {endereco.localidade}
                                                </TableCell>
                                                <TableCell align="left" width="10%">
                                                    {endereco.uf}
                                                </TableCell>


                                                <TableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableEdit}
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(endereco.id);
                                                        }}
                                                    >
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell width="5%" align="center">
                                                    <IconButton
                                                        disabled={disableDelete}
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeEndereco,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao()) {
                                                                        Swal.fire(msgAtencao, msgExcludeEnderecoCError);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeEndereco);
                                                                        handleExcluir(endereco);
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

export default GridEndereco;
