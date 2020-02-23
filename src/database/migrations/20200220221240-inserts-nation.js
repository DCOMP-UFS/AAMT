'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('paises', [
      { 
        nome: "Afeganistão",
        sigla: "AF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "África do Sul",
        sigla: "ZA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Albânia",
        sigla: "AL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Alemanha",
        sigla: "DE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Andorra",
        sigla: "AD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Angola",
        sigla: "AO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Anguilla",
        sigla: "AI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Antártida",
        sigla: "AQ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Antígua e Barbuda",
        sigla: "AG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Arábia Saudita",
        sigla: "SA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Argélia",
        sigla: "DZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Argentina",
        sigla: "AR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Armênia",
        sigla: "AM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Aruba",
        sigla: "AW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Austrália",
        sigla: "AU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Áustria",
        sigla: "AT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Azerbaijão",
        sigla: "AZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bahamas",
        sigla: "BS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bahrein",
        sigla: "BH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bangladesh",
        sigla: "BD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Barbados",
        sigla: "BB",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Belarus",
        sigla: "BY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bélgica",
        sigla: "BE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Belize",
        sigla: "BZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Benin",
        sigla: "BJ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bermudas",
        sigla: "BM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bolívia",
        sigla: "BO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bósnia-Herzegóvina",
        sigla: "BA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Botsuana",
        sigla: "BW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Brasil",
        sigla: "BR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Brunei",
        sigla: "BN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Bulgária",
        sigla: "BG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Burkina Fasso",
        sigla: "BF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Burundi",
        sigla: "BI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Butão",
        sigla: "BT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Cabo Verde",
        sigla: "CV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Camarões",
        sigla: "CM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Camboja",
        sigla: "KH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Canadá",
        sigla: "CA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Canárias",
        sigla: "IC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Cazaquistão",
        sigla: "KZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ceuta e Melilla",
        sigla: "EA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Chade",
        sigla: "TD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Chile",
        sigla: "CL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "China",
        sigla: "CN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Chipre",
        sigla: "CY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Cingapura",
        sigla: "SG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Colômbia",
        sigla: "CO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Comores",
        sigla: "KM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Congo",
        sigla: "CG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Coréia do Norte",
        sigla: "KP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Coréia do Sul",
        sigla: "KR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Costa do Marfim",
        sigla: "CI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Costa Rica",
        sigla: "CR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Croácia",
        sigla: "HR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Cuba",
        sigla: "CU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Curaçao",
        sigla: "CW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Diego Garcia",
        sigla: "DG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Dinamarca",
        sigla: "DK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Djibuti",
        sigla: "DJ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Dominica",
        sigla: "DM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Egito",
        sigla: "EG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "El Salvador",
        sigla: "SV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Emirados Árabes Unidos",
        sigla: "AE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Equador",
        sigla: "EC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Eritréia",
        sigla: "ER",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Eslováquia",
        sigla: "SK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Eslovênia",
        sigla: "SI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Espanha",
        sigla: "ES",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Estados Unidos",
        sigla: "US",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Estônia",
        sigla: "EE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Etiópia",
        sigla: "ET",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Fiji",
        sigla: "FJ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Filipinas",
        sigla: "PH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Finlândia",
        sigla: "FI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "França",
        sigla: "FR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Gabão",
        sigla: "GA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Gâmbia",
        sigla: "GM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Gana",
        sigla: "GH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Geórgia",
        sigla: "GE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Gibraltar",
        sigla: "GI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Grã-Bretanha (Reino Unido, UK)",
        sigla: "GB",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Granada",
        sigla: "GD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Grécia",
        sigla: "GR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Groelândia",
        sigla: "GL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guadalupe",
        sigla: "GP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guam (Território dos Estados Unidos)",
        sigla: "GU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guatemala",
        sigla: "GT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guernsey",
        sigla: "GG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guiana",
        sigla: "GY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guiana Francesa",
        sigla: "GF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guiné",
        sigla: "GN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guiné Equatorial",
        sigla: "GQ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Guiné-Bissau",
        sigla: "GW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Haiti",
        sigla: "HT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Holanda",
        sigla: "NL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Honduras",
        sigla: "HN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Hong Kong",
        sigla: "HK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Hungria",
        sigla: "HU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Iêmen",
        sigla: "YE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha Bouvet",
        sigla: "BV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha de Ascensão",
        sigla: "AC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha de Clipperton",
        sigla: "CP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha de Man",
        sigla: "IM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha Natal",
        sigla: "CX",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha Pitcairn",
        sigla: "PN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilha Reunião",
        sigla: "RE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Aland",
        sigla: "AX",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Cayman",
        sigla: "KY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Cocos",
        sigla: "CC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Cook",
        sigla: "CK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Faroes",
        sigla: "FO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Geórgia do Sul e Sandwich do Sul",
        sigla: "GS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Heard e McDonald (Território da Austrália)",
        sigla: "HM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Malvinas",
        sigla: "FK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Marianas do Norte",
        sigla: "MP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Marshall",
        sigla: "MH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Menores dos Estados Unidos",
        sigla: "UM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Norfolk",
        sigla: "NF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Salomão",
        sigla: "SB",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Seychelles",
        sigla: "SC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Tokelau",
        sigla: "TK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Turks e Caicos",
        sigla: "TC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Virgens (Estados Unidos)",
        sigla: "VI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ilhas Virgens (Inglaterra)",
        sigla: "VG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Índia",
        sigla: "IN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Indonésia",
        sigla: "ID",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Irã",
        sigla: "IR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Iraque",
        sigla: "IQ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Irlanda",
        sigla: "IE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Islândia",
        sigla: "IS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Israel",
        sigla: "IL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Itália",
        sigla: "IT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Jamaica",
        sigla: "JM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Japão",
        sigla: "JP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Jersey",
        sigla: "JE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Jordânia",
        sigla: "JO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Kiribati",
        sigla: "KI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Kosovo",
        sigla: "XK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Kuait",
        sigla: "KW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Laos",
        sigla: "LA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Lesoto",
        sigla: "LS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Letônia",
        sigla: "LV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Líbano",
        sigla: "LB",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Libéria",
        sigla: "LR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Líbia",
        sigla: "LY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Liechtenstein",
        sigla: "LI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Lituânia",
        sigla: "LT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Luxemburgo",
        sigla: "LU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Macau",
        sigla: "MO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Macedônia (República Yugoslava)",
        sigla: "MK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Madagascar",
        sigla: "MG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Malásia",
        sigla: "MY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Malaui",
        sigla: "MW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Maldivas",
        sigla: "MV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Mali",
        sigla: "ML",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Malta",
        sigla: "MT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Marrocos",
        sigla: "MA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Martinica",
        sigla: "MQ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Maurício",
        sigla: "MU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Mauritânia",
        sigla: "MR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Mayotte",
        sigla: "YT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "México",
        sigla: "MX",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Micronésia",
        sigla: "FM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Moçambique",
        sigla: "MZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Moldova",
        sigla: "MD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Mônaco",
        sigla: "MC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Mongólia",
        sigla: "MN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Montenegro",
        sigla: "ME",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Montserrat",
        sigla: "MS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Myanma",
        sigla: "MM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Namíbia",
        sigla: "NA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nauru",
        sigla: "NR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nepal",
        sigla: "NP",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nicarágua",
        sigla: "NI",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Níger",
        sigla: "NE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nigéria",
        sigla: "NG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Niue",
        sigla: "NU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Noruega",
        sigla: "NO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nova Caledônia",
        sigla: "NC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nova Zelândia",
        sigla: "NZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Omã",
        sigla: "OM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Países Baixos Caribenhos",
        sigla: "BQ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Palau",
        sigla: "PW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Palestina",
        sigla: "PS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Panamá",
        sigla: "PA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Papua-Nova Guiné",
        sigla: "PG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Paquistão",
        sigla: "PK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Paraguai",
        sigla: "PY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Peru",
        sigla: "PE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Polinésia Francesa",
        sigla: "PF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Polônia",
        sigla: "PL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Porto Rico",
        sigla: "PR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Portugal",
        sigla: "PT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Qatar",
        sigla: "QA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Quênia",
        sigla: "KE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Quirguistão",
        sigla: "KG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "República Centro-Africana",
        sigla: "CF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "República Democrática do Congo",
        sigla: "CD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "República Dominicana",
        sigla: "DO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "República Tcheca",
        sigla: "CZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Romênia",
        sigla: "RO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ruanda",
        sigla: "RW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Rússia (antiga URSS) - Federação Russa",
        sigla: "RU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Saara Ocidental",
        sigla: "EH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Saint-Pierre e Miquelon",
        sigla: "PM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Samoa Americana",
        sigla: "AS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Samoa Ocidental",
        sigla: "WS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "San Marino",
        sigla: "SM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Santa Helena",
        sigla: "SH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Santa Lúcia",
        sigla: "LC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Bartolomeu",
        sigla: "BL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Cristóvão e Névis",
        sigla: "KN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Martim",
        sigla: "MF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Martinho",
        sigla: "SX",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Tomé e Príncipe",
        sigla: "ST",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "São Vicente e Granadinas",
        sigla: "VC",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Senegal",
        sigla: "SN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Serra Leoa",
        sigla: "SL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sérvia",
        sigla: "RS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Síria",
        sigla: "SY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Somália",
        sigla: "SO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sri Lanka",
        sigla: "LK",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Suazilândia",
        sigla: "SZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sudão",
        sigla: "SD",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sudão do Sul",
        sigla: "SS",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Suécia",
        sigla: "SE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Suíça",
        sigla: "CH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Suriname",
        sigla: "SR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Svalbard",
        sigla: "SJ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tadjiquistão",
        sigla: "TJ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tailândia",
        sigla: "TH",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Taiwan",
        sigla: "TW",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tanzânia",
        sigla: "TZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Território Britânico do Oceano índico",
        sigla: "IO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Territórios do Sul da França",
        sigla: "TF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Timor-Leste",
        sigla: "TL",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Togo",
        sigla: "TG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tonga",
        sigla: "TO",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Trinidad e Tobago",
        sigla: "TT",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tristão da Cunha",
        sigla: "TA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tunísia",
        sigla: "TN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Turcomenistão",
        sigla: "TM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Turquia",
        sigla: "TR",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Tuvalu",
        sigla: "TV",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Ucrânia",
        sigla: "UA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Uganda",
        sigla: "UG",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Uruguai",
        sigla: "UY",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Uzbequistão",
        sigla: "UZ",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Vanuatu",
        sigla: "VU",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Vaticano",
        sigla: "VA",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Venezuela",
        sigla: "VE",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Vietnã",
        sigla: "VN",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Wallis e Futuna",
        sigla: "WF",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Zâmbia",
        sigla: "ZM",
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Zimbábue",
        sigla: "ZW",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('paises', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
