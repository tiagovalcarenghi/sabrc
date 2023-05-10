import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  msgAtencao,
  msgCadPessoaSuccess,
  msgCadSuccess,
  msgErroValidateDocumento,
  msgErroValidateEmail,
} from "../../../../util/applicationresources";
import Swal from "sweetalert2";
import { estadoCivilOptions, initialValuesPF } from "../../../../util/MainMenu/PessoasPage/constants";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ufOptions } from "../../../../util/MainMenu/Enderecos/constants";
import { confirmaEmail } from "../../../commons/ConfirmaEmail";
import { useState } from "react";
import { isEligible } from "../../../../util/utils";
import { cpf } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';




const CadastroPF = (props) => {
  const { pessoafisica, salvar, limpar } = props;
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pessoafisica || initialValuesPF,
    onSubmit: (values) => {

      values.cpf = cpfValue.replace(/[^a-zA-Z0-9]/g, '');
      values.cnh = cnhValue;
      values.rg = rgValue;
      values.telefone = telefoneValue;
      values.telefoneAdicional = telefoneAdicionalValue;


      if (!cpf.isValid(cpfValue)) {
        setCpfError('CPF inválido!');
      } else {
        setCpfError('');

        if (!confirmaEmail(values.email)) {
          Swal.fire({
            icon: "error",
            title: msgAtencao,
            text: msgErroValidateEmail,
          });

        } else if ((mostraCnh && !isEligible(values.cnh)) || (mostraRg && !isEligible(values.rg))) {
          Swal.fire({
            icon: "error",
            title: msgAtencao,
            text: msgErroValidateDocumento,
          });

        } else {
          Swal.fire({
            icon: "success",
            title: msgCadSuccess,
            text: msgCadPessoaSuccess,
          });

          values.isAgenteDeNegocio = checked;

          salvar(values);
          formik.resetForm();

          navigate("/cadastro/pessoas");
        }
      }
    },
  });

  const [checked, setChecked] = useState(false);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };



  const [tipoDoc, setTipoDoc] = useState(0);
  const [mostraRg, setMostraRg] = useState(true);
  const [mostraCnh, setMostraCnh] = useState(false);

  const handleDocumento = (event) => {
    setTipoDoc(event.target.value);

    if (event.target.value === 1) {
      setMostraRg(true);
      setMostraCnh(false);
    } else {
      setMostraRg(false);
      setMostraCnh(true);
    }
  };

  const [cpfValue, setCpfValue] = useState(pessoafisica.cpf);
  const [cpfError, setCpfError] = useState('');

  function handleCpfChange(event) {
    const value = event.target.value;
    setCpfValue(value);
  }


  const [cnhValue, setCnhValue] = useState('');
  function handleInputChangeCnh(event) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setCnhValue(value);
    // use o valor "value" como desejar...
  }


  const [rgValue, setRgValue] = useState('');
  function handleInputChangeRg(event) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setRgValue(value);
    // use o valor "value" como desejar...
  }


  const [telefoneValue, setTelefoneValue] = useState('');

  function handleTelefoneChange(event) {
    const value = event.target.value;
    setTelefoneValue(value);
  }


  const [telefoneAdicionalValue, setTelefoneAdicionalValue] = useState('');

  function handleTelefoneAdicionalChange(event) {
    const value = event.target.value;
    setTelefoneAdicionalValue(value);
  }





  return (
    <form onSubmit={formik.handleSubmit}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Pessoa Física</Typography>
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
              name="nomeCompleto"
              label="Nome Completo"
              value={formik.values.nomeCompleto}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-controlled-open-select-label">Estado Civil</InputLabel>
              <Select
                fullWidth
                size="small"
                name="cdEstadoCivil"
                label="Estado Civil"
                labelId="select-label-id"
                id="select-label-id"
                value={formik.values.cdEstadoCivil}
                onChange={formik.handleChange}
                required

              >
                {estadoCivilOptions.map((ec) => (
                  <MenuItem
                    key={ec.value}
                    value={ec.value}

                  >
                    {ec.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="profissao"
              label="Profissão"
              value={formik.values.profissao}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="nacionalidade"
              label="Nacionalidade"
              value={formik.values.nacionalidade}
              onChange={formik.handleChange}
              required
            />
          </Grid>



        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="tipodcl">Tipo de Documento:</InputLabel>
              <Select
                labelId="tipodcl"
                id="tipodct"
                value={tipoDoc}
                label="Tipo de Documento:"
                onChange={handleDocumento}

              >
                <MenuItem value={1}>RG</MenuItem>
                <MenuItem value={2}>CNH</MenuItem>
              </Select>
            </FormControl>

          </Grid>


          {mostraCnh ? (
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                name="cnh"
                label="CNH"
                value={cnhValue}
                onChange={handleInputChangeCnh}
                inputProps={{ inputMode: 'numeric' }}
                disabled={!mostraCnh}
              />
            </Grid>
          ) : (
            // Componente oculto
            null
          )}


          {mostraRg ? (
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                name="rg"
                label="RG"
                value={rgValue}
                onChange={handleInputChangeRg}
                inputProps={{ inputMode: 'numeric' }}
                disabled={!mostraRg}
              />
            </Grid>
          ) : (
            // Componente oculto
            null
          )}



        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={4}>
            <InputMask
              id="cpf" type="text"
              value={cpfValue}
              mask="999.999.999-99"
              onChange={handleCpfChange}
            >

              {(inputProps) => <TextField
                name="cpf"
                size="small"
                fullWidth
                label="CPF"
                required
                {...inputProps}
              />}

            </InputMask>
            {cpfError && <FormHelperText error>{cpfError}</FormHelperText>}
          </Grid>

          <Grid item xs={4}>

            <InputMask
              id="telefone" type="text"
              value={telefoneValue}
              mask="(99) 999999999"
              onChange={handleTelefoneChange}
            >

              {(inputProps) => <TextField
                name="telefone"
                size="small"
                fullWidth
                label="Telefone Principal"
                required
                {...inputProps}
              />}

            </InputMask>



          </Grid>

          <Grid item xs={4}>
            <InputMask
              id="telefoneAdicional" type="text"
              value={telefoneAdicionalValue}
              mask="(99) 999999999"
              onChange={handleTelefoneAdicionalChange}
            >

              {(inputProps) => <TextField
                name="telefoneAdicional"
                size="small"
                fullWidth
                label="Telefone Adicional"
                {...inputProps}
              />}

            </InputMask>
          </Grid>

        </Grid>


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          {/* //SELECT ENDEREÇO COMPLETO */}

          <Grid item xs={2}>

            <FormControlLabel
              control={<Checkbox />}
              label="Agente de Negócio"
              size="small"
              type="text"
              checked={checked}
              value={checked}
              onChange={handleChangeCheck}
            />

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
    </form >
  );
};

export default CadastroPF;
