import { TablePaginationActions } from "./GridCommons";


const GridFooter = (db) => {

    //----------PAGINATION START--------////
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //----------PAGINATION END--------////


    const verificaNulo = () => {
        return !!db ? db.length : 0;
    };


    return (

        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={5}
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

    );

};

export default GridFooter;
