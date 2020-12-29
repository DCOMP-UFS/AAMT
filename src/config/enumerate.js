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
  { id: 1, sigla: "R", label: "Residencial" },
  { id: 2, sigla: "TB", label: "Terreno Baldio" },
  { id: 3, sigla: "C", label: "Comercial" },
  { id: 4, sigla: "PE", label: "Ponto estratégico" }
]

export const perfil = {
  agente: { id: 4, label: "Agente" },
  coordenador: { id: 2, label: "Coordenador" },
  coordenadorGeral: { id: 1, label: "Coordenador Geral" },
  laboratorista: { id: 5, label: "Laboratorista"},
  supervisor: { id: 3, label: "Supervisor"},
}

export const abrangencia = {
  local: { id: 1, label: "Por Localidade/Bairro" },
  zona: { id: 2, label: "Por Zona" },
  quarteirao: { id: 3, label: "Por Quarteirão" },
}

export const situacaoAtividade = {
  aberta: { id: 1, label: "Em aberto" },
  concluida: { id: 2, label: "Concluída" },
  naoConcluida: { id: 3, label: "Não concluída" },
  execucao: { id: 4, label: "Em execução" },
  planejada: { id: 5, label: "Planejada" },
}

export const responsabilidadeAtividade = {
  regional: { id: 1, label: "Regional" },
  municipal: { id: 2, label: "Municipal" },
}

export const tecnicaTratamentoEnum = {
  focal: { id: 1, label: "Focal" },
  perifocal: { id: 2, label: "Perifocal" },
}
