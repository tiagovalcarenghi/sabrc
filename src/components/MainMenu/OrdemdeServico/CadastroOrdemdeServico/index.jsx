import {
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TableHead,
    Breadcrumbs,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { msgCadSuccess, msgInsertOSSucesso, msgLancamentoError, msgSaveOSError } from "../../../../util/applicationresources";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { isEligible } from "../../../../util/utils";
import { initialOrdemdeServicoBase } from "../../../../util/MainMenu/OS/constants";


const CadastroOrdemdeServico = (props) => {

    const { ordemdeservico, contratantenomes, endereco, salvar, limpar } = props;
    const [filterContratante, setFilterContratante] = useState({});
    const [filterEndereco, setEndereco] = useState({});
    const [valorServico, setValorServico] = useState(0);


    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: ordemdeservico || initialOrdemdeServicoBase,
        onSubmit: (values) => {


            if (!Object.values(values).every(x => x === null || x === '')) {

                Swal.fire({
                    icon: "success",
                    title: msgCadSuccess,
                    text: msgInsertOSSucesso,
                });

                values.cdEndereco = isEligible(filterEndereco.cdNomes) ? filterEndereco.cdNomes : null;
                values.enderecoCompleto = isEligible(filterEndereco.nome) ? filterEndereco.nome : '';
                values.valorServico = isEligible(valorServico) ? Number(valorServico) : Number(0);
                values.cdContratante = isEligible(filterContratante.id) ? filterContratante.id : null;
                values.nomeContratante = isEligible(filterContratante.nome) ? filterContratante.nome : null;

                salvar(values);
                formik.resetForm();
                limpar();
                navigate("/operacoes/ordemdeservico");

            } else {

                Swal.fire({
                    icon: "error",
                    title: msgLancamentoError,
                    text: msgSaveOSError,
                });
            }

        }


    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Ordem de Serviço</Typography>
                <Typography color="text.primary">Cadastrar</Typography>
            </Breadcrumbs>

            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px 0px 0px 0px",
                    margin: "10px 10px 10px 10px",
                }}
            >

                <Chip label="CONTRATANTE" />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Contratante</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterContratante"
                                label="Contratante"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterContratante}
                                onChange={(e) => setFilterContratante(e.target.value)}
                            >

                                {contratantenomes.map((nome) => (
                                    <MenuItem
                                        key={nome.id}
                                        value={nome}

                                    >
                                        {nome.nome}
                                    </MenuItem>
                                ))}


                            </Select>
                        </FormControl>
                    </Grid>

                    

                </Grid>




                <Chip label="DETALHES" />
                <Divider />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Endereço</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterEndereco"
                                label="Endereço"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterEndereco}
                                onChange={(e) => setEndereco(e.target.value)}
                            >
                                {endereco.map((nome) => (
                                    <MenuItem
                                        key={nome.id}
                                        value={nome}

                                    >
                                        {nome.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                    <Grid item xs={12}>
                        <TextField
                            rows={12}
                            multiline
                            size="small"
                            fullWidth
                            name="descServico"
                            label="Descrição do Serviço"
                            value={formik.values.descServico}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={6}>
                        <CurrencyTextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="valorServico"
                            label="Valor do Serviço"
                            value={valorServico}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setValorServico(value)}
                        />
                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>
                        <TextField
                            rows={12}
                            multiline
                            size="small"
                            fullWidth
                            name="detalhesNegociacao"
                            label="Detalhes da Negociação"
                            value={formik.values.detalhesNegociacao}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
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

                                setFilterContratante({});
                                setEndereco({});
                                setValorServico(0);

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
                            to="/operacoes/ordemdeservico"
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

export default CadastroOrdemdeServico;
