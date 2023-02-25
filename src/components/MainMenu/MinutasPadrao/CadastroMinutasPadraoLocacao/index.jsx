import { Breadcrumbs, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import { msgCadMinutaPadraoSuccess, msgCadSuccess } from "../../../../util/applicationresources";
import { initialValuesMinutasPadraoLocacao } from "../../../../util/MainMenu/MinutasPadrao/ContratoLocacao/constants";


const CadastroMinutasLocacao = (props) => {
    const { minutaspadraolocacao_db, salvar, disableEdit } = props;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: minutaspadraolocacao_db || initialValuesMinutasPadraoLocacao,
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
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Minutas Padrão</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Locação</Typography>
                <Typography color="text.primary">Editar</Typography>
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

export default CadastroMinutasLocacao;
