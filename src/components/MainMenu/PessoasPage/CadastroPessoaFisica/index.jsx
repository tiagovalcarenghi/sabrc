import {
  Breadcrumbs,
  Button,
  FormControl,
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
  msgErroValidateEmail,
} from "../../../../util/applicationresources";
import Swal from "sweetalert2";
import { estadoCivilOptions, initialValuesPF } from "../../../../util/MainMenu/PessoasPage/constants";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ufOptions } from "../../../../util/MainMenu/Enderecos/constants";
import { confirmaEmail } from "../../../commons/ConfirmaEmail";


const CadastroPF = (props) => {
  const { pessoafisica, salvar, limpar } = props;
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: pessoafisica || initialValuesPF,
    onSubmit: (values) => {
      if (!confirmaEmail(values.email)) {
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

        var numeroadress = isBlank(values.numero) ? "" : ", " + values.numero;
        values.enderecoCompleto = values.logradouro + numeroadress;
        salvar(values);
        formik.resetForm();
        navigate("/cadastro/pessoas");
      }
    },
  });

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
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

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="ci"
              label="RG"
              value={formik.values.ci}
              onChange={formik.handleChange}
            />
          </Grid>

        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="cnh"
              label="CNH"
              value={formik.values.cnh}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="docExtra"
              label="Documento Extra"
              value={formik.values.docExtra}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="cpf"
              label="CPF"
              value={formik.values.cpf}
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
              name="telefone"
              label="Telefone Principal"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              fullWidth
              name="telefoneAdicional"
              label="Telefone Principal"
              value={formik.values.telefoneAdicional}
              onChange={formik.handleChange}
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
              label="Cidade"
              value={formik.values.localidade}
              onChange={formik.handleChange}
              required
            />

          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-controlled-open-select-label">Estado</InputLabel>
              <Select
                fullWidth
                size="small"
                name="uf"
                label="Estado"
                labelId="select-label-id"
                id="select-label-id"
                value={formik.values.uf}
                onChange={formik.handleChange}
                required

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

export default CadastroPF;
