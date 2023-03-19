import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TableHead, TextField } from "@mui/material";
import Swal from "sweetalert2";
import {
  msgAtencao,
  msgExcludePessoaError,
  msgExcludeUser,
  msgSuccessExcludePessoa,
} from "../../../../util/applicationresources";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../commons/GridCommons";


const GridPessoaFisica = (props) => {
  const { pessoafisica_db, deletepf, filter, disableDelete, disableEdit } =
    props;

  const [filterNomeCompleto, setFilterNomeCompleto] = useState("");
  const [filterTelefonePrincipal, setFilterTelefonePrincipal] = useState("");
  const [filterEnderecoCompleto, setFilterEnderecoCompleto] = useState("");

  const handleExcluir = (user) => {
    deletepf(user);
  };

  const validaExclusao = () => {
    const usuario = JSON.parse(localStorage.getItem("user_storage"));
    if (usuario) {
      return usuario.tipoUser === "ADMIN" ? true : false;
    }
  };

  const navigate = useNavigate();

  const navigateToComponent = (id) => {
    navigate("/cadastro/pessoas/pf", { state: { id: id } });
  };

  const handleFilter = (f) => {
    if (f) {
      filter(null);
      setFilterNomeCompleto("");
      setFilterTelefonePrincipal("");
      setFilterEnderecoCompleto("");
    } else {
      filter(
        filterNomeCompleto,
        filterTelefonePrincipal,
        filterEnderecoCompleto
      );
    }
  };

  const verificaNulo = () => {
    return !!pessoafisica_db ? pessoafisica_db.length : 0;
  };

  //----------PAGINATION START--------////
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0
  //     ? Math.max(0, (1 + page) * rowsPerPage - pessoafisica_db.length)
  //     : 0;

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
                label="Nome"
                type="text"
                value={filterNomeCompleto}
                required={false}
                onChange={(e) => setFilterNomeCompleto(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                label="Telefone"
                type="text"
                value={filterTelefonePrincipal}
                required={false}
                onChange={(e) => setFilterTelefonePrincipal(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                label="Endereço"
                type="text"
                value={filterEnderecoCompleto}
                required={false}
                onChange={(e) => setFilterEnderecoCompleto(e.target.value)}
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
                  <StyledTableCell align="left">Nome Completo</StyledTableCell>
                  <StyledTableCell align="left">Telefone Principal</StyledTableCell>
                  <StyledTableCell align="left">Endereço Completo</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                </TableRow>
              </TableHead>

              <>
                {pessoafisica_db && pessoafisica_db.length > 0 && (
                  <TableBody>
                    {(rowsPerPage > 0
                      ? pessoafisica_db.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : pessoafisica_db
                    ).map((pessoafisica) => (
                      <StyledTableRow key={pessoafisica.id}>
                        <StyledTableCell align="left" width="27%">
                          {pessoafisica.nomeCompleto}
                        </StyledTableCell>
                        <StyledTableCell align="left" width="20%">
                          {pessoafisica.telefone}
                        </StyledTableCell>
                        <StyledTableCell align="left" width="43%">
                          {pessoafisica.enderecoCompleto}
                        </StyledTableCell>
                        <StyledTableCell width="5%" align="right">
                          <IconButton
                            disabled={disableEdit}
                            color="primary"
                            onClick={() => {
                              navigateToComponent(pessoafisica.id);
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
                                title: msgExcludeUser,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Sim",
                                cancelButtonText: "Não",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  if (!validaExclusao()) {
                                    Swal.fire(msgAtencao, msgExcludePessoaError);
                                  } else {
                                    Swal.fire(msgAtencao, msgSuccessExcludePessoa);
                                    handleExcluir(pessoafisica);
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

export default GridPessoaFisica;
