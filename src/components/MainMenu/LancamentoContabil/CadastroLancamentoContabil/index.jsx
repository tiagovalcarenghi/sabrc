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
    Typography
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
import { initialValuesLancamentoContabilBase, initialValuesLancamentoContabilOperacao } from "../../../../util/MainMenu/LancamentoContabil/constants";
import { msgAtencao, msgCadSuccess, msgExcludeRLancamentoOperacoes, msgExcludeRLancamentoOperacoesSuccess, msgInsertLancamentoSuccess } from "../../../../util/applicationresources";
import React, { useState } from "react";
import { isEligible, verificaContas, verificaValores } from "../../../../util/utils";

const CadastroLancamentoContabil = (props) => {
    const { lancamentocontabil, lancamentocontabiloperacao, salvar, limpar, deletelancamentocontabiloperacao, addlancamento, centrosdecusto, contas, contascomplementares } = props;
    const navigate = useNavigate();

    const navigateToComponent = () => {
        navigate("/operacoes/lancamentocontabil", { state: { value: 1 } });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValuesLancamentoContabilBase,
        onSubmit: (values) => {

            Swal.fire({
                icon: "success",
                title: msgCadSuccess,
                text: msgInsertLancamentoSuccess,
            });

            values.dataSelecionada = dataLancamento;


            salvar(values);
            formik.resetForm();
            navigate("/operacoes/lancamentocontabil");
        }

    });

    const handleExcluirLancamento = (l) => {
        deletelancamentocontabiloperacao(l);
    };

    const addLancamento = () => {



        if (!isEligible(formik.values.descLancamento) && !isEligible(filterCdConta.cdContaContabil)
            && !isEligible(formik.values.valorCredito) && !isEligible(formik.values.valorCredito)
            && !isEligible(formik.values.valorDebito)) {

            console.log('a1');

        } else {

            if (!verificaContas(filterCdConta.cdTipoConta, filterCdContaComplementar.cdContaComplementar, filterCdContaComplementar.cdCentrodeCusto)) {

                console.log('a2');

            } else {

                if (!verificaValores(Number(formik.values.valorCredito), Number(formik.values.valorDebito))) {

                    console.log('a3');

                } else {

                    const newl = initialValuesLancamentoContabilOperacao;
                    newl.descLancamento = formik.values.descLancamento;
                    newl.cdCentrodeCusto = filterCdCentrodeCusto.cdCentrodeCusto;
                    newl.descCentrodeCusto = filterCdCentrodeCusto.descCentrodeCusto;
                    newl.cdConta = filterCdConta.cdContaContabil;
                    newl.descConta = filterCdConta.desContaContabil;
                    newl.cdContaComplementar = filterCdContaComplementar.cdContaComplementar;
                    newl.descContaComplementar = filterCdContaComplementar.desccContaComplementar;
                    newl.valorCredito = isEligible(Number(formik.values.valorCredito)) ? Number(formik.values.valorCredito) : 0;
                    newl.valorDebito = isEligible(Number(formik.values.valorDebito)) ? Number(formik.values.valorDebito) : 0;

                    addlancamento(newl);

                }

            }
        }




    };


    const [filterCdCentrodeCusto, setFilterCdCentrodeCusto] = React.useState({});;
    const [filterCdConta, setFilterCdConta] = React.useState({});;
    const [filterCdContaComplementar, setFilterCdContaComplementar] = React.useState({});;
    const [dataLancamento, setDataLancamento] = useState();


    return (
        <form onSubmit={formik.handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Operações</Typography>
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">Lançamento Contábil</Typography>
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

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>
                        <TextField
                            rows={4}
                            multiline
                            size="small"
                            fullWidth
                            name="descLancamento"
                            label="Descrição"
                            value={formik.values.descLancamento}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>

                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Centro de Custo</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdCentrodeCusto"
                                label="Centro de Custo"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdCentrodeCusto}
                                onChange={(e) => setFilterCdCentrodeCusto(e.target.value)}

                            >
                                {centrosdecusto.map((cdc) => (
                                    <MenuItem
                                        key={cdc.id}
                                        value={cdc}

                                    >
                                        {cdc.descCentrodeCusto}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Contas</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdConta"
                                label="Contas"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdConta}
                                onChange={(e) => setFilterCdConta(e.target.value)}
                                required

                            >
                                {contas.map((cc) => (
                                    <MenuItem
                                        key={cc.id}
                                        value={cc}

                                    >
                                        {cc.desContaContabil}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Contas Complementares</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="filterCdContaComplementar"
                                label="Contas Complementares"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={filterCdContaComplementar}
                                onChange={(e) => setFilterCdContaComplementar(e.target.value)}

                            >
                                {contascomplementares.map((cco) => (
                                    <MenuItem
                                        key={cco.id}
                                        value={cco}

                                    >
                                        {cco.desccContaComplementar}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>



                </Grid>


                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>
                        <TextField
                            size="small"
                            fullWidth
                            name="valorCredito"
                            label="Crédito"
                            value={formik.values.valorCredito}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            size="small"
                            fullWidth
                            name="valorDebito"
                            label="Débito"
                            value={formik.values.valorDebito}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>


                </Grid>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={3}>

                        <Button
                            fullWidth
                            color="info"
                            variant="outlined"
                            onClick={() => {
                                addLancamento();
                            }}
                            startIcon={<AddBoxRoundedIcon />}
                        >
                            Adicionar Lançamento
                        </Button>


                    </Grid>


                    <Grid item xs={3}>

                        <TextField
                            id="date"
                            label="Data do Lançamento"
                            name="dataLancamento"
                            type="date"
                            // defaultValue="2017-05-24"
                            size="small"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dataLancamento}
                            required
                            onChange={(e) => setDataLancamento(e.target.value)}
                        />

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
                                        <TableCell align="left">Descrição</TableCell>
                                        <TableCell align="left">Centro de Custo</TableCell>
                                        <TableCell align="left">Conta Contábil</TableCell>
                                        <TableCell align="left">Conta Complementar</TableCell>
                                        <TableCell align="left">Crédito</TableCell>
                                        <TableCell align="left">Débito</TableCell>

                                        <TableCell align="center" colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>

                                <>
                                    {lancamentocontabiloperacao && lancamentocontabiloperacao.length > 0 && (
                                        <TableBody>
                                            {lancamentocontabiloperacao.map((lc) => (
                                                <TableRow key={lc.id}>
                                                    <TableCell align="left" width="20%">
                                                        {lc.descLancamento}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descCentrodeCusto}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descConta}
                                                    </TableCell>
                                                    <TableCell align="left" width="15%">
                                                        {lc.descContaComplementar}
                                                    </TableCell>
                                                    <TableCell align="left" width="10%">
                                                        {lc.valorCredito}
                                                    </TableCell>
                                                    <TableCell align="left" width="10%">
                                                        {lc.valorDebito}
                                                    </TableCell>

                                                    <TableCell width="5%" align="center">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: msgExcludeRLancamentoOperacoes,
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: "#3085d6",
                                                                    cancelButtonColor: "#d33",
                                                                    confirmButtonText: "Sim",
                                                                    cancelButtonText: "Não",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        Swal.fire(msgAtencao, msgExcludeRLancamentoOperacoesSuccess);
                                                                        handleExcluirLancamento(lc);
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
                                setFilterCdCentrodeCusto({});
                                setFilterCdConta({});
                                setFilterCdContaComplementar({});
                                setDataLancamento({});
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

export default CadastroLancamentoContabil;
