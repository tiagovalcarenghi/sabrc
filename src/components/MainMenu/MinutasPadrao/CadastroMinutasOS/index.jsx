import {
    Button,
    Grid,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import { msgCadMinutaPadraoSuccess, msgCadSuccess } from "../../../../util/applicationresources";
import { initialValuesMinutasPadraoOS } from "../../../../util/MainMenu/MinutasPadrao/ContratoOS/constants";


const CadastroMinutasOS = (props) => {
    const { minutaspadraoos_db, salvar, disableEdit } = props;


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: minutaspadraoos_db || initialValuesMinutasPadraoOS,
        onSubmit: (values) => {
            Swal.fire({
                icon: "success",
                title: msgCadSuccess,
                text: msgCadMinutaPadraoSuccess,
            });


            salvar(values);
            formik.resetForm();

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
                    <Chip label="Cadastro Minuta Padrão de Ordem de Serviço" />
                </Stack>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            rows={12}
                            multiline
                            size="small"
                            fullWidth
                            name="texto"
                            label="Texto Minuta Padrão"
                            value={formik.values.texto}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>

                </Grid>




                <Grid container spacing={2} justifyContent="flex-start">
                    <Grid item>
                        <Button
                            disabled={disableEdit}
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

export default CadastroMinutasOS;
