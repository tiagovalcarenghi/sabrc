import {
    Breadcrumbs,
    Button,
    Grid,
    Typography,
    Select,
    MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { initialValuesAre } from "../../../../util/MainMenu/Are/constants";
import Swal from "sweetalert2";

const GeraAre = () => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValuesAre,
        onSubmit: (values) => {

            Swal.fire({
                icon: "success",
                title: "ATENÇÃO",
                text: "ARE será gerado pelo banco de dados portanto a geração dos lançamentos não entrará no front-end",
            });

        }
    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">ARE</Typography>
                <Typography color="text.primary">Gerar</Typography>
            </Breadcrumbs>


            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px 0px 0px 0px",
                    margin: "10px 10px 10px 10px",
                }}
            >

                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                        margin: "0px 0px 10px 0px",
                    }}
                >

                    <Grid item xs={2}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Selecione o Mês</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="mes"
                                label="Selecione o Mês"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.mes}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'01'}>Janeiro</MenuItem>
                                <MenuItem value={'02'}>Fevereiro</MenuItem>
                                <MenuItem value={'03'}>Março</MenuItem>
                                <MenuItem value={'04'}>Abril</MenuItem>
                                <MenuItem value={'05'}>Maio</MenuItem>
                                <MenuItem value={'06'}>Junho</MenuItem>
                                <MenuItem value={'07'}>Julho</MenuItem>
                                <MenuItem value={'08'}>Agosto</MenuItem>
                                <MenuItem value={'09'}>Setembro</MenuItem>
                                <MenuItem value={'10'}>Outubro</MenuItem>
                                <MenuItem value={'11'}>Novembro</MenuItem>
                                <MenuItem value={'12'}>Dezembro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Selecione o Ano</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="ano"
                                label="Selecione o Ano"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.ano}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'2022'}>2022</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>


                        <Grid container spacing={2} justifyContent="flex-start">
                            <Grid item>
                                <Button
                                    color="success"
                                    variant="outlined"
                                    type="submit"
                                    startIcon={<SaveIcon />}
                                >
                                    GERAR ARE
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </form>
    );
};

export default GeraAre;
