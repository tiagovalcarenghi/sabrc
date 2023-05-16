import {
    Breadcrumbs,
    Button,
    Grid,
    Typography,
    Select,
    MenuItem,
    TableHead
} from "@mui/material";
import { useFormik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow, TablePaginationActions } from "../../../commons/GridCommons";
import { useState } from "react";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { initialValuesDre } from "../../../../util/MainMenu/Dre/constants";

const GridDre = (props) => {


    const { dreall } = props;


    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //----------PAGINATION END--------////



    const verificaNulo = () => {
        return !!dreall ? dreall.length : 0;
    };


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValuesDre,
        onSubmit: (values) => {

            Swal.fire({
                icon: "info",
                title: "ATENÇÃO",
                text: "DRE será gerado pelo banco de dados portanto a geração dos lançamentos não entrará no front-end",
            });

        }
    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ textDecoration: 'underline' }} color="text.secondary">DRE</Typography>
                <Typography color="text.primary">Relatório</Typography>
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

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Selecione o Mês/Ano Inicial</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="mes_e_ano_inicio"
                                label="Selecione o Mês/Ano"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.mes_e_ano_inicio}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'01/2023'}>Janeiro/2023</MenuItem>
                                <MenuItem value={'02/2023'}>Fevereiro/2023</MenuItem>
                                <MenuItem value={'03/2023'}>Março/2023</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-controlled-open-select-label">Selecione o Mês/Ano Final</InputLabel>
                            <Select
                                fullWidth
                                size="small"
                                name="mes_e_ano_fim"
                                label="Selecione o Mês/Ano"
                                labelId="select-label-id"
                                id="select-label-id"
                                value={formik.values.mes_e_ano_fim}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'01/2023'}>Janeiro/2023</MenuItem>
                                <MenuItem value={'02/2023'}>Fevereiro/2023</MenuItem>
                                <MenuItem value={'03/2023'}>Março/2023</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={3}>



                        <Grid item>
                            <Button
                                color="warning"
                                variant="outlined"
                                type="submit"
                                startIcon={<AppRegistrationIcon />}
                            >
                                GERAR DRE
                            </Button>
                        </Grid>


                    </Grid>


                    <Grid item xs={2}>



                        <Grid item>
                            <Button
                                color="error"
                                variant="outlined"
                                type="submit"
                                startIcon={<PictureAsPdfIcon />}
                            >
                                EXPORTAR PDF
                            </Button>
                        </Grid>


                    </Grid>

                    <Grid item xs={2}>



                        <Grid item>
                            <Button
                                color="success"
                                variant="outlined"
                                type="submit"
                                startIcon={<BackupTableIcon />}
                            >
                                EXPORTAR XLS
                            </Button>
                        </Grid>



                    </Grid>

                </Grid>



                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 500 }}
                        size="small"
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Conta Resultado</StyledTableCell>
                                <StyledTableCell align="center">Saldo Exercício</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <>
                            {dreall && dreall.length > 0 && (
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? dreall.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : dreall
                                    ).map((DRE) => (
                                        <StyledTableRow key={DRE.id}>
                                            <StyledTableCell align="left" width="60%">
                                                {DRE.desContaContabil}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" width="20%">
                                                {DRE.saldoExercicio}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            )}
                        </>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    colSpan={2}
                                    count={verificaNulo()}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            "aria-label": "Linhas por Página",
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </form>
    );
};

export default GridDre;
