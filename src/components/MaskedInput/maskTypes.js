/*
cada parametro dentro do MaskTypes representa um tipo de mascara,
sendo que cada tipo possui os seguintes dados:
    mask          ---  A mascara que será aplicada no input
    clearInput    ---  Função que será utilizada para retirar a mascara,
                       quando for salvar no banco
*/


const MaskTypes = {
    cep: {
        mask: "99999-999",
        //regex que retira todos os valores que não sejam numeros
        clearInput: (str) => str.replace(/[^0-9]/g, '')
    },
    cpf: {
        mask: "999.999.999-99",
        clearInput: (str) => str.replace(/[^0-9]/g, '')
    },

}

export default MaskTypes