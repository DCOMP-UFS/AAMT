// Todas as funções neste arquivo devem ser de uso global
import React from 'react';
import $ from 'jquery';

/*
 * validInputInt => É uma função de validação de input, caso o campo não seja
 * válido essa função notifca adicionando a classe invalid ao input em questão.
 *
 * String idElement
 * Object value
 *
 * return boolean
 */
export const validInputInt = ( idElement, value ) => {
  const valid = parseInt( value );

  if ( !valid ) $(idElement).addClass("invalid");

  setTimeout(function(){ $(idElement).removeClass("invalid"); }, 3000);

  return valid;
}

/*
 * validInputInt => É uma função de validação de input, caso o campo não seja
 * válido essa função notifca adicionando a classe invalid ao input em questão.
 *
 * String idElement
 * Object value
 *
 * return boolean
 */
export const validInputFloat = ( idElement, value ) => {
  const valid = parseFloat( value );

  if ( !valid ) $(idElement).addClass("invalid");

  setTimeout(function(){ $(idElement).removeClass("invalid"); }, 3000);

  return valid;
}

/*
 * validInputInt => valida se uma String é vazia ou não
 *
 * String idElement
 * String value
 *
 * return boolean
 */
export const validInputIsEmpty = ( idElement, value ) => {
  const valid = value !== "";

  if ( !valid ) $(idElement).addClass("invalid");

  setTimeout(function(){ $(idElement).removeClass("invalid"); }, 3000);

  return valid;
}

export const validInputIsNull = ( idElement, value ) => {
  const valid = value !== null;

  if ( !valid ) $(idElement).addClass("invalid");

  setTimeout(function(){ $(idElement).removeClass("invalid"); }, 3000);

  return valid;
}

export const getDateBr = ( date, tipo = 'datetime' ) => {
  const data  = new Date( date );
  let dia     = data.getDate().toString(),
      mes     = data.getMonth().toString(),
      ano     = data.getFullYear(),
      hh      = data.getHours(),
      mm      = data.getMinutes();

  dia = ( dia.length === 1 ) ? '0' + dia : dia;
  mes = ( mes.length === 1 ) ? '0' + mes : mes;

  hh = ( hh < 10 ) ? '0' + hh : hh;
  mm = ( mm < 10 ) ? '0' + mm : mm;

  switch( tipo ) {
    case 'date':
      return new Date(ano, mes, dia, hh, mm, 0).toLocaleDateString();

    default:
      return new Date(ano, mes, dia, hh, mm, 0).toLocaleString();
  }
}

//Recebe uma string no formato "dd/mm/aaaa hh:mm:ss"
//e converter para um Date
export const getDateIso = (dataBR) => {
  const array1 = dataBR.split(" ")
  let data = array1[0],
      tempo = array1[1]

  const array2 = data.split("/")
  let dia = array2[0],
      mes = array2[1],
      ano = array2[2]
  
  const array3 = tempo.split(":")
  let hora = array3[0],
      minuto= array3[1]

  return new Date(ano, mes, dia, hora, minuto, 0)
}

export const ordenadorData = (order) => {
  return (a, b) => {
    const dateA = getDateIso(a.data).getTime();
    const dateB = getDateIso(b.data).getTime();
    return (dateA < dateB ? -1 : 1) * (order === "desc" ? 1 : -1);
  };

}

export const desc = ( a, b, orderBy ) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const stableSort = ( array, cmp ) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export const getSorting = ( order, orderBy ) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export const msgInputInvalid = ( msg = 'Campo obrigatório' ) => {
  return (
    `<span class="form-label-invalid">${ msg }</span>`
  );
}

/**
 * Remove espaços em excesso de uma string
 * @param {*} string
 * @returns
 */

export const removeMultipleSpaces = string => {
  return string.trim().replace(/  +/g, ' ');
}

export const onlyNumbers = input => {
  const re = /^[0-9\b]+$/;
  if(input === '' || re.test(input))
    return true

  return false
}

export const isBlank = input => {
  if(input.trim() === '')
    return true

  return false
}

export const onlyLetters = input => {
  const re = /^[a-zA-ZáàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ\s]+$/g;
  if(input === '' || re.test(input))
    return true

  return false
}
export const maskCep = string => {
  const parte1 = string.substring(0,5);
  const parte2 = string.substring(5,8);

  return parte1 +"-"+ parte2
}

export const isCepValid = cep => {
  return (cep.length == 8)
}
