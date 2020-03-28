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

export const tipoImovel = {
  comercial: { value: "C", label: "Comercial" },
  pontoEstrategico: { value: "PE", label: "Ponto estratégico" },
  residencial: { value: "R", label: "Residencial" },
  terrenoBaldio: { value: "TB", label: "Terreno Baldio" }
}

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
