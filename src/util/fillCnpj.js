module.exports = (cnpj) => {
    if (cnpj.length < 14) {
        return String(cnpj).padStart(14, '0');
    }
    return cnpj;
}