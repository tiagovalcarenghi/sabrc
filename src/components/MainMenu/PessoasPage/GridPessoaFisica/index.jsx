import React, { useState } from "react";
import {
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

const GridPessoaFisica = (props) => {
  const {
    pessoafisica_db,
    deletePessoaFisica,
    filter,
    disableDelete,
    disableEdit,
  } = props;

  const [filterNomeCompleto, setFilterNomeCompleto] = useState("");

  const handleExcluir = (user) => {
    deletePessoaFisica(user);
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
        style={{ minHeight: "30vh", margin: "15px 0px 0px 0px" }}
      >
        <Grid item xs={11}>
          <form>
            <TextField
              size="small"
              label="Pesquisa por nome"
              type="text"
              value={filterNomeCompleto}
              required={false}
              onChange={(e) => setFilterNomeCompleto(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleFilter();
              }}
            >
              Procurar
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                handleFilter(1);
              }}
            >
              Limpar
            </Button>
          </form>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome Completo</TableCell>
                  <TableCell>Telefone Principal</TableCell>
                  <TableCell>enderecoCompleto</TableCell>
                  <TableCell align="center" colSpan={2}></TableCell>
                </TableRow>
              </TableHead>

              <>
                {pessoafisica_db && pessoafisica_db.length > 0 && (
                  <TableBody>
                    {pessoafisica_db.map((pessoafisica) => (
                      <TableRow key={pessoafisica.id}>
                        <TableCell width="25%">
                          {pessoafisica.nomeCompleto}
                        </TableCell>
                        <TableCell width="25%">
                          {pessoafisica.telefone}
                        </TableCell>
                        <TableCell width="25%">
                          {pessoafisica.enderecoCompleto}
                        </TableCell>
                        <TableCell width="5%" align="center">
                          <Button
                            disabled={disableEdit}
                            color="primary"
                            onClick={() => {
                              navigateToComponent(pessoafisica.id);
                            }}
                          >
                            Editar
                          </Button>
                        </TableCell>
                        <TableCell width="5%" align="center">
                          <Button
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
                                  if (validaExclusao()) {
                                    Swal.fire(atencao, excludeUserError);
                                  } else {
                                    Swal.fire(atencao, successExcludeUser);
                                    handleExcluir(pessoafisica);
                                  }
                                }
                              });
                            }}
                          >
                            Deletar
                          </Button>
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
