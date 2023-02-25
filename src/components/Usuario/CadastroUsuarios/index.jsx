import {
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Breadcrumbs,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialUsuarios, userOptions } from "../../../util/Usuarios/constants";
import { msgAtencao, msgCadSuccess, msgCadUserSuccess, msgErroValidateEmail } from "../../../util/applicationresources";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";



const CadastroUsuarios = (props) => {
    const { usuario, salvar, limpar } = props;
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: usuario || initialUsuarios,
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
                    text: msgCadUserSuccess,
                });

                salvar(values);
                formik.resetForm();
                navigate("/cadastro/usuarios");
            }
        },
    });

    const confirmaEmail = (email) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailformat.test(email);
    };


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={formik.handleSubmit}>


            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Usuários</Typography>
                <Typography color="text.primary">Cadastro</Typography>
            </Breadcrumbs>

            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px",
                    margin: "10px 10px 10px 10px",
                }}
            >

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="nameUser"
                            label="Usuário"
                            value={formik.values.nameUser}
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


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Tipo de Usuário</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="tipoUser"
                                label="Tipo de Usuário"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.tipoUser}
                                onChange={formik.handleChange}

                            >
                                {userOptions.map((e) => (
                                    <MenuItem
                                        key={e.id}
                                        value={e.tipoUser}
                                    >
                                        {e.tipoUser}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>


                    <Grid item xs={4}>

                        <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                fullWidth
                                label="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                            />
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
                            to="/cadastro/usuarios"
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

export default CadastroUsuarios;
