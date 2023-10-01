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
  Typography,
  FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import {
  msgAtencao,
  msgCadPessoaSuccess,
  msgCadSuccess,
  msgErroCpfCnpjRepetido,
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
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../../commons/GridCommons";
import { confirmaEmail } from "../../../commons/ConfirmaEmail";
import { cnpj } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import { isEligible } from "../../../../util/utils";


const CadastroPJ = (props) => {
  const { pessoajuridica, representanteslegais, salvar, limpar, deleterl, addrl, representanteslegaisoptions, enderecodb } = props;
  const navigate = useNavigate();

  const navigateToComponent = (e) => {
    e.preventDefault();
    formik.resetForm();
    limpar();
    navigate("/cadastro/pessoas", { state: { value: 1 } });    
  };


  useEffect(() => {

    if (pessoajuridica) {
      setCnpjValue(pessoajuridica.cnpj)
      setCdEndereco(pessoajuridica.cdEndereco)
    }

  }, [pessoajuridica]);



  const [cnpjValue, setCnpjValue] = useState('');
  const [cnpjError, setCnpjError] = useState('');

  function handleCnpjChange(event) {
    const value = event.target.value;
    setCnpjValue(value);
  }


  const handleExcluirRL = (rl) => {
    deleterl(rl);
  };

  const addRepresentanteLegal = () => {

    if (selectRepresentanteLegal.id !== undefined) {
      if (pessoajuridica) {
        addrl(selectRepresentanteLegal, pessoajuridica.id, representanteslegais);
      } else {
        addrl(selectRepresentanteLegal, null, representanteslegais);
      }
    }


  };


  const [selectRepresentanteLegal, setSelectRepresentanteLegal] = useState({});

  const changeRepresentante = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRepresentanteLegal(value);
  };


  const [cdEndereco, setCdEndereco] = useState('');

  const validaCnpjRepetido = (cnpjValue) => {
    const pessoaJuridicaStorage = JSON.parse(localStorage.getItem("pessoajuridica_db"));
    const selectPessoaJuridica = pessoaJuridicaStorage?.filter((pj) => pj.cnpj === cnpjValue);
    return selectPessoaJuridica[0] && !isEligible(pessoajuridica.id);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pessoajuridica || initialValuesPJ,
    onSubmit: (values) => {

      values.cnpj = cnpjValue.replace(/[^a-zA-Z0-9]/g, '');
      let itemsEndereco = enderecodb;
      itemsEndereco = itemsEndereco?.filter((item) => item.cdEndereco === cdEndereco);
      values.enderecoCompleto = itemsEndereco[0].enderecoCompleto;
      values.cdEndereco = cdEndereco;


      if (!cnpj.isValid(cnpjValue)) {
        setCnpjError('CNPJ inválido!');
      } else {
        setCnpjError('');

        if (!confirmaEmail(values.emailContato)) {
          Swal.fire({
            icon: "error",
            title: msgAtencao,
            text: msgErroValidateEmail,
          });
          
        } else if (validaCnpjRepetido(values.cnpj)) {
          Swal.fire({
            icon: "error",
            title: msgAtencao,
            text: msgErroCpfCnpjRepetido,
          });
        }
         else {
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
      }
    },
  });



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
            <InputMask
              id="cnpj" type="text"
              value={cnpjValue}
              mask="99.999.999/9999-99"
              onChange={handleCnpjChange}
            >

              {(inputProps) => <TextField
                name="cnpj"
                size="small"
                fullWidth
                label="CNPJ"
                required
                {...inputProps}
              />}

            </InputMask>
            {cnpjError && <FormHelperText error>{cnpjError}</FormHelperText>}
          </Grid>

        </Grid>


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-controlled-open-select-label">Endereço</InputLabel>
              <Select
                fullWidth
                size="small"
                name="endereco"
                label="Endereço"
                labelId="select-label-id"
                id="select-label-id"
                required
                value={cdEndereco}
                onChange={(e) => setCdEndereco(e.target.value)}

              >
                {enderecodb.map((e) => (
                  <MenuItem
                    key={e.id}
                    value={e.cdEndereco}

                  >
                    {e.enderecoCompleto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>



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
                    <StyledTableCell align="center">ID</StyledTableCell>
                    <StyledTableCell align="left">Representante Legal</StyledTableCell>
                    <StyledTableCell align="right" colSpan={2}></StyledTableCell>
                  </TableRow>
                </TableHead>

                <>
                  {representanteslegais && representanteslegais.length > 0 && (
                    <TableBody>
                      {representanteslegais.map((rl) => (
                        <StyledTableRow key={rl.id}>
                          <StyledTableCell align="center" width="10%">
                            {rl.id}
                          </StyledTableCell>
                          <StyledTableCell align="left" width="40%">
                            {rl.nomeRepresentante}
                          </StyledTableCell>

                          <StyledTableCell width="5%" align="right">
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
                          </StyledTableCell>
                        </StyledTableRow>
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
              onClick={(e) => {
                navigateToComponent(e);
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
