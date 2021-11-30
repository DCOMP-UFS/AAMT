import { Model } from "./Model.js";

/**
 * Modelo de dados Lado
 */
export default class Lado extends Model {
  /**
   * Dados padrão e seus valores inicias do modelo
   */
  get defaults() {
    return {
      id            : null,
      numero        : null,
      localidade_id : null,
      rua_id        : null,
      logradouro    : "",
      cep           : "",
      outro         : ""
    };
  }
}