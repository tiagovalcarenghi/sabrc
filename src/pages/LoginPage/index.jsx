import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../assets/login/css/login.css";
import { useNavigate } from "react-router-dom";
import { ptBR } from "@mui/material/locale";

//Banner SAB:
import BannerSab from "../../assets/login/images/banner-SAB.png"; // Import using relative path
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Container, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { msgAtencao, msgPreencherCampos } from "../../util/applicationresources";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255, 152, 0)",
      contrastText: "#fff"
    },
  },
  ptBR,
  typography: {

    button: { // Here is where you can customise the button
      fontSize: 14,
      fontWeight: 'bold',
      color: "blue"
    },
  },
});

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      Swal.fire({
        icon: "error",
        title: msgAtencao,
        text: msgPreencherCampos,
      });
      return;
    }

    const res = login(usuario, password);

    if (res) {
      Swal.fire({
        icon: "error",
        title: msgAtencao,
        text: res,
      });
      return;
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              className="gridBanner"
              item
              xs={false}
              sm={4}
              md={2}
              sx={{
                backgroundImage: `url(${BannerSab})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: '50%',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}

              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    label="Login"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Box
                    sx={{
                      display: "grid",
                      alignItems: "center",
                    }}
                  >
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Grid>
        </ThemeProvider>
      </>
    </form>
  );
};

export default LoginPage;
