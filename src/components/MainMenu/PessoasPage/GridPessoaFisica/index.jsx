import React, { useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import {
  atencao,
  excludeUser,
  excludeUserError,
  successExcludeUser,
} from "../../../../util/applicationresources";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const GridPessoaFisica = (props) => {
  const { pessoafisica_db, deletepf, filter, disableDelete, disableEdit } =
    props;

  const [filterNomeCompleto, setFilterNomeCompleto] = useState("");

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
    } else {
      filter(filterNomeCompleto);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        style={{ minHeight: "30vh", margin: "5px 0px 0px 0px" }}
      >
        <Grid item xs={11}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: "0px 0px 5px 0px",
            }}
          >
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
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0px 0px 10px 0px",
            }}
          >
            <TextField
              size="small"
              label="Nome Completo"
              type="text"
              value={filterNomeCompleto}
              required={false}
              onChange={(e) => setFilterNomeCompleto(e.target.value)}
            />

            <Button
              color="info"
              variant="outlined"
              onClick={() => {
                handleFilter();
              }}
              startIcon={<SearchIcon />}
            >
              PESQUISAR
            </Button>

            <Button
              color="warning"
              variant="outlined"
              onClick={() => {
                handleFilter(1);
              }}
              startIcon={<RefreshIcon />}
            >
              LIMPAR
            </Button>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome Completo</TableCell>
                  <TableCell>Telefone Principal</TableCell>
                  <TableCell>Endereço Completo</TableCell>
                  <TableCell align="center" colSpan={2}></TableCell>
                </TableRow>
              </TableHead>

              <>
                {pessoafisica_db && pessoafisica_db.length > 0 && (
                  <TableBody>
                    {pessoafisica_db.map((pessoafisica) => (
                      <TableRow key={pessoafisica.id}>
                        <TableCell width="22%">
                          {pessoafisica.nomeCompleto}
                        </TableCell>
                        <TableCell width="15%">
                          {pessoafisica.telefone}
                        </TableCell>
                        <TableCell width="38%">
                          {pessoafisica.enderecoCompleto}
                        </TableCell>
                        <TableCell width="5%" align="center">
                          <IconButton
                            disabled={disableEdit}
                            color="primary"
                            onClick={() => {
                              navigateToComponent(pessoafisica.id);
                            }}
                          >
                            <EditIcon></EditIcon>
                          </IconButton>
                        </TableCell>
                        <TableCell width="5%" align="center">
                          <IconButton
                            disabled={disableDelete}
                            color="primary"
                            onClick={() => {
                              Swal.fire({
                                title: excludeUser,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Sim",
                                cancelButtonText: "Não",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  if (!validaExclusao()) {
                                    Swal.fire(atencao, excludeUserError);
                                  } else {
                                    Swal.fire(atencao, successExcludeUser);
                                    handleExcluir(pessoafisica);
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
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default GridPessoaFisica;
