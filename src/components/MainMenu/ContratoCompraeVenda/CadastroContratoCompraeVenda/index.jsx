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
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { msgAtencao, msgExcludeComprador, msgExcludeCompradorSuccess, msgExcludeHonorario, msgExcludeHonorarioSuccess, msgExcludeVendedor, msgExcludeVendedorSuccess } from "../../../../util/applicationresources";
import { initialContratosdeCompraeVendaBase } from "../../../../util/MainMenu/ContratoCompraeVenda/constants";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { isEligible } from "../../../../util/utils";


const CadastroContratoCompraeVenda = (props) => {

    const { contratocompraevenda, compradoreprocurador, addcompradoreprocurador, deletecompradoreprocurador, vendedoreprocurador, addvendedoreprocurador, deletevendedoreprocurador, honorarioscorretorparceiro, addhonorarios, deletehonorarios, compradorvendedornomes, procuradornomes, endereco, minutaspadraocev_db, salvar, limpar } = props;
    const [filterComprador, setFilterComprador] = useState({});
    const [filterCompradorProcurador, setFilterCompradorProcurador] = useState({});;
    const [filterVendedor, setFilterVendedor] = useState({});;
    const [filterVendedorProcurador, setFilterVendedorProcurador] = useState({});
    const [filterEndereco, setEndereco] = useState({});
    const [filterCorretorParceiro, setFilterCorretorParceiro] = useState({});
    const [honorariosCorretorParceiro, setHonorariosCorretorParceiro] = useState(0);
    const [textoMinuta, setTextoMinuta] = useState('');
    const [radioMinuta, setRadioMinutaValue] = useState();
    const [showMinuta, setShowMinuta] = useState('hidden');
    const [showDisplay, setShowDisplay] = useState('none');
    const [showDisplayPrint, setShowDisplayPrint] = useState('block');
    const [prazoRegularizacao, setPrazoRegularizacao] = useState(dayjs());
    const [valorNegocio, setValorNegocio] = useState(0);
    const [honorariosImobiliaria, setHonorariosImobiliaria] = useState(0);




    const navigate = useNavigate();

    const navigateToComponent = () => {
        navigate("/operacoes/contratocompraevenda", { state: { value: 1 } });
    };


    const handleExcluirCompradoreProcurador = (cp) => {
        deletecompradoreprocurador(cp);
    };


    const handleExcluirVendcedroeProcurador = (vp) => {
        deletevendedoreprocurador(vp);
    };

    const handleExcluirCorretorParceiro = (co) => {
        deletehonorarios(co);
    };



    const addCompradoreProcurador = () => {
        addcompradoreprocurador(filterComprador, filterCompradorProcurador);
    };

    const addVendedoreProcurador = () => {
        addvendedoreprocurador(filterVendedor, filterVendedorProcurador);
    };


    const addCorretorParceiro = () => {

        setHonorariosCorretorParceiro(isEligible(honorariosCorretorParceiro) ? Number(honorariosCorretorParceiro) : Number(0));

        addhonorarios(filterCorretorParceiro, honorariosCorretorParceiro);
    };


    // const validaGridCompradores = () => {

    //     let items = JSON.parse(localStorage.getItem("compradorprocuradoroperacao_db"));
    //     return items.length > 0 ? true : false;

    // }

    // const validaGridVendedores = () => {

    //     let items = JSON.parse(localStorage.getItem("vendedorprocuradoroperacao_db"));
    //     return items.length > 0 ? true : false;

    // }


    // const validaGridHonorarios = () => {

    //     let items = JSON.parse(localStorage.getItem("honorarioscorretorparceirooperacao_db"));
    //     return items.length > 0 ? true : false;

    // }


    const handlePrazoRegularizacao = (newValue) => {
        setPrazoRegularizacao(newValue);
    };


    const handleChangeRadioMinuta = (event) => {
        setRadioMinutaValue(event.target.value);

        if (event.target.value === 'edit') {
            setShowMinuta('visible');
            setShowDisplay('block');
            setShowDisplayPrint('none');
        } else {
            setShowDisplay('none');
            setShowDisplayPrint('block');
            setShowMinuta('hidden');
        }

    };

    const formik = useFormik({

        enableReinitialize: true,
        initialValues: initialContratosdeCompraeVendaBase,
        onSubmit: (values) => {

            //     if (!validaGridOperacoes()) {

            //         Swal.fire({
            //             icon: "error",
            //             title: msgLancamentoError,
            //             text: msgLancamentoSaveError,
            //         });

            //     } else {

            //         if (validaValores()) {

            //             Swal.fire({
            //                 icon: "error",
            //                 title: msgLancamentoError,
            //                 text: msgLancamentoInsertError,
            //             });

            //         } else {

            //             Swal.fire({
            //                 icon: "success",
            //                 title: msgCadSuccess,
            //                 text: msgInsertLancamentoSuccess,
            //             });

            //             values.dataSelecionada = getDateFormat(dataLancamento);

            //             salvar(values);
            //             formik.resetForm();
            //             navigate("/operacoes/lancamentocontabil");

            //         }
            //     }
        }
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contrato de Compra e Venda</Typography>
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

                <Chip label="Promitente Comprador" />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Comprador</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterComprador"
                                label="Comprador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterComprador}
                                onChange={(e) => setFilterComprador(e.target.value)}
                            >

                                {compradorvendedornomes.map((nome) => (
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

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Procurador</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdConta"
                                label="Procurador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCompradorProcurador}
                                onChange={(e) => setFilterCompradorProcurador(e.target.value)}
                            >
                                {procuradornomes.map((nome) => (
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



                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addCompradoreProcurador();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Comprador
                        </Button>


                    </Grid>

                </Grid>



                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>


                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 500 }}
                                size="small"
                                aria-label="custom pagination table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Comprador</TableCell>
                                        <TableCell align="left">Procurador</TableCell>
                                        <TableCell align="center" colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {compradoreprocurador && compradoreprocurador.length > 0 && (
                                        <TableBody>
                                            {compradoreprocurador.map((compradoreproc) => (
                                                <TableRow key={compradoreproc.id}>
                                                    <TableCell align="left" width="30%">
                                                        {compradoreproc.nomeComprador}
                                                    </TableCell>
                                                    <TableCell align="left" width="30%">
                                                        {compradoreproc.nomeProcurador}
                                                    </TableCell>


                                                    <TableCell width="5%" align="center">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: msgExcludeComprador,
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#3085d6",
                                                                    cancelButtonColor: "#d33",
                                                                    confirmButtonText: "Sim",
                                                                    cancelButtonText: "Não",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        Swal.fire(msgAtencao, msgExcludeCompradorSuccess);
                                                                        handleExcluirCompradoreProcurador(compradoreproc);
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <DeleteRoundedIcon></DeleteRoundedIcon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>
                    </Grid>

                </Grid>

                <Chip label="Promitente Vendedor" />
                <Divider />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Vendedor</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterVendedor"
                                label="Vendedor"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterVendedor}
                                onChange={(e) => setFilterVendedor(e.target.value)}
                            >

                                {compradorvendedornomes.map((nome) => (
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

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Procurador</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterVendedorProcurador"
                                label="Procurador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterVendedorProcurador}
                                onChange={(e) => setFilterVendedorProcurador(e.target.value)}
                            >
                                {procuradornomes.map((nome) => (
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



                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addVendedoreProcurador();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Vendedor
                        </Button>


                    </Grid>

                </Grid>



                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>


                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 500 }}
                                size="small"
                                aria-label="custom pagination table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Vendedor</TableCell>
                                        <TableCell align="left">Procurador</TableCell>
                                        <TableCell align="center" colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {vendedoreprocurador && vendedoreprocurador.length > 0 && (
                                        <TableBody>
                                            {vendedoreprocurador.map((vendedoreproc) => (
                                                <TableRow key={vendedoreproc.id}>
                                                    <TableCell align="left" width="30%">
                                                        {vendedoreproc.nomeVendedor}
                                                    </TableCell>
                                                    <TableCell align="left" width="30%">
                                                        {vendedoreproc.nomeProcurador}
                                                    </TableCell>


                                                    <TableCell width="5%" align="center">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: msgExcludeVendedor,
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#3085d6",
                                                                    cancelButtonColor: "#d33",
                                                                    confirmButtonText: "Sim",
                                                                    cancelButtonText: "Não",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        Swal.fire(msgAtencao, msgExcludeVendedorSuccess);
                                                                        handleExcluirVendcedroeProcurador(vendedoreproc);
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <DeleteRoundedIcon></DeleteRoundedIcon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>
                    </Grid>

                </Grid>

                <Chip label="Detalhes Imóvel" />
                <Divider />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>
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


                    <Grid item xs={5}>
                        <TextField
                            size="small"
                            fullWidth
                            name="detalhamentoImovel"
                            label="Detalhamento do Imóvel"
                            value={formik.values.detalhamentoImovel}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <CurrencyTextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="valorNegocio"
                            label="Valor do Negócio"
                            value={valorNegocio}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setValorNegocio(value)}
                        />
                    </Grid>
                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            fullWidth
                            name="formaPagto"
                            label="Forma de Pagamento"
                            value={formik.values.formaPagto}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            fullWidth
                            name="condicoes"
                            label="Condições"
                            value={formik.values.condicoes}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>


                </Grid>

                <Chip label="Honorários" />
                <Divider />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>



                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Corretor Parceiro</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCorretorParceiro"
                                label="Corretor Parceiro"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCorretorParceiro}
                                onChange={(e) => setFilterCorretorParceiro(e.target.value)}
                            >
                                {procuradornomes.map((nome) => (
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



                    <Grid item xs={3}>
                        <CurrencyTextField
                            size="small"
                            fullWidth
                            color="primary"
                            name="honorariosCorretorParceiro"
                            label="Honorários Corretor"
                            variant="outlined"
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            value={honorariosCorretorParceiro}
                            onChange={(event, value) => setHonorariosCorretorParceiro(value)}
                        />
                    </Grid>






                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addCorretorParceiro();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Honorário
                        </Button>


                    </Grid>

                </Grid>



                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>


                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 500 }}
                                size="small"
                                aria-label="custom pagination table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Nome Corretor</TableCell>
                                        <TableCell align="left">Valor Honorário</TableCell>
                                        <TableCell align="center" colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {honorarioscorretorparceiro && honorarioscorretorparceiro.length > 0 && (
                                        <TableBody>
                                            {honorarioscorretorparceiro.map((honorarioscorretor) => (
                                                <TableRow key={honorarioscorretor.id}>
                                                    <TableCell align="left" width="30%">
                                                        {honorarioscorretor.nomeCompleto}
                                                    </TableCell>
                                                    <TableCell align="left" width="30%">
                                                        {honorarioscorretor.valorHonorario}
                                                    </TableCell>


                                                    <TableCell width="5%" align="center">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: msgExcludeHonorario,
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#3085d6",
                                                                    cancelButtonColor: "#d33",
                                                                    confirmButtonText: "Sim",
                                                                    cancelButtonText: "Não",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        Swal.fire(msgAtencao, msgExcludeHonorarioSuccess);
                                                                        handleExcluirCorretorParceiro(honorarioscorretor);
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <DeleteRoundedIcon></DeleteRoundedIcon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>


                    </Grid>


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>



                    <Grid item xs={6}>
                        <CurrencyTextField
                            size="small"
                            fullWidth
                            name="honorarioImobiliaria"
                            label="Honorários Imobiliária"
                            variant="outlined"
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            value={honorariosImobiliaria}
                            onChange={(event, value) => setHonorariosImobiliaria(value)}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            fullWidth
                            name="formaPagtoHonorarios"
                            label="Forma de Pagamento dos Honorários"
                            value={formik.values.formaPagtoHonorarios}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>




                </Grid>

                <Chip label="Regularidade" />

                <Divider />



                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="regularidadeImovel"
                            label="Regularidade do Imóvel"
                            value={formik.values.regularidadeImovel}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>


                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="responsabilidadeRegularizacao"
                            label="Responsabilidade pela Regularização"
                            value={formik.values.responsabilidadeRegularizacao}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>


                    <Grid item xs={4}>

                        <LocalizationProvider dateAdapter={AdapterDayjs} >

                            <DesktopDatePicker
                                label="Prazo de Regularização"
                                inputFormat="DD/MM/YYYY"
                                value={prazoRegularizacao}
                                onChange={handlePrazoRegularizacao}
                                renderInput={(params) => <TextField
                                    fullWidth
                                    name="prazoRegularizacao"
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}></Grid>

                </Grid>


                <Chip label="Minuta" />

                <Divider />


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioMinuta}
                            onChange={handleChangeRadioMinuta}
                            row
                        >
                            <FormControlLabel value="padrao" control={<Radio />} label="Utilizar Minuta Padrão Compra e Venda" />
                            <FormControlLabel value="edit" control={<Radio />} label="Editar Minuta para este contrato" />
                        </RadioGroup>
                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ visibility: showMinuta }} display={showDisplay} displayPrint={showDisplayPrint} >
                    <Grid item xs={12}  >
                        <TextField
                            rows={12}
                            multiline
                            size="small"
                            fullWidth
                            name="textoMinuta"
                            label="Texto Minuta Contrato"
                            value={textoMinuta}
                            onChange={(e) => setTextoMinuta(e.target.value)}
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
                                // setFilterCdCentrodeCusto({});
                                // setFilterCdConta({});
                                // setFilterCdContaComplementar({});
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
                            onClick={() => {
                                navigateToComponent();
                            }}
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

export default CadastroContratoCompraeVenda;
