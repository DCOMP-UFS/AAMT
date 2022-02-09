/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../config/enumerate';
import { cpfCnpjMask, celularMask, somenteTextoMask } from '../../config/mask';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import $ from 'jquery';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { 
  createUsuarioRequest, 
  clearCreateUser,
  validarCpfRequest,
  setCpfValido,
  validarEmailRequest,
  setEmailValido,
  validarUsuarioRequest,
  setUsuarioValido,
} from '../../store/Usuario/usuarioActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault, InputGroup } from '../../styles/global';

function ModalAdd({ createUsuarioRequest, municipio, createUser, ...props }) {
  const [ nome, setNome ]                         = useState( "" );
  const [ cpf, setCpf ]                           = useState( "" );
  const [ email, setEmail ]                       = useState( "" );
  const [ celular, setCelular ]                   = useState( "" );
  const [ usuario, setUsuario ]                   = useState( "" );
  const [ senha, setSenha ]                       = useState( "" );
  const [ tipoPerfil, setTipoPerfil ]             = useState( {} );
  const [ loadingCpf, setLoadingCpf ]             = useState( false );
  const [ loadingEmail, setLoadingEmail ]         = useState( false );
  const [ loadingUsuario, setLoadingUsuario ]     = useState( false );
  const [ tipoPerfilValido, setTipoPerfilValido ] = useState( true );
  const optionPerfil                              = Object.entries( perfil )
    .filter( ( [ key, value ] ) => {
      if( value.id > 1 )
        return true;
      else
        return false
    } )
    .map( ( [ key, value ] ) => {
      return { value: value.id, label: value.label };
    } );

  useEffect( () => {
    props.clearCreateUser();
  }, [] );

  useEffect( () => {
    if( createUser ) {
      $( '#modal-novo-usuario' ).modal( 'hide' );
      clearInput();
    }
  }, [ createUser ] );

  useEffect( () => {
    if( props.cpfValido || props.cpfValido === false )
      setLoadingCpf( false );
  }, [ props.cpfValido ] );

  useEffect( () => {
    if( props.emailValido || props.emailValido === false )
      setLoadingEmail( false );
  }, [ props.emailValido ] );

  useEffect( () => {
    if( props.usuarioValido || props.usuarioValido === false )
      setLoadingUsuario( false );
  }, [ props.usuarioValido ] );

  /**
   * Esta função é responsável por retornar o modal ao estado inicial
   */
  function clearInput() {
    setNome( "" );
    setCpf( "" );
    setEmail( "" );
    setCelular( "" );
    setUsuario( "" );
    setSenha( "" );
    setTipoPerfil( {} );
    setLoadingCpf( false );
    setLoadingEmail( false );
    setLoadingUsuario( false );
    setTipoPerfilValido( true );
    props.setCpfValido( null );
    props.setEmailValido( null );
    props.setUsuarioValido( null );
  }

  /**
   * Essa função aciona o action para validação do CPF
   */
   const validarCpf = () => {
    setLoadingCpf( true );

    props.setCpfValido( null );
    props.validarCpfRequest( cpf );
  }

  /**
   * Essa função aciona o action para validação do e-mail
   */
  const validarEmail = () => {
    setEmail( formatarString( email ) );
    let valido  = true;
    const match = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if( email === '' ) valido = false;
    if( !match ) valido = false;

    if( valido ) {
      setLoadingEmail( true );
  
      props.setEmailValido( null );
      props.validarEmailRequest( email );
    } else {
      props.setEmailValido( false );
      props.showNotifyToast( "E-mail inválido", "warning" );
    }
  }

  /**
   * Essa função aciona o action para validação do e-mail
   */
  const validarUsuario = () => {
    setUsuario( formatarString( usuario ) );

    if( usuario != '' ) {
      setLoadingUsuario( true );
  
      props.setUsuarioValido( null );
      props.validarUsuarioRequest( usuario );
    } else {
      props.setUsuarioValido( false );
      props.showNotifyToast( "Nome de usuário inválido", "warning" );
    }
  }

  /**
   * Se a str contiver somente espaços em branco essa função irá remove-los
   * Se a str contiver um texto e ao final diversos espaços em branco essa
   * função irá remove-los
   * @param {String} str 
   * @returns {String} str
   */
   const formatarString = str => {
    return str.replace( /\s+/g, ' ' ).trim();
  }

  function handleCadastrar( e ) {
    e.preventDefault();
    let valido = true;

    /**
     * Verificando se e-mai le cpf são válidos
     * 
     * Obs.: foi necessário colocar a redundancia == false pois ao carregar a página
     * a variável emailValido e cpfValido inicia com null, o que significa
     * que não houve validação ainda dos valores, porém, como estamos na página
     * de editar os valires das variáveis já foram validados pelo back-end
     * e necessitará somente de outra validação caso o usuárioe edite.
     */
    if( 
      props.emailValido == false || 
      props.cpfValido == false ||
      props.usuarioValido == false
    ) {
      valido = false;
    }

    if( nome === '' ) valido = false;
    if( senha === '' ) valido = false;
    if( !tipoPerfil.value ) {
      valido = false;
      setTipoPerfilValido( false );
    } else {
      setTipoPerfilValido( true );
    }

    if( valido ) {
      createUsuarioRequest(
        nome,
        cpf,
        email,
        celular,
        usuario,
        senha,
        tipoPerfil.value,
        null,
        municipio.id
      );
    } else {
      props.showNotifyToast( "Existem campos inválidos", "warning" );
    }
  }

  return(
    <Modal
      id="modal-novo-usuario"
      title={<span>Cadastrar Usuário <mark className="bg-info text-white">{municipio.nome}</mark></span>}
      size='lg'
    >
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="nome">Nome <code>*</code></label>
                <input 
                  id="nome" 
                  value={ nome } 
                  className="form-control" 
                  onChange={ e => setNome( e.target.value ) } 
                  onBlur={ e => setNome( somenteTextoMask( formatarString( e.target.value ) ) ) }
                  required 
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="cpf">CPF <code>*</code></label>
                <InputGroup className="right">
                  <input 
                    id="cpf" 
                    value={ cpf } 
                    className={ `form-control ${ props.cpfValido === false ? 'invalid' : '' }` }
                    maxLength="14"
                    onChange={ e => setCpf( cpfCnpjMask( e.target.value ) ) }
                    onBlur={ validarCpf }
                    required 
                  />
                  <div className="field-icon right">
                    {
                      loadingCpf ?
                        <FaTimes className="error" /> :
                      props.cpfValido ?
                        <FaCheck className="success" /> :
                      props.cpfValido === false ?
                        <FaTimes className="error" /> :
                        <div />
                    }
                  </div>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="email">E-mail <code>*</code></label>
                <InputGroup className="right">
                  <input 
                    id="email" 
                    value={ email } 
                    type="email" 
                    className={ `form-control  ${ props.emailValido === false ? 'invalid' : '' }` }
                    onChange={ e => setEmail( e.target.value ) } 
                    onBlur={ validarEmail }
                    required 
                  />
                  <div className="field-icon right">
                    {
                      loadingEmail ?
                        <FaSpinner className="loading" /> :
                      props.emailValido ?
                        <FaCheck className="success" /> :
                      props.emailValido === false ?
                        <FaTimes className="error" /> :
                        <div />
                    }
                  </div>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="celular">Telefone/Ramal</label>
                <input
                  id="celular"
                  value={ celular }
                  className="form-control"
                  onChange={ e => setCelular( celularMask( e.target.value ) ) }
                  onKeyDown ={ e => [ "e", "E", "+", "," ].includes( e.key ) && e.preventDefault() }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="usuario">Usuário <code>*</code></label>
                <InputGroup className="right">
                  <input 
                    id="usuario" 
                    value={ usuario }
                    type="text" 
                    className={ `form-control  ${ props.usuarioValido === false ? 'invalid' : '' }` }
                    onChange={ e => setUsuario( e.target.value ) } 
                    onBlur={ validarUsuario }
                    required 
                  />
                  <div className="field-icon right">
                    {
                      loadingUsuario ?
                        <FaSpinner className="loading" /> :
                      props.usuarioValido ?
                        <FaCheck className="success" /> :
                      props.usuarioValido === false ?
                        <FaTimes className="error" /> :
                        <div />
                    }
                  </div>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="senha">Senha <code>*</code></label>
                <input id="senha" value={ senha } type="password" className="form-control" onChange={ e => setSenha(e.target.value) }  required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                <Select
                  value={ tipoPerfil }
                  styles={ selectDefault }
                  options={ optionPerfil }
                  className={ tipoPerfilValido ? 'valid' : 'invalid' }
                  onChange={ 
                    e => { 
                      setTipoPerfil( e ); 
                      setTipoPerfilValido( true ) 
                    } 
                  }
                  required 
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={ clearInput }>Limpar</Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ( {
  municipio: state.appConfig.usuario.municipio,
  createUser: state.usuario.createUser,
  cpfValido: state.usuario.cpfValido,
  emailValido: state.usuario.emailValido,
  usuarioValido: state.usuario.usuarioValido,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUsuarioRequest,
    clearCreateUser,
    validarCpfRequest,
    setCpfValido,
    validarEmailRequest,
    setEmailValido,
    showNotifyToast,
    validarUsuarioRequest,
    setUsuarioValido,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAdd );
