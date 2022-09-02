/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import MaskedInput from '../../../../components/MaskedInput'
import SelectWrap from '../../../../components/SelectWrap'
import ButtonSaveModal from '../../../../components/ButtonSaveModal';

// Models
import { Lado } from '../../../../config/models';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { getRuaPorCepRequest, streetExistRequest, clearStreetExist } from '../../../../store/Rua/ruaActions';

// STYLES
import { ContainerArrow } from '../../../../styles/util';
import { Button, FormGroup, selectDefault } from '../../../../styles/global';

// VALIDATIONS FUNCTIONS
import { isBlank, isCepValid } from '../../../../config/function';

/**
 * Modal de adição/edição de um lado
 * 
 * @param {Model} lado modelo de dados
 * @param {String} acao cadastrar ou editar
 * @param {Boolean} show abrir ou fechar modal
 * @param {Function} handleClose função para fechar modal
 * @param {Function} addLado função para adicionar lado
 * @param {Object} props demais propriedades para funcionamento do componente
 * @returns 
 */
const ModalLado = ( { lado, acao, show, handleClose, ruas, addLado, localidade_id, ...props } ) => {
  const [ rua, setRua ]                           = useState( {} );
  const [ optionRua, setOptionRua ]               = useState( [] );
  const [ cep, setCep ]                           = useState( "" );
  const [ outra, setOutra ]                       = useState( "" );
  const [ isValidOutra, setIsValidOutra ]         = useState( true );
  const [ isValidCep, setIsValidCep ]             = useState( true );
  const [ flLoading, setFlLoading ]               = useState( false );

   /**
   *  Limpa os campos toda vez que o modal for aberto
   */
  useEffect(() => {
    if( show ) {
      limparTudo()
    }
  }, [ show ]);

  /**
   * Preenchendo as opções do select de rua
   */
  useEffect(() => {
    const options = ruas.map( r => ( { value: r.id, label: r.nome, cep: r.cep } ) );
    options.push( { value: null, label: 'Outra', cep: '' } );

    setOptionRua( options );
  }, [ ruas ]);

  /**
   * O estado props.rua é preenchido sempre que a consulta de rua pelo cep
   * retorna um valor válido.
   * Este effect monitora este estado para preencher o campo outra.
   */
  useEffect(() => {
    if( rua.value === null )
      setOutra( props.rua.nome );
  }, [ props.rua ] );

  /**
   * Este effect monitora o estado local do componente rua.
   * Toda vez que a rua é setada para um valor diferente de outra esta função
   * limpa os dados dos campos cep e outra.
   */
  useEffect(() => {
    if( rua.value ) {
      setOutra( "" );
      setCep( "" );
    }
  }, [ rua ])

  /**
   * Atualizando o campo rua pelo CEP atual
   */
  const getRuaPorCep = () => {
    if( cep.length == 8 ) 
      props.getRuaPorCepRequest( cep );
  }

  /**
   * Esta função chama a action para adicionar um imóvel ao quarteirão.
   * 
   * @param {object} e Elemento que acionou esaa função
   */
  const handleSubmit = e => {
    e.preventDefault();

    //quando se cai nessa condicional, a rua será adicionada no useEffect abaixo desse metodo
    if(rua.label == 'Outra'){
      const nomeInvalido = isBlank(outra)
      const cepInvalido = !isCepValid(cep)

      nomeInvalido  ? setIsValidOutra(false) : setIsValidOutra(true)
      cepInvalido   ? setIsValidCep(false)   : setIsValidCep(true)

      if(!nomeInvalido && !cepInvalido){
        setFlLoading(true)
        props.streetExistRequest(null , outra, cep, localidade_id)
      }
    }
    else{
      const lado = new Lado( {
        rua_id        : rua.value,
        logradouro    : rua.label,
        cep           : rua.cep,
        outro         : outra
      } );

      addLado( lado );
    }
  }

  //É disparado toda vez que o usuario quer adicionar no lado uma rua não cadastrada
  //props.sameName é um bool que diz se o nome da nova rua ja é usado por outra rua na mesma localidade
  //props.sameCEP  é um bool que diz se o cep da nova rua  já é usado
  useEffect(() => {
    
    //Não pode aceitar null, por isso estou usando ==false
    if(props.sameName == false && props.sameCEP == false){
      const lado = new Lado( {
        rua_id        : rua.value,
        logradouro    : outra,
        cep           : cep,
        outro         : outra
      } );

      addLado( lado );

      // Limpando variáveis
      setRua( {} );
      setCep( "" );
      setOutra( "" );
    }
    setFlLoading(false)
    props.clearStreetExist();

  }, [ props.sameName, props.sameCEP ])

  function limparTudo(){
    setRua( {} );
    setCep( "" );
    setOutra( "" );
    setIsValidCep(true)
    setIsValidOutra(true)
  }

  return(
    <Modal show={ show } onHide={ handleClose } backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          { acao == 'cadastrar' ? 'Cadastrar' : 'Editar' } Lado
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit }>
        <Modal.Body>
          <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col md="12">
              <FormGroup>
                <label htmlFor="l_rua">Rua <code>*</code></label>
                <SelectWrap
                  id="l_rua"
                  value={ rua }
                  styles={ selectDefault }
                  options={ optionRua }
                  onChange={ e => setRua( e ) }
                  required
                />
              </FormGroup>
            </Col>
            
            <Col sm="12" md="6" className={rua.value !== null ? "d-none" :""}>
              <FormGroup className="mb-0">
                <label htmlFor="l_cep">CEP<code>*</code></label>
                <MaskedInput
                  id        ="l_cep"
                  type      ="cep"
                  value     ={ cep }
                  className ="form-control"
                  onChange  ={ e => setCep( e.target.value ) }
                  //onBlur    ={ getRuaPorCep }
                  required  ={ rua.value !== null ? false : true } 
                />
                {
                    !isValidCep ?
                      <span class="form-label-invalid">CEP inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
            <Col sm="12" md="6" className={rua.value !== null ? "d-none" :""}>
              <FormGroup className="mb-0">
                <label htmlFor="l_outra">Nome<code>*</code></label>
                <input
                  id="l_outra"
                  value={ outra }
                  className="form-control"
                  onChange={ e => setOutra( e.target.value ) }
                  required={ rua.value !== null ? false : true }
                />
                {
                    !isValidOutra ?
                      <span class="form-label-invalid">Nome inválido</span> :
                      ''
                }
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ContainerArrow className="justify-content-end">
            <div>
            <Button 
                type="button" 
                className="secondary" 
                data-dismiss="modal" 
                onClick={ handleClose }
                disabled={ flLoading }>
                  Cancelar
              </Button>
              <ButtonSaveModal title="Salvar" loading={ flLoading } disabled={ flLoading } type="submit" />
            </div>
          </ContainerArrow>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

/**
 * Mapeia o estado global da aplicação a propriedade do componente
 * @param {Object} state estado global
 * @returns 
 */
const mapStateToProps = state => ( {
  rua: state.rua.rua,
  sameName: state.rua.sameName,
  sameCEP: state.rua.sameCEP
} );

/**
 * Mapeia ações a propriedade do componente
 * @param {*} dispatch 
 * @returns 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    getRuaPorCepRequest,
    streetExistRequest,
    clearStreetExist,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalLado );
