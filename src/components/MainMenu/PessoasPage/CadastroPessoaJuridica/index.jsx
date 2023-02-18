import {
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
import { initialValuesPJ } from "../../../../util/MainMenu/PessoasPage/constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CadastroPJ = (props) => {
  const { pessoajuridica, salvar, limpar } = props;
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
