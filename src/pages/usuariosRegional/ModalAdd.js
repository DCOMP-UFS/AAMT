/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../config/enumerate';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';
import { cpfCnpjMask, celularMask, somenteTextoMask } from '../../config/mask';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

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
import { getNationsRequest } from '../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../store/Regiao/regiaoActions';
import { GetStatesByRegionRequest } from '../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../store/RegionalSaude/regionalSaudeActions';
import { getCityByRegionalHealthRequest } from '../../store/Municipio/municipioActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault, InputGroup } from '../../styles/global';

const ModalAdd = ( { createUsuarioRequest, createUser, ...props } ) => {
  const [ nome, setNome ]                               = useState( "" );
  const [ cpf, setCpf ]                                 = useState( "" );
  const [ rg, setRg ]                                   = useState( "" );
  const [ email, setEmail ]                             = useState( "" );
  const [ celular, setCelular ]                         = useState( "" );
  const [ usuario, setUsuario ]                         = useState( "" );
  const [ senha, setSenha ]                             = useState( "" );
  const [ tipoPerfil, setTipoPerfil ]                   = useState( {} );
  const [ pais, setPais ]                               = useState( { value: 30, label: 'Brasil' } );
  const [ optionPais, setOptionPais ]                   = useState( [] );
  const [ regiao, setRegiao ]                           = useState( {} );
  const [ optionRegiao, setOptionRegiao ]               = useState( [] );
  const [ estado, setEstado ]                           = useState( {} );
  const [ optionEstado, setOptionEstado ]               = useState( [] );
  const [ regionalSaude, setRegionalSaude ]             = useState( {} );
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState( [] );
  const [ municipio, setMunicipio ]                     = useState( {} );
  const [ optionMunicipio, setOptionMunicipio ]         = useState( [] );
  const [ flMunicipio, setFlMunicipio]                  = useState( true );
  const [ flLoading, setFlLoading ]                     = useState( false );
  const [ loadingCpf, setLoadingCpf ]                   = useState( false );
  const [ loadingEmail, setLoadingEmail ]               = useState( false );
  const [ loadingUsuario, setLoadingUsuario ]           = useState( false );
  const [ formValido, setFormValido ]                   = useState( true );

  const optionPerfil = Object.entries( perfil ).map( ( [ key, value ] ) => {
    return { value: value.id, label: value.label };
  } );

  useEffect( () => {
    props.getNationsRequest();
  }, [] );

  useEffect( () => {
    const options = props.paises.map( p => ( { value: p.id, label: p.nome } ) );

    setOptionPais( options );
  }, [ props.paises ] );

  useEffect( () => {
    if( Object.entries( pais ).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao( {} );
      setEstado( {} );
      setOptionEstado( [] );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [] );
      setMunicipio( {} );
      setOptionMunicipio( [] );
    }
  }, [ pais ] );

  useEffect( () => {
    const options = props.regioes.map( r => ( { value: r.id, label: r.nome } ) );

    setOptionRegiao( options );
  }, [ props.regioes ] );

  useEffect(() => {
    if( Object.entries( regiao ).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado( {} );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [] );
      setMunicipio( {} );
      setOptionMunicipio( [] );
    }
  }, [ regiao ] );

  useEffect(() => {
    const options = props.estados.map(( e ) => ({ value: e.id, label: e.nome }));

    setOptionEstado( options );
  }, [ props.estados ]);

  useEffect(() => {
    if( Object.entries(estado).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value );
      setRegionalSaude({});
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ estado ]);

  useEffect(() => {
    const options = props.regionaisSaude.map(( r ) => ({ value: r.id, label: r.nome }));

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ]);

  useEffect(() => {
    if( Object.entries(regionalSaude).length > 0 ) {
      props.getCityByRegionalHealthRequest( regionalSaude.value );
      setMunicipio({});
    }
  }, [ regionalSaude ]);

  useEffect(() => {
    const options = props.municipiosList.map(( m ) => ({ value: m.id, label: m.nome }));

    setOptionMunicipio( options );
  }, [ props.municipiosList ]);

  useEffect(() => {
    if( createUser ) {
      $('#modal-novo-usuario').modal('hide');
      setFlLoading( false );
      props.clearCreateUser();
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

  function clearInput() {
    setNome( "" );
    setCpf( "" );
    setRg( "" );
    setEmail( "" );
    setCelular( "" );
    setUsuario( "" );
    setSenha( "" );
    setTipoPerfil( {} );
    setFormValido( true );
    setRegiao( {} );
    setEstado( {} );
    setRegionalSaude( {} );
    setMunicipio( {} );
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
    setFlLoading( true );

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
    if( !tipoPerfil.value ) valido = false;
    if( !pais.value ) valido = false;
    if( !regiao.value ) valido = false;
    if( !estado.value ) valido = false;
    if( !regionalSaude.value ) valido = false;

    /**
     * Verificando se o perfil do usuário é diferente de coordenador regional
     * Se sim - Verifica se o município foi preenchido
     * Se não - O município não precisa ser setado.
     */
    if( tipoPerfil.value && tipoPerfil.value !== 1 )
      if( !municipio.value ) 
        valido = false;

    if( valido ) {
      setFormValido( true );
      createUsuarioRequest(
        nome,
        cpf,
        email,
        celular,
        usuario,
        senha,
        tipoPerfil.value,
        regionalSaude.value,
        municipio.value
      );
    } else {
      setFormValido( false );
      setFlLoading( false );
      props.showNotifyToast( "Existem campos inválidos", "warning" );
    }
  }

  return(
    <Modal id="modal-novo-usuario" title="Cadastrar Usuário" size='lg'>
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <Row>
            <Col md="6">
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
                        <FaSpinner className="loading" /> :
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
            <Col md="6">
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
            <Col>
              <FormGroup>
                <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                <Select
                  value={ tipoPerfil }
                  styles={ selectDefault }
                  options={ optionPerfil }
                  className={ 
                    !formValido ? 
                      tipoPerfil.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ 
                    e => { 
                      setTipoPerfil( e );
                      if( e.value === 1 )
                        setFlMunicipio( false );
                      else
                        setFlMunicipio( true );
                    } 
                  }
                  required 
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <p className="text-description">
                Atenção! Os campos abaixo são informações da localização de trabalho do usuário
              </p>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="pais">País <code>*</code></label>
                <Select
                  id="pais"
                  value={ pais }
                  styles={ selectDefault }
                  options={ optionPais }
                  className={ 
                    !formValido ? 
                      pais.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ e => setPais( e ) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regiao">Região <code>*</code></label>
                <Select
                  id="regiao"
                  value={ regiao }
                  styles={ selectDefault }
                  options={ optionRegiao }
                  className={ 
                    !formValido ? 
                    regiao.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ e => setRegiao( e ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="estado">Estado <code>*</code></label>
                <Select
                  id="estado"
                  value={ estado }
                  styles={ selectDefault }
                  options={ optionEstado }
                  className={ 
                    !formValido ? 
                      estado.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ e => setEstado( e ) }
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                <Select
                  id="regionalSaude"
                  value={ regionalSaude }
                  styles={ selectDefault }
                  options={ optionRegionalSaude }
                  className={ 
                    !formValido ? 
                      regionalSaude.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ e => setRegionalSaude( e ) }
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="municipio">Município <code>*</code></label>
                <Select
                  id="municipio"
                  value={ municipio }
                  styles={ selectDefault }
                  options={ optionMunicipio }
                  className={ 
                    !formValido && flMunicipio ? 
                      municipio.value ? 
                        'valid' : 
                        'invalid' :
                      'valid'
                  }
                  onChange={ e => setMunicipio(e) }
                  isDisabled={ !flMunicipio }
                  required={ flMunicipio }
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
              <Button type="submit" loading={ flLoading } disabled={ flLoading } >
                {
                  flLoading ?
                    (
                      <>
                        <img
                          src={ LoadginGif }
                          width="25"
                          style={{ marginRight: 10 }}
                          alt="Carregando"
                        />
                        Salvando...
                      </>
                    ) :
                    "Salvar"
                }
              </Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ( {
  createUser: state.usuario.createUser,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  municipiosList: state.municipio.municipiosList,
  cpfValido: state.usuario.cpfValido,
  emailValido: state.usuario.emailValido,
  usuarioValido: state.usuario.usuarioValido,
 } );

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUsuarioRequest,
    clearCreateUser,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    getCityByRegionalHealthRequest,
    validarCpfRequest,
    setCpfValido,
    validarEmailRequest,
    setEmailValido,
    validarUsuarioRequest,
    setUsuarioValido,
    showNotifyToast,
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalAdd );
