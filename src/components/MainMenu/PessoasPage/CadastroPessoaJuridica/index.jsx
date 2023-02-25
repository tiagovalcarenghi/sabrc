import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableHead,
  Breadcrumbs,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import {
  msgAtencao,
  msgCadPessoaSuccess,
  msgCadSuccess,
  msgErroValidateEmail,
  msgExcludeRepresentanteLegal,
  msgSuccessExcludeRepresentanteLegal
} from "../../../../util/applicationresources";
import Swal from "sweetalert2";
import { initialValuesPJ } from "../../../../util/MainMenu/PessoasPage/constants";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const CadastroPJ = (props) => {
  const { pessoajuridica, representanteslegais, salvar, limpar, deleterl, addrl, representanteslegaisoptions } = props;
  const navigate = useNavigate();

  const navigateToComponent = () => {
    navigate("/cadastro/pessoas", { state: { value: 1 } });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pessoajuridica || initialValuesPJ,
    onSubmit: (values) => {
      if (!confirmaEmail(values.emailContato)) {
        Swal.fire({
          icon: "error",
          title: msgAtencao,
          text: msgErroValidateEmail,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: msgCadSuccess,
          text: msgCadPessoaSuccess,
        });
        values.enderecoCompleto = values.logradouro + values.numero;
        salvar(values);
        formik.resetForm();
        navigate("/cadastro/pessoas", { state: { value: 1 } });
      }
    },
  });

  const confirmaEmail = (emailContato) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(emailContato);
  };


  const handleExcluirRL = (rl) => {
    deleterl(rl);
  };

  const addRepresentanteLegal = () => {
    if (selectRepresentanteLegal.id != undefined) {
      if (pessoajuridica) {
        addrl(selectRepresentanteLegal, pessoajuridica.id);
      } else {
        addrl(selectRepresentanteLegal, null);
      }
    }


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
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Pessoa Jurídica</Typography>
        <Typography color="text.primary">Cadastrar</Typography>
      </Breadcrumbs>

      <Grid
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px 0px 0px 0px",
          margin: "10px 10px 10px 10px",
        }}
      >

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

                {representanteslegaisoptions && representanteslegaisoptions.length > 0 && (

                  representanteslegaisoptions.map((rl) => (
                    <MenuItem
                      key={rl.id}
                      value={rl}

                    >
                      {rl.nomeCompleto}
                    </MenuItem>
                  ))

                )}


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
                  {representanteslegais && representanteslegais.length > 0 && (
                    <TableBody>
                      {representanteslegais.map((rl) => (
                        <TableRow key={rl.id}>
                          <TableCell align="left" width="10%">
                            {rl.id}
                          </TableCell>
                          <TableCell align="left" width="40%">
                            {rl.nomeRepresentante}
                          </TableCell>

                          <TableCell width="5%" align="center">
                            <IconButton
                              color="error"
                              onClick={() => {
                                Swal.fire({
                                  title: msgExcludeRepresentanteLegal,
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Sim",
                                  cancelButtonText: "Não",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire(msgAtencao, msgSuccessExcludeRepresentanteLegal);
                                    handleExcluirRL(rl);
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
              onClick={() => {
                navigateToComponent();
              }}
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
