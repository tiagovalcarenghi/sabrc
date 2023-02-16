import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  atencao,
  cadSuccess,
  cadUserSuccess,
  erroValidateEmail,
} from "../../../../util/applicationresources";
import Swal from "sweetalert2";
import { initialValuesPF } from "../../../../util/MainMenu/PessoasPage/constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
        salvar(values);
        formik.resetForm();
        navigate("/cadastro/pessoas");
      }
    },
  });

  const confirmaEmail = (email) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  };

  //   const confimarPassEqual = (password, confirmNewPassword) => {
  //     return password === confirmNewPassword;
  //   };

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
          <Chip label="Cadastro Pessoa Física" />
          {/* <Chip label="Chip Outlined" variant="outlined" /> */}
        </Stack>
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
              required
            />
          </Grid>

          {/* <Grid item xs={4}>
            <FormControl fullWidth required>
              <InputLabel id="select-label">Tipo de Usuário</InputLabel>
              <Select
                name="tipoUser"
                label="Tipo de Usuário"
                labelId="select-label-id"
                id="select-label-id"
                value={formik.values.tipoUser}
                onChange={formik.handleChange}
              >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"USER"}>USER</MenuItem>
              </Select>
            </FormControl>
          </Grid>*/}
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item>
            <Button
              color="success"
              variant="outlined"
              type="submit"
              startIcon={<SaveIcon />}
            >
              LIMPAR
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
