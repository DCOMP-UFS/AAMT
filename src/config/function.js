// Todas as funções neste arquivo devem ser de uso global
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

export const getDateBr = date => {
  const data = new Date( date );
  let dia  = data.getDate().toString();
  dia = (dia.length === 1) ? '0'+dia : dia;
  let mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  mes = (mes.length === 1) ? '0'+mes : mes;
  let ano = data.getFullYear();

  let hh = data.getHours();
  hh = (hh < 10) ? '0'+hh : hh;
  let mm = data.getMinutes();
  mm = (mm < 10) ? '0'+mm : mm;

  return `${ hh }:${ mm } - ${ dia }/${ mes }/${ ano }`;
}
