import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import { initialPerfil } from "../../util/Perfil/contants";
import { msgAlterSuccess, msgAtencao, msgEditPerfilSuccess, msgPasswordEqualError } from "../../util/applicationresources";
import { Navigate } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


const EditaPerfil = (props) => {
    const { perfil_db, salvar } = props;


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialPerfil,
        onSubmit: (values) => {
            if (!confimarPassEqual(values.newPassword, values.confirmNewPassword)) {
                Swal.fire({
                    icon: "error",
                    title: msgAtencao,
                    text: msgPasswordEqualError,
                });
            } else {

                Swal.fire({
                    icon: "success",
                    title: msgAlterSuccess,
                    text: msgEditPerfilSuccess,
                });

                salvar(values);
                formik.resetForm();
                Navigate("/*");
            }
        }
    });

    const confimarPassEqual = (newPassword, confirmNewPassword) => {
        return newPassword === confirmNewPassword;
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
                <Stack direction="row" spacing={3}>
                    <Chip label="Editar Perfil" />
                    <Chip label={"Tipo de Usuário:" + perfil_db.tipoUser} />
                </Stack>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>

                        <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Nova Senha</InputLabel>
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
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                required
                            />
                        </FormControl>

                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirmar Nova Senha"
                            value={formik.values.confirmNewPassword}
                            onChange={formik.handleChange}
                            required
                            type="password"
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


                </Grid>
            </Grid>
        </form>
    );
};

export default EditaPerfil;
