export function getCurrentDate(separator = '/') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}


export function getDateFormat(datenew) {

    var separator = '/';
    let newDate = new Date(datenew);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}



export function isEligible(value) {
    if (value !== false || value !== null || value !== 0 || value !== "" || value !== '' || value !== undefined) {
        return value;
    }
}


export function verificaContas(cdTipo, contaComp, centrodeCusto) {

    console.log('tipo conta-> ' + cdTipo + ' conta comp-> ' + contaComp + ' centro de custo-> ' + centrodeCusto);

    if (cdTipo === 1 && isEligible(contaComp) && !isEligible(centrodeCusto)) {
        return true;
    } else if (cdTipo === 2 && !isEligible(contaComp) && isEligible(centrodeCusto)) {
        return true;
    } else {
        return false;
    }

}


export function verificaValores(valorCredito, valorDebito) {

    if (valorCredito > 0 && valorDebito === 0) {
        return true;
    } else if (valorDebito > 0 && valorCredito === 0) {
        return true;
    } else {
        return false;
    }

}