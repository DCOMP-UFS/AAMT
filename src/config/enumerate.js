export const tipoRecipiente = [
  "A1",
  "A2",
  "B",
  "C",
  "D1",
  "D2",
  "E",
]

export const tipoColetor = [
  "Tubito",
  "Frasco",
]

export const situacaoUnidade = [
  "coletado",
  "pendente",
  "examinado",
]

export const situacaoAmostraEnum = {
  coletada: { id: 1, label: "Coletada" },
  pendente: { id: 2, label: "Pendente" },
  examinada: { id: 3, label: "Examinada" },
}

export const tipoImovel = {
  residencial: { id: 1, sigla: "R", label: "Residencial" },
  terrenoBaldio: { id: 2, sigla: "TB", label: "Terreno Baldio" },
  comercial: { id: 3, sigla: "C", label: "Comercial" },
  pontoEstrategico: { id: 4, sigla: "PE", label: "Ponto estratégico" }
}

export const tipoImovelEnum = [
  { id: 1, sigla: "R", label: "Residencial", slug: "residencial" },
  { id: 2, sigla: "TB", label: "Terreno Baldio", slug: "terreno_baldio" },
  { id: 3, sigla: "C", label: "Comercial", slug: "comercial" },
  { id: 4, sigla: "PE", label: "Ponto estratégico", slug: "ponto_estrategico" }
]

export const situacao_imovel_enum = [
  { id: 1, sigla: "T", label: "Trabalhado", slug: "trabalhado" },
  { id: 2, sigla: "I", label: "Inspecionado", slug: "inspecionado" },
  { id: 3, sigla: "CF", label: "Com Foco", slug: "foco" },
  { id: 4, sigla: "TR", label: "Tratado", slug: "tratado" },
  { id: 5, sigla: "P", label: "Fechado/Recusado", slug: "pendencia" },
  { id: 6, sigla: "R", label: "Recuperado", slug: "recuperado" },
];

export const situacao_vistoria_enum = [
  { id: 1, sigla: "T", label: "Trabalhado", slug: "trabalhado" },
  { id: 2, sigla: "I", label: "Inspecionado", slug: "inspecionado" },
];

export const situacao_deposito_enum = [
  { id: 1, sigla: "CF", label: "Com Foco", slug: "foco" },
  { id: 2, sigla: "TR", label: "Tratado", slug: "tratado" },
];

export const situacao_imovel2_enum = [
  { id: 1, sigla: "P", label: "Fechado/Recusado", slug: "pendencia" },
  { id: 2, sigla: "R", label: "Recuperado", slug: "recuperado" },
];

export const perfil = {
  coordenadorGeral: { id: 1, label: "Coordenador Geral" },
  coordenador: { id: 2, label: "Coordenador" },
  supervisor: { id: 3, label: "Supervisor"},
  agente: { id: 4, label: "Agente" },
  laboratorista: { id: 5, label: "Laboratorista"},
}

export const abrangencia = {
  local: { id: 1, label: "Por Localidade/Bairro" },
  zona: { id: 2, label: "Por Zona" },
  quarteirao: { id: 3, label: "Por Quarteirão" },
}

export const abrangenciaEnum = [
  { id: 1, label: "Por Localidade/Bairro" },
  { id: 2, label: "Por Zona" },
  { id: 3, label: "Por Quarteirão" },
]

export const situacaoAtividade = {
  aberta: { id: 1, label: "Em aberto" },
  execucao: { id: 2, label: "Em execução" },
  concluida: { id: 3, label: "Concluída" },
  nao_concluida: { id: 4, label: "Não concluída" }
}

export const situacaoAtividadeEnum = [
  { id: 1, label: "Em aberto" },
  { id: 2, label: "Em execução" },
  { id: 3, label: "Concluída" },
  { id: 4, label: "Não concluída" },
]

export const responsabilidadeAtividade = {
  regional: { id: 1, label: "Regional" },
  municipal: { id: 2, label: "Municipal" },
}

export const responsabilidadeAtividadeEnum = [
  { id: 1, label: "Regional" },
  { id: 2, label: "Municipal" },
]

export const tecnicaTratamentoEnum = {
  focal: { id: 1, label: "Focal" },
  perifocal: { id: 2, label: "Perifocal" },
}

export const situacaoLadoEnum = [
  { id: 1, label: "Em aberto" },
  { id: 2, label: "Fazendo" },
  { id: 3, label: "Concluído" },
  { id: 4, label: "Planejado" }
];
