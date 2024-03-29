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
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { msgAtencao, msgCadSuccess, msgExcludeComprador, msgExcludeCompradorSuccess, msgExcludeHonorario, msgExcludeHonorarioSuccess, msgExcludeVendedor, msgExcludeVendedorSuccess, msgInsertContratoCompraeVendaSuccess, msgLancamentoError, msgSaveContratoCompraeVendaError } from "../../../../util/applicationresources";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ptBR from 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { getDateFormat, isEligible } from "../../../../util/utils";
import { initialContratosdeCompraeVendaBase } from "../../../../util/MainMenu/ContratoCompraeVenda/constants";
import { StyledTableCell, StyledTableRow } from "../../../commons/GridCommons";


const CadastroContratoCompraeVenda = (props) => {

    const { contratocompraevendacad, compradoreprocurador, addcompradoreprocurador, deletecompradoreprocurador, vendedoreprocurador, addvendedoreprocurador, deletevendedoreprocurador, honorarioscorretorparceiro, addhonorarios, deletehonorarios, compradorvendedornomes, procuradornomes, enderecodb, salvar, limpar, corretorenomes } = props;


    useEffect(() => {

        if (contratocompraevendacad) {

            const dateString = contratocompraevendacad.prazoRegularizacao;
            const convertedDate = dayjs(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');

            setPrazoRegularizacao(isEligible(contratocompraevendacad.prazoRegularizacao) ? convertedDate : dayjs());
            setValorNegocio(contratocompraevendacad.valorNegocio);
            setHonorariosImobiliaria(contratocompraevendacad.honorarioImobiliaria);
            setPosseDefinitiva(contratocompraevendacad.posseDefinitiva);
            setPrazoObtencaoFinanciamento(contratocompraevendacad.prazoObtencaoFinanciamento);
            setCdEndereco(contratocompraevendacad.cdEndereco)
        }

    }, [contratocompraevendacad]);


    const [filterComprador, setFilterComprador] = useState({});
    const [filterCompradorProcurador, setFilterCompradorProcurador] = useState({});;
    const [filterVendedor, setFilterVendedor] = useState({});;
    const [filterVendedorProcurador, setFilterVendedorProcurador] = useState({});
    const [cdEndereco, setCdEndereco] = useState('');
    const [filterCorretorParceiro, setFilterCorretorParceiro] = useState({});
    const [honorariosCorretorParceiro, setHonorariosCorretorParceiro] = useState(0);
    const [radioMinuta, setRadioMinutaValue] = useState('padrao');
    const [disableMinuta, setDisableMinuta] = useState(true);
    const [prazoRegularizacao, setPrazoRegularizacao] = useState(dayjs());
    const [valorNegocio, setValorNegocio] = useState(0);
    const [honorariosImobiliaria, setHonorariosImobiliaria] = useState(0);
    const [posseDefinitiva, setPosseDefinitiva] = useState('');
    const [prazoObtencaoFinanciamento, setPrazoObtencaoFinanciamento] = useState('');


    const navigate = useNavigate();

    function handleInputChangePosse(event) {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setPosseDefinitiva(value);
    }

    function handleInputChangePrazoFinanciamento(event) {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setPrazoObtencaoFinanciamento(value);
    }

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



    const handlePrazoRegularizacao = (newValue) => {
        setPrazoRegularizacao(newValue);
    };


    const handleChangeRadioMinuta = (event) => {

        setRadioMinutaValue(event.target.value);
        setDisableMinuta(event.target.value === 'edit' ? false : true);



    };

    const ref = useRef(null);

    useEffect(() => {
        if (radioMinuta === 'edit') {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [radioMinuta]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: contratocompraevendacad || initialContratosdeCompraeVendaBase,
        onSubmit: (values) => {


            if (!Object.values(values).every(x => x === null || x === '')) {

                Swal.fire({
                    icon: "success",
                    title: msgCadSuccess,
                    text: msgInsertContratoCompraeVendaSuccess,
                });

                let itemsEndereco = enderecodb;
                itemsEndereco = itemsEndereco?.filter((item) => item.cdEndereco === cdEndereco);
                values.enderecoCompleto = itemsEndereco[0].enderecoCompleto;
                values.cdEndereco = cdEndereco;

                values.prazoRegularizacao = getDateFormat(prazoRegularizacao);
                values.valorNegocio = isEligible(valorNegocio) ? Number(valorNegocio) : 0;
                values.honorarioImobiliaria = isEligible(honorariosImobiliaria) ? Number(honorariosImobiliaria) : 0;
                values.detalhamentoImovel = isEligible(values.detalhamentoImovel) ? values.detalhamentoImovel : '';
                values.condicoes = isEligible(values.condicoes) ? values.condicoes : '';
                values.formaPagtoHonorarios = isEligible(values.formaPagtoHonorarios) ? values.formaPagtoHonorarios : '';
                values.regularidadeImovel = isEligible(values.regularidadeImovel) ? values.regularidadeImovel : '';
                values.responsabilidadeRegularizacao = isEligible(values.responsabilidadeRegularizacao) ? values.responsabilidadeRegularizacao : '';
                values.posseDefinitiva = isEligible(posseDefinitiva) ? posseDefinitiva : '';
                values.prazoObtencaoFinanciamento = isEligible(prazoObtencaoFinanciamento) ? prazoObtencaoFinanciamento : '';
                values.textoMinuta = isEligible(values.textoMinuta) ? values.textoMinuta : '';
                values.tipoMinuta = radioMinuta;


                salvar(values);
                formik.resetForm();
                limpar();
                navigate("/operacoes/contratocompraevenda");

            } else {

                Swal.fire({
                    icon: "error",
                    title: msgLancamentoError,
                    text: msgSaveContratoCompraeVendaError,
                });
            }

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

                <Chip label="PROMINETE COMPRADOR" />

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

                                <MenuItem value={{}}>SELECIONAR</MenuItem>
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
                                <MenuItem value={{}}>SELECIONAR</MenuItem>
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
                                        <StyledTableCell align="left">Comprador</StyledTableCell>
                                        <StyledTableCell align="left">Procurador</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {compradoreprocurador && compradoreprocurador.length > 0 && (
                                        <TableBody>
                                            {compradoreprocurador.map((compradoreproc) => (
                                                <StyledTableRow key={compradoreproc.id}>
                                                    <StyledTableCell align="left" width="30%">
                                                        {compradoreproc.nomeComprador}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" width="30%">
                                                        {compradoreproc.nomeProcurador}
                                                    </StyledTableCell>


                                                    <StyledTableCell width="5%" align="center">
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
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>
                    </Grid>

                </Grid>



                <Chip label="PROMINENTE VENDEDOR" />

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

                                <MenuItem value={{}}>SELECIONAR</MenuItem>
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
                                <MenuItem value={{}}>SELECIONAR</MenuItem>
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
                                        <StyledTableCell align="left">Vendedor</StyledTableCell>
                                        <StyledTableCell align="left">Procurador</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {vendedoreprocurador && vendedoreprocurador.length > 0 && (
                                        <TableBody>
                                            {vendedoreprocurador.map((vendedoreproc) => (
                                                <StyledTableRow key={vendedoreproc.id}>
                                                    <StyledTableCell align="left" width="40%">
                                                        {vendedoreproc.nomeVendedor}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" width="40%">
                                                        {vendedoreproc.nomeProcurador}
                                                    </StyledTableCell>


                                                    <StyledTableCell width="5%" align="center">
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
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    )}
                                </></Table></TableContainer>
                    </Grid>

                </Grid>



                <Chip label="DETALHES IMÓVEL" />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                    <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Endereço</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="cdEndereco"
                                label="Endereço"
                                labelId="select-label-id"
                                id="select-label-id"
                                required
                                value={cdEndereco}
                                onChange={(e) => setCdEndereco(e.target.value)}

                            >
                                {enderecodb.map((e) => (
                                    <MenuItem
                                        key={e.id}
                                        value={e.cdEndereco}

                                    >
                                        {e.enderecoCompleto}
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
                            name="detalhamentoImovel"
                            label="Detalhamento do Imóvel"
                            value={formik.values.detalhamentoImovel}
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


                    <Grid item xs={12}>
                        <TextField
                            rows={12}
                            multiline
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



                <Chip label="HONORÁRIOS" />


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
                                <MenuItem value={{}}>SELECIONAR</MenuItem>
                                {corretorenomes.map((nome) => (
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
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="honorariosCorretorParceiro"
                            label="Honorários Corretor"
                            value={honorariosCorretorParceiro}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
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
                                        <StyledTableCell align="left">Nome Corretor</StyledTableCell>
                                        <StyledTableCell align="center">Valor Honorário</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {honorarioscorretorparceiro && honorarioscorretorparceiro.length > 0 && (
                                        <TableBody>
                                            {honorarioscorretorparceiro.map((honorarioscorretor) => (
                                                <StyledTableRow key={honorarioscorretor.id}>
                                                    <StyledTableCell align="left" width="60%">
                                                        {honorarioscorretor.nomeCompleto}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="15%">
                                                        {honorarioscorretor.valorHonorario}
                                                    </StyledTableCell>


                                                    <StyledTableCell width="5%" align="center">
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
                                                    </StyledTableCell>
                                                </StyledTableRow>
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
                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                    <Grid item xs={12}>
                        <TextField
                            rows={12}
                            multiline
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



                <Chip label="REGULARIDADE" />


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

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
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

                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="posseDefinitiva"
                            label="Posse Definitiva(dias)"
                            value={posseDefinitiva}
                            onChange={handleInputChangePosse}
                            inputProps={{ inputMode: 'numeric' }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            fullWidth
                            name="prazoObtencaoFinanciamento"
                            label="Prazo Para Obtenção do Financiamento(dias)"
                            value={prazoObtencaoFinanciamento}
                            onChange={handleInputChangePrazoFinanciamento}
                            inputProps={{ inputMode: 'numeric' }}

                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={4}></Grid>

                </Grid>


                <Chip label="MINUTA" />


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


                {radioMinuta === 'edit' ? (

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} ref={ref}  >
                        <Grid item xs={12}  >
                            <TextField
                                rows={12}
                                multiline
                                size="small"
                                fullWidth
                                name="textoMinuta"
                                label="Texto Minuta Contrato"
                                value={formik.values.textoMinuta}
                                disabled={disableMinuta}
                                onChange={formik.handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                    </Grid>

                ) : (
                    // Componente oculto
                    null
                )}






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

                                setFilterComprador({});
                                setFilterCompradorProcurador({});;
                                setFilterVendedor({});;
                                setFilterVendedorProcurador({});
                                setCdEndereco('');
                                setFilterCorretorParceiro({});
                                setHonorariosCorretorParceiro(0);
                                setRadioMinutaValue('padrao');
                                setPrazoRegularizacao(dayjs());
                                setValorNegocio(0);
                                setHonorariosImobiliaria(0);

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
                            to="/operacoes/contratocompraevenda"
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

export default CadastroContratoCompraeVenda;
