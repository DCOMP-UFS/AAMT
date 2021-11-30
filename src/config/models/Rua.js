import { Model } from "./Model.js";

/**
 * Modelo de dados Rua
 */
export default class Rua extends Model {
  /**
   * Dados padrão e seus valores inicias do modelo
   */
  get defaults() {
    return {
      id  : null,
      cep : "",
      nome: "",
    };
  }
}