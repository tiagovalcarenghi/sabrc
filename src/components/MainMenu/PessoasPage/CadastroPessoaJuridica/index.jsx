import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  atencao,
  cadSuccess,
  cadUserSuccess,
  erroValidateEmail,
  excludeUser,
  successExcludeUser,
} from "../../../../util/applicationresources";
import Swal from "sweetalert2";
import { initialValuesPJ } from "../../../../util/MainMenu/PessoasPage/constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createRepresentantesLegaisOptions } from "../../../../contexts/storage";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React, { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const CadastroPJ = (props) => {
  const { pessoajuridica, salvar, limpar, deleterl, addrl } = props;
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pessoajuridica || initialValuesPJ,
    onSubmit: (values) => {
      if (!confirmaEmail(values.emailContato)) {
        Swal.fire({
          icon: "error",
          title: atencao,
          text: erroValidateEmail,
        });
        // } else if (
        //   !confimarPassEqual(values.password, values.confirmNewPassword)
        // ) {
        //   Swal.fire({
        //     icon: "error",
        //     title: atencao,
        //     text: passwordEqualError,
        //   });
      } else {
        Swal.fire({
          icon: "success",
          title: cadSuccess,
          text: cadUserSuccess,
        });
        values.enderecoCompleto = values.logradouro + values.numero;
        salvar(values);
        formik.resetForm();
        navigate("/cadastro/pessoas");
      }
    },
  });

  const confirmaEmail = (emailContato) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(emailContato);
  };

  //   const confimarPassEqual = (password, confirmNewPassword) => {
  //     return password === confirmNewPassword;
  //   };


  const handleExcluirRL = (rl) => {
    deleterl(rl);
  };

  const addRepresentanteLegal = (rl) => {
    addrl(rl);
  };


  const [selectRepresentanteLegal, setSelectRepresentanteLegal] = React.useState({});

  const changeRepresentante = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRepresentanteLegal(value);
  };


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 10px 10px 10px",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip label="Cadastro Pessoa Jurídica" />
          {/* <Chip label="Chip Outlined" variant="outlined" /> */}
        </Stack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="nomeEmpresarial"
              label="Nome Empresarial"
              value={formik.values.nomeEmpresarial}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="emailContato"
              label="Email Contato"
              type="email"
              value={formik.values.emailContato}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="cnpj"
              label="CNPJ"
              value={formik.values.cnpj}
              onChange={formik.handleChange}
              required
            />
          </Grid>

        </Grid>


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="logradouro"
              label="Logradouro"
              value={formik.values.logradouro}
              onChange={formik.handleChange}
              required
            />
          </Grid>


          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="cep"
              label="CEP"
              value={formik.values.cep}
              onChange={formik.handleChange}
              required
            />
          </Grid>


          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="bairro"
              label="Bairro"
              value={formik.values.bairro}
              onChange={formik.handleChange}
              required
            />
          </Grid>


          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="numero"
              label="Número"
              value={formik.values.numero}
              onChange={formik.handleChange}
              required
            />
          </Grid>


          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="complemento"
              label="Complemento"
              value={formik.values.complemento}
              onChange={formik.handleChange}
            />
          </Grid>

        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="localidade"
              label="Localidade"
              value={formik.values.localidade}
              onChange={formik.handleChange}
              required
            />

          </Grid>

          <Grid item xs={2}>
            <TextField
              size="small"
              fullWidth
              name="uf"
              label="UF"
              value={formik.values.uf}
              onChange={formik.handleChange}
              required
            />

          </Grid>

          <Grid item xs={4}>


            <FormControl fullWidth size="small">
              <InputLabel id="demo-controlled-open-select-label">Representante Legal</InputLabel>
              <Select
                fullWidth
                size="small"
                name="selectRepresentanteLegal"
                label="Representante Legal"
                labelId="select-label-id"
                id="select-label-id"
                value={selectRepresentanteLegal}
                onChange={changeRepresentante}
                required

              >
                {createRepresentantesLegaisOptions.map((rl) => (
                  <MenuItem
                    key={rl.id}
                    value={rl}

                  >
                    {rl.nomeRepresentante}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={4}>

            <Button
              color="info"
              variant="outlined"
              onClick={() => {
                addRepresentanteLegal();
              }}
              startIcon={<AddBoxRoundedIcon />}
            >
              Adicionar Represetante
            </Button>


          </Grid>


        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={12}>


            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                size="small"
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Representante Legal</TableCell>
                    <TableCell align="center" colSpan={2}></TableCell>
                  </TableRow>
                </TableHead>

                <>
                  {pessoajuridica.representantesLegais && pessoajuridica.representantesLegais.length > 0 && (
                    <TableBody>
                      {pessoajuridica.representantesLegais.map((representantesLegais) => (
                        <TableRow key={representantesLegais.id}>
                          <TableCell align="left" width="10%">
                            {representantesLegais.id}
                          </TableCell>
                          <TableCell align="left" width="40%">
                            {representantesLegais.nomeRepresentante}
                          </TableCell>

                          <TableCell width="5%" align="center">
                            <IconButton
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
                                    Swal.fire(atencao, successExcludeUser);
                                    handleExcluirRL(representantesLegais);
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
                </></Table></TableContainer>













          </Grid>

        </Grid>

        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item>
            <Button
              color="success"
              variant="outlined"
              type="submit"
              startIcon={<SaveIcon />}
            >
              SALVAR
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="info"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                formik.resetForm();
                limpar();
              }}
              startIcon={<RefreshIcon />}
            >
              LIMPAR
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              component={Link}
              to="/cadastro/pessoas"
              startIcon={<ArrowBackIcon />}
            >
              VOLTAR
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CadastroPJ;
