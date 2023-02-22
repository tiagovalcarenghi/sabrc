import {
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesEnderecos, ufOptions } from "../../../../util/MainMenu/Enderecos/constants";
import { msgCadPessoaSuccess, msgCadSuccess } from "../../../../util/applicationresources";


const CadastroEndereco = (props) => {
    const { endereco, salvar, limpar } = props;
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: endereco || initialValuesEnderecos,
        onSubmit: (values) => {
            Swal.fire({
                icon: "success",
                title: msgCadSuccess,
                text: msgCadPessoaSuccess,
            });

            salvar(values);
            formik.resetForm();
            navigate("/cadastro/enderecos");

        },
    });

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
                    <Chip label="Cadastro Endereços" />
                </Stack>


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
                            to="/cadastro/enderecos"
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

export default CadastroEndereco;
