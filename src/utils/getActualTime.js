export default function getActualHours() {
  var today = new Date();

  var hh = String(today.getHours()).padStart(2, '0');
  var minutes = String(today.getMinutes()).padStart(2, '0');
  var ss = String(today.getSeconds()).padStart(2, '0');

  today = hh + ':' + minutes + ':' + ss;

  return today;
}
