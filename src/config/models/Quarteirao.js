import { Model } from "./Model.js";

/**
 * Modelo de dados Quarteirão
 */
export default class Quarteirao extends Model {
  /**
   * Dados padrão e seus valores inicias do modelo
   */
  get defaults() {
    return {
      id            : null,
      numero        : null,
      localidade_id : null,
      zona_id       : null,
      ativo         : true,
      quarteirao_id : null,
      lados         : []
    };
  }
}