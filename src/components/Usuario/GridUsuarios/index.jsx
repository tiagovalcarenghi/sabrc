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
    Button, Grid, TableHead, TextField, Typography, FormControl,
    InputLabel,
    MenuItem,
    Select,
    Breadcrumbs,
} from "@mui/material";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { userOptions } from "../../../util/Usuarios/constants";
import { msgAtencao, msgExcludeUser, msgExcludeUserError, msgExcludeUserErrorSame, msgSuccessExcludeUser } from "../../../util/applicationresources";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../commons/GridCommons";


const GridUsuarios = (props) => {
    const { users_db, deleteusuario, filter } = props;

    const [filterNameUser, setFilterNameUser] = useState("");
    const [filterEmail, setFilterEmail] = useState("");
    const [filterTipoUser, setFilterTipoUser] = useState("");

    const handleExcluir = (u) => {
        deleteusuario(u);
    };


    const navigate = useNavigate();

    const navigateToComponent = (id) => {
        navigate("/cadastro/cadusuarios", { state: { id: id } });
    };

    const handleFilter = (f) => {
        if (f) {
            filter(null);
            setFilterNameUser("");
            setFilterEmail("");
            setFilterTipoUser("");

        } else {
            filter(
                filterNameUser,
                filterEmail,
                filterTipoUser,
            );
        }
    };

    const verificaNulo = () => {
        return !!users_db ? users_db.length : 0;
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



    const validaExclusao = (usuario, tipoValida) => {

        switch (tipoValida) {
            case 1:
                if (usuario.tipoUser === "ADMIN") {

                    const vusuario = JSON.parse(localStorage.getItem("users_db"));
                    const verificaQtdeAdministradores = vusuario?.filter(
                        (user) => user.tipoUser === "ADMIN"
                    );

                    return verificaQtdeAdministradores.length > 1 ? true : false;

                } else {
                    return true;
                };


            case 2:
                const usuariov = JSON.parse(localStorage.getItem("user_storage"));
                return usuariov.nameUser === usuario.nameUser ? false : true;


            default: break;
        }

    };


    return (
        <>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Usuários</Typography>
                <Typography color="text.primary">Informações</Typography>
            </Breadcrumbs>


            <Grid
                container
                spacing={0}
                justifyContent="left"
                style={{ minHeight: "30vh", padding: "20px 0px 0px 0px" }}
            >
                <Grid item xs={12}>


                    {/* <Typography>Pesquisar Dados:</Typography> */}

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
                                label="Nome Usuário"
                                type="text"
                                value={filterNameUser}
                                required={false}
                                onChange={(e) => setFilterNameUser(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Email"
                                type="text"
                                value={filterEmail}
                                required={false}
                                onChange={(e) => setFilterEmail(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={3}>

                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-controlled-open-select-label">Tipo de Usuário</InputLabel>
                                <Select
                                    fullWidth
                                    size="small"
                                    name="filterTipoUser"
                                    label="Tipo de Usuário"
                                    labelId="select-label-id"
                                    id="select-label-id"
                                    value={filterTipoUser}
                                    onChange={(e) => setFilterTipoUser(e.target.value)}

                                >
                                    <MenuItem value={""}>SELECIONAR</MenuItem>
                                    {userOptions.map((e) => (
                                        <MenuItem
                                            key={e.id}
                                            value={e.tipoUser}
                                        >
                                            {e.tipoUser}
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
                                    <StyledTableCell align="left">Usuário</StyledTableCell>
                                    <StyledTableCell align="left">Email</StyledTableCell>
                                    <StyledTableCell align="center">Tipo de Usuário</StyledTableCell>
                                    <StyledTableCell align="right" colSpan={2}></StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <>
                                {users_db && users_db.length > 0 && (
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? users_db.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            : users_db
                                        ).map((usuario) => (
                                            <StyledTableRow key={usuario.id}>
                                                <StyledTableCell align="left" width="25%">
                                                    {usuario.nameUser}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" width="30%">
                                                    {usuario.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" width="15%">
                                                    {usuario.tipoUser}
                                                </StyledTableCell>


                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            navigateToComponent(usuario.id);
                                                        }}
                                                    >
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell width="5%" align="right">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: msgExcludeUser,
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Sim",
                                                                cancelButtonText: "Não",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    if (!validaExclusao(usuario, 1)) {
                                                                        Swal.fire(msgAtencao, msgExcludeUserError);
                                                                    } else if (!validaExclusao(usuario, 2)) {
                                                                        Swal.fire(msgAtencao, msgExcludeUserErrorSame);
                                                                    } else {
                                                                        Swal.fire(msgAtencao, msgSuccessExcludeUser);
                                                                        handleExcluir(usuario);
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
                                        rowsPerPageOptions={[25, 50, 100]}
                                        colSpan={4}
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

export default GridUsuarios;
