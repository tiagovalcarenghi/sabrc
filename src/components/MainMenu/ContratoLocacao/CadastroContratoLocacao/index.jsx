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
import { useEffect, useRef, useState } from "react";
import { msgAtencao, msgCadSuccess, msgExcludeComprador, msgExcludeCompradorSuccess, msgExcludeHonorario, msgExcludeHonorarioSuccess, msgExcludeVendedor, msgExcludeVendedorSuccess, msgInsertContratoCompraeVendaSuccess, msgLancamentoError, msgSaveContratoCompraeVendaError } from "../../../../util/applicationresources";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { isEligible } from "../../../../util/utils";
import { StyledTableCell, StyledTableRow } from "../../../commons/GridCommons";
import { initialContratosdeLocacaoBase } from "../../../../util/MainMenu/ContratoLocacao/constants";


const CadastroContratoLocacao = (props) => {

    const { contratolocacaocad, locadoreprocurador, addlocadoreprocurador, deletelocadoreprocurador, locatarioeprocurador, addlocatarioeprocurador, deletelocatarioeprocurador, taxaintermediacaocorretores, addtaxaintermediacao, deletetaxaintermediacao, locadorlocatarionomes, procuradornomes, endereco, salvar, limpar } = props;


    useEffect(() => {

        if (contratolocacaocad) {
            setValorLocacao(contratolocacaocad.valordaLocacao);
            setTaxaIntermediacaoBomlar(contratolocacaocad.taxaIntermediacaoBomlar);
            setTaxaIntermediacaoTotal(contratolocacaocad.taxaIntermediacaoTotal);
        }

    }, [contratolocacaocad]);

    const [filterLocador, setFilterLocador] = useState({});
    const [filterLocadorProcurador, setFilterLocadorProcurador] = useState({});;
    const [filterLocatario, setFilterLocatario] = useState({});;
    const [filterLocatarioProcurador, setFilterLocatarioProcurador] = useState({});
    const [filterEndereco, setEndereco] = useState({});
    const [filterCorretor, setFilterCorretor] = useState({});
    const [taxaIntermediacaoCorretor, setTaxaIntermediacaoCorretor] = useState(0);
    const [radioMinuta, setRadioMinutaValue] = useState('padrao');
    const [disableMinuta, setDisableMinuta] = useState(true);
    const [valordaLocacao, setValorLocacao] = useState(0);
    const [taxaIntermediacaoBomlar, setTaxaIntermediacaoBomlar] = useState(0);
    const [taxaIntermediacaoTotal, setTaxaIntermediacaoTotal] = useState(0);

    const navigate = useNavigate();

    const handleExcluirLocadorProcurador = (cp) => {
        deletelocadoreprocurador(cp);
    };

    const handleExcluirLocatarioProcurador = (vp) => {
        deletelocatarioeprocurador(vp);
    };

    const handleExcluirTaxaIntermediacaoCorretor = (co) => {
        deletetaxaintermediacao(co);
    };


    const addLocadorProcurador = () => {
        addlocadoreprocurador(filterLocador, filterLocadorProcurador);
    };

    const addLocatarioeProcurador = () => {
        addlocatarioeprocurador(filterLocatario, filterLocatarioProcurador);
    };


    const addTaxaIntermediacaoCorretor = () => {
        setTaxaIntermediacaoCorretor(isEligible(taxaIntermediacaoCorretor) ? Number(taxaIntermediacaoCorretor) : Number(0));
        addtaxaintermediacao(filterCorretor, taxaIntermediacaoCorretor);
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
        initialValues: contratolocacaocad || initialContratosdeLocacaoBase,
        onSubmit: (values) => {


            if (!Object.values(values).every(x => x === null || x === '')) {

                Swal.fire({
                    icon: "success",
                    title: msgCadSuccess,
                    text: msgInsertContratoCompraeVendaSuccess,
                });

                values.valordaLocacao = isEligible(valordaLocacao) ? valordaLocacao : 0;
                values.taxaIntermediacaoBomlar = isEligible(taxaIntermediacaoBomlar) ? taxaIntermediacaoBomlar : 0;
                values.cdEndereco = isEligible(filterEndereco.cdNomes) ? filterEndereco.cdNomes : null;
                values.enderecoCompleto = isEligible(filterEndereco.nome) ? filterEndereco.nome : '';
                values.taxaIntermediacaoTotal = isEligible(taxaIntermediacaoTotal) ? taxaIntermediacaoTotal : 0;
                values.textoMinuta = isEligible(values.textoMinuta) ? values.textoMinuta : '';
                values.tipoMinuta = radioMinuta;

                salvar(values);
                formik.resetForm();
                limpar();
                navigate("/operacoes/contratolocacao");

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
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Contrato de Locação</Typography>
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

                <Chip label="LOCADOR" />

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Locador</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterLocador"
                                label="Locador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterLocador}
                                onChange={(e) => setFilterLocador(e.target.value)}
                            >

                                {locadorlocatarionomes.map((nome) => (
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
                                name="filterLocadorProcurador"
                                label="Procurador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterLocadorProcurador}
                                onChange={(e) => setFilterLocadorProcurador(e.target.value)}
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
                                addLocadorProcurador();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Locador
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
                                        <StyledTableCell align="left">Locador</StyledTableCell>
                                        <StyledTableCell align="left">Procurador</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {locadoreprocurador && locadoreprocurador.length > 0 && (
                                        <TableBody>
                                            {locadoreprocurador.map((locadoreproc) => (
                                                <StyledTableRow key={locadoreproc.id}>
                                                    <StyledTableCell align="left" width="30%">
                                                        {locadoreproc.nomeLocador}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" width="30%">
                                                        {locadoreproc.nomeProcurador}
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
                                                                        handleExcluirLocadorProcurador(locadoreproc);
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

                <Chip label="LOCATÁRIO" />


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Locatário</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterLocatario"
                                label="Locatário"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterLocatario}
                                onChange={(e) => setFilterLocatario(e.target.value)}
                            >

                                {locadorlocatarionomes.map((nome) => (
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
                                name="filterLocatarioProcurador"
                                label="Procurador"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterLocatarioProcurador}
                                onChange={(e) => setFilterLocatarioProcurador(e.target.value)}
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
                                addLocatarioeProcurador();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Locatário
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
                                        <StyledTableCell align="left">Locatário</StyledTableCell>
                                        <StyledTableCell align="left">Procurador</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {locatarioeprocurador && locatarioeprocurador.length > 0 && (
                                        <TableBody>
                                            {locatarioeprocurador.map((locatarioeproc) => (
                                                <StyledTableRow key={locatarioeproc.id}>
                                                    <StyledTableCell align="left" width="40%">
                                                        {locatarioeproc.nomeLocatario}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" width="40%">
                                                        {locatarioeproc.nomeProcurador}
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
                                                                        handleExcluirLocatarioProcurador(locatarioeproc);
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

                <Chip label="DETALHES DETALHES" />


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


                    <Grid item xs={3}>
                        <CurrencyTextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="valordaLocacao"
                            label="Valor da Locação"
                            value={valordaLocacao}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setValorLocacao(value)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <CurrencyTextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="taxaIntermediacaoTotal"
                            label="Taxa de Intermediação Total"
                            value={taxaIntermediacaoTotal}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setTaxaIntermediacaoTotal(value)}
                        />
                    </Grid>
                </Grid>



                <Chip label="RATEIO DE HONORÁRIOS" />


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Corretor</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCorretor"
                                label="Corretor"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCorretor}
                                onChange={(e) => setFilterCorretor(e.target.value)}
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
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="taxaIntermediacaoCorretor"
                            label="Rateio do Corretor"
                            value={taxaIntermediacaoCorretor}
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            onChange={(event, value) => setTaxaIntermediacaoCorretor(value)}
                        />

                    </Grid>



                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addTaxaIntermediacaoCorretor();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Rateio
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
                                        <StyledTableCell align="center">Valor</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}></StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {taxaintermediacaocorretores && taxaintermediacaocorretores.length > 0 && (
                                        <TableBody>
                                            {taxaintermediacaocorretores.map((rateiocorretor) => (
                                                <StyledTableRow key={rateiocorretor.id}>
                                                    <StyledTableCell align="left" width="60%">
                                                        {rateiocorretor.nomeCompleto}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" width="15%">
                                                        {rateiocorretor.valorTaxaIntermediacao}
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
                                                                        handleExcluirTaxaIntermediacaoCorretor(rateiocorretor);
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
                            name="taxaIntermediacaoBomlar"
                            label="Taxa Intermediação Bomlar"
                            variant="outlined"
                            currencySymbol="R$"
                            decimalCharacter=","
                            digitGroupSeparator="."
                            outputFormat="string"
                            value={taxaIntermediacaoBomlar}
                            onChange={(event, value) => setTaxaIntermediacaoBomlar(value)}
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
                            <FormControlLabel value="padrao" control={<Radio />} label="Utilizar Minuta Padrão Locação" />
                            <FormControlLabel value="edit" control={<Radio />} label="Editar Minuta para este contrato" />
                        </RadioGroup>
                    </Grid>

                </Grid>


                {radioMinuta === 'edit' ? (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} ref={ref} >
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

                                setFilterLocador({});
                                setFilterLocadorProcurador({});;
                                setFilterLocatario({});;
                                setFilterLocatarioProcurador({});
                                setEndereco({});
                                setFilterCorretor({});
                                setTaxaIntermediacaoCorretor(0);
                                setRadioMinutaValue('padrao');
                                setValorLocacao(0);
                                setTaxaIntermediacaoBomlar(0);

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
                            to="/operacoes/contratolocacao"
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

export default CadastroContratoLocacao;
