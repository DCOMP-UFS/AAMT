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
      mes     = ( data.getMonth() + 1 ).toString(), //+1 pois no getMonth Janeiro começa com zero.
      ano     = data.getFullYear(),
      hh      = data.getHours(),
      mm      = data.getMinutes();

  dia = ( dia.length === 1 ) ? '0' + dia : dia;
  mes = ( mes.length === 1 ) ? '0' + mes : mes;

  hh = ( hh < 10 ) ? '0' + hh : hh;
  mm = ( mm < 10 ) ? '0' + mm : mm;

  switch( tipo ) {
    case 'date':
      return `${ dia }/${ mes }/${ ano }`;

    default:
      return `${ hh }:${ mm } - ${ dia }/${ mes }/${ ano }`;
  }
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
