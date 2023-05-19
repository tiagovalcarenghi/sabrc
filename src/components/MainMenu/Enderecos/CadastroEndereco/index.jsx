import { Breadcrumbs, Button, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Modal, Box } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { initialValuesEnderecos, ufOptions } from "../../../../util/MainMenu/Enderecos/constants";
import { msgCadPessoaSuccess, msgCadSuccess } from "../../../../util/applicationresources";
import InputMask from 'react-input-mask';
import { useState } from "react";
import axios from "axios";
import { isEligible } from "../../../../util/utils";
import { CommonLoading } from 'react-loadingg';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const CadastroEndereco = (props) => {
    const { endereco, salvar, limpar } = props;
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const [disableLogradouro, setDisableLogradouro] = useState(true);
    const [disableCep, setDisableCep] = useState(false);

    const [cepValue, setCepValue] = useState('');
    const [tipo, setTipo] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');


    function handleInputChangeNumero(event) {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setNumero(value);
        // use o valor "value" como desejar...
    }




    function handleCepChange(event) {
        const value = event.target.value;
        setCepValue(value);
    }

    const refreshCep = () => {
        setCepValue('');
        setDisableCep(false);
    }



    const buscaCep = () => {

        setLoading(true);
        setOpen(true);


        axios.get(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then(response => {

                if (response.data.erro === true) {

                    Swal.fire({
                        icon: "error",
                        title: "ERRO",
                        text: "Digite um CEP válido",
                    });

                } else {




                    if (!isEligible(response.data.logradouro)) {

                        Swal.fire({
                            icon: "info",
                            title: "Atenção",
                            text: "Endereço não encontrado, favor digitar manualmente.",
                        });

                        setDisableLogradouro(false);
                    } else {
                        setDisableLogradouro(true);
                        //95590000
                        //59015450
                        setTipo(response.data.logradouro.split(" ")[0]);
                        const logra = response.data.logradouro.split(" ");
                        setLogradouro(logra.slice(1).join(" "));
                        setBairro(response.data.bairro);

                    }

                    setLocalidade(response.data.localidade);
                    setUf(response.data.uf);


                }
                setLoading(false);
                setOpen(false);
                setDisableCep(true);


            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setOpen(false);

                Swal.fire({
                    icon: "error",
                    title: "ERRO",
                    text: "Digite um CEP válido",
                });
            });



    }

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: endereco || initialValuesEnderecos,
        onSubmit: (values) => {


            values.tipo = tipo;
            values.logradouro = logradouro;
            values.cep = cepValue;
            values.bairro = bairro;
            values.localidade = localidade;
            values.uf = uf;
            values.numero = numero;
            values.enderecoCompleto = tipo + ' ' + logradouro + validaNumero(numero) + validaComplemento(values.complemento);




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


    const validaNumero = (numero) => {
        return isEligible(numero) ? ', ' + numero : '';
    }

    const validaComplemento = (complemento) => {
        return isEligible(complemento) ? ' - ' + complemento : '';
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Endereços</Typography>
                <Typography color="text.primary">Cadastro</Typography>
            </Breadcrumbs>


            <Modal open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // bgcolor: 'background.paper',
                        // boxShadow: 24,
                        // p: 4,
                        width: '250px',
                        height: '200px'
                    }}
                >


                    <Button sx={{ marginLeft: '35%' }} onClick={handleClose}>
                        Fechar
                    </Button>

                    {loading ? (
                        <CommonLoading size={30} color="#000000" />
                    ) : (
                        <>
                        </>
                    )}
                </Box>



            </Modal>

            <Grid
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px 0px 0px 0px",
                    margin: "10px 10px 10px 10px",
                }}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                    <Grid item xs={2}>
                        <InputMask
                            id="cep" type="text"
                            value={cepValue}
                            mask="99999-999"
                            onChange={handleCepChange}
                            disabled={disableCep}
                        >

                            {(inputProps) => <TextField
                                name="cep"
                                size="small"
                                fullWidth
                                label="CEP"
                                required

                                {...inputProps}

                            />}

                        </InputMask>


                    </Grid>



                    <Grid item xs={2}>

                        <Button
                            size="medium"
                            color="info"
                            variant="outlined"
                            onClick={(e) => {
                                buscaCep();
                            }}
                            startIcon={<SearchIcon />}
                        >
                            BUSCAR CEP
                        </Button>

                        <IconButton
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                refreshCep();
                            }}
                        >
                            <RefreshIcon></RefreshIcon>
                        </IconButton>

                    </Grid>

                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={2}>
                        <TextField
                            size="small"
                            fullWidth
                            name="tipo"
                            label="Tipo Endereço"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                            disabled={disableLogradouro}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            size="small"
                            fullWidth
                            name="logradouro"
                            label="Logradouro"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            required
                            disabled={disableLogradouro}
                        />
                    </Grid>


                    <Grid item xs={2}>
                        <TextField
                            size="small"
                            fullWidth
                            name="bairro"
                            label="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            required
                            disabled={disableLogradouro}

                        />
                    </Grid>



                    <Grid item xs={2}>
                        <TextField
                            size="small"
                            fullWidth
                            name="rg"
                            label="Número"
                            value={numero}
                            onChange={handleInputChangeNumero}
                            inputProps={{ inputMode: 'numeric' }}
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
                            value={localidade}
                            onChange={(e) => setLocalidade(e.target.value)}
                            required
                            disabled
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
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                                disabled

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


        </form >
    );
};

export default CadastroEndereco;
