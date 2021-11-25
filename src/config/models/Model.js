import defaultsDeep from "lodash/defaultsDeep";

/**
 * Base de modelo de dados
 */
export class Model {
  /**
   * Construtor do modelo
   * @param {Object} attributes objecto json a ser atribuido ao modelo
   */
  constructor( attributes = {} ) {
    defaultsDeep( this, attributes, this.defaults );
  }
}