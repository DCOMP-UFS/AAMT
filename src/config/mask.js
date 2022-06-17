export const cpfCnpjMask = v => {
  v = v.replace(/\D/g, "")

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  } else {
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
  }

  return v
}

export const celularMask = value => {
  return value
    .replace( /\D/g, '' )
    .replace( /(\d{2})(\d)/, '($1) $2 ')
    .replace( /(\d{4})(\d{4})\d+?$/, '$1-$2' );
}

export const somenteTextoMask = value => {
  return value.replace( /\d/g, '' );
}