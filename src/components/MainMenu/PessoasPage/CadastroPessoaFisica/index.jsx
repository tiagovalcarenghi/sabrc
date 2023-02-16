import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  TextField,
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
        <Grid
          style={{
            display: "grid",
            gridRowGap: "20px",
          }}
        >
          <Grid item xs={4}>
            <TextField
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
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              name="password"
              label="Senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              type="password"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              name="confirmNewPassword"
              label="Confirma Senha"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              required
              type="password"
            />
          </Grid>*/}
        </Grid>

        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item>
            <Button variant="contained" color="success" type="submit">
              Salvar
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={(e) => {
                e.preventDefault();
                formik.resetForm();
                limpar();
              }}
              variant={"outlined"}
            >
              Limpar Dados
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" component={Link} to="/cadastro/pessoas">
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CadastroPF;
