export const initialValuesContasContabeis = {
    id: '',
    cdContaContabil: '',
    desContaContabil: '',
    cdTipoConta: '',
    descTipoConta: '',
    saldo: '',
    cdTipoSaldo: '',
    descTipoSaldo: '',
    isFixed: ''
}


export const tipoContaContabilOptions = [
    { id: 1, cdTipoConta: 1, descTipoConta: "Patrimonial" },
    { id: 2, cdTipoConta: 2, descTipoConta: "Resultado" }
];


export const tipoSaldoOptions = [
    { id: 1, cdTipoSaldo: 1, descTipoSaldo: "Crédito" },
    { id: 2, cdTipoSaldo: 2, descTipoSaldo: "Débito" },
    { id: 3, cdTipoSaldo: 3, descTipoSaldo: "Zero" }
];



//ADICIONAR CAMPO 'isFixed' para as contas fixos/não deletáveis/editaveis do sistema.