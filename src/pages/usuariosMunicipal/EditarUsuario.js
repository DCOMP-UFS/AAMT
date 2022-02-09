/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import { perfil } from '../../config/enumerate';
import { cpfCnpjMask, celularMask, somenteTextoMask } from '../../config/mask';
import { FaUsers, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import {
  updateUsuarioRequest,
  getUsuarioByIdRequest,
  validarCpfRequest,
  clearUpdateUser,
  setCpfValido,
  validarEmailRequest,
  setEmailValido
} from '../../store/Usuario/usuarioActions';
import { getNationsRequest } from '../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../store/Regiao/regiaoActions';
import { GetStatesByRegionRequest } from '../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../store/RegionalSaude/regionalSaudeActions';
import { getCityByRegionalHealthRequest } from '../../store/Municipio/municipioActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';

// STYLES
import { FormGroup, selectDefault, InputGroup } from '../../styles/global';
import { ContainerFixed, PageIcon, PageHeader } from '../../styles/util';

function EditarUsuario({ usuarioUpdate, getUsuarioByIdRequest, updateUsuarioRequest, ...props }) {
  const [ id ]                                          = useState( props.match.params.id );
  const [ nome, setNome ]                               = useState( "" );
  const [ cpf, setCpf ]                                 = useState( "" );
  const [ email, setEmail ]                             = useState( "" );
  const [ celular, setCelular ]                         = useState( "" );
  const [ usuario, setUsuario ]                         = useState( "" );
  const [ ativo, setAtivo ]                             = useState( "" );
  const [ tipoPerfil, setTipoPerfil ]                   = useState( {} );
  const [ pais, setPais ]                               = useState( {} );
  const [ optionPais ]                                  = useState( [] );
  const [ regiao, setRegiao ]                           = useState( {} );
  const [ optionRegiao, setOptionRegiao ]               = useState( [] );
  const [ estado, setEstado ]                           = useState( {} );
  const [ optionEstado, setOptionEstado ]               = useState( [] );
  const [ regionalSaude, setRegionalSaude ]             = useState( {} );
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState( [] );
  const [ municipio, setMunicipio ]                     = useState( {} );
  const [ optionMunicipio, setOptionMunicipio ]         = useState( [] );
  const [ userRegiao, setUserRegiao ]                   = useState( {} );
  const [ userEstado, setUserEstado ]                   = useState( {} );
  const [ userRegionalSaude, setUserRegionalSaude ]     = useState( {} );
  const [ userMunicipio, setUserMunicipio ]             = useState( {} );
  const [ flBtnLoading, setFlBtnLoading ]               = useState( false );
  const [ loadingCpf, setLoadingCpf ]                   = useState( false );
  const [ loadingEmail, setLoadingEmail ]               = useState( false );

  const optionPerfil = Object.entries( perfil )
    .filter( ( [ key, value ] ) => {
      if( value.id > 1 )
        return true;
      else
        return false
    } )
    .map( ( [ key, value ] ) => {
      return { value: value.id, label: value.label };
    } );

  const [ optionAtivo ] = useState( [ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ] );

  useEffect(() => {
    props.changeSidebar( "usuario_municipio" );
    getUsuarioByIdRequest( id );
  }, [] );

  useEffect( () => {
    if( Object.entries( pais ).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao( {} );
      setEstado( {} );
      setOptionEstado( [] );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [ ]);
      setMunicipio( {} );
      setOptionMunicipio( [] );
    }
  }, [ pais ] );

  useEffect( () => {
    const options = props.regioes.map( r => {
      if( r.id === userRegiao.id )
        setRegiao( { value: r.id, label: r.nome } );

      return ( { value: r.id, label: r.nome } );
    } );

    setOptionRegiao( options );
  }, [ props.regioes ]);

  useEffect( () => {
    if( Object.entries( regiao ).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado( {} );
      setRegionalSaude( {} );
      setOptionRegionalSaude( [] );
      setMunicipio( {} );
      setOptionMunicipio( [] );
    }
  }, [ regiao ] );

  useEffect( () => {
    const options = props.estados.map( e => {
      if( e.id === userEstado.id )
        setEstado( { value: e.id, label: e.nome } );

      return ( { value: e.id, label: e.nome } );
    } );

    setOptionEstado( options );
  }, [ props.estados ] );

  useEffect( () => {
    if( Object.entries( estado ).length > 0 ) {
      props.getRegionalHealthByStateRequest( estado.value );
      setRegionalSaude( {} );
      setMunicipio( {} );
      setOptionMunicipio( [] );
    }
  }, [ estado ] );

  useEffect( () => {
    const options = props.regionaisSaude.map( r => {
      if( r.id === userRegionalSaude.id )
        setRegionalSaude( { value: r.id, label: r.nome } );

      return ( { value: r.id, label: r.nome } );
    } );

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ] );

  useEffect( () => {
    if( Object.entries( regionalSaude ).length > 0 ) {
      props.getCityByRegionalHealthRequest( regionalSaude.value );
      setMunicipio( userMunicipio );
    }
  }, [ regionalSaude ] );

  useEffect( () => {
    const options = props.municipiosList.map( m => {
      if( m.id === userMunicipio.id )
        setMunicipio( { value: m.id, label: m.nome } );

      return ( { value: m.id, label: m.nome } );
    } );

    setOptionMunicipio( options );
  }, [ props.municipiosList ] );

  useEffect( () => {
    if( Object.entries( usuarioUpdate ).length > 0 ) {
      let regionalHealth  = {};
      let city            = {};

      switch ( usuarioUpdate.atuacoes[ 0 ].tipoPerfil ) {
        case 1:
          regionalHealth = usuarioUpdate.regionalSaude;
          break;

        default:
          regionalHealth = usuarioUpdate.municipio.regional;
          city = usuarioUpdate.municipio;
          break;
      }

      const state = regionalHealth.estado;
      const region = state.regiao;
      const nation = region.pais;

      setUserRegiao( region );
      setUserEstado( state );
      setUserRegionalSaude( regionalHealth );
      setUserMunicipio( city);

      props.getNationsRequest();

      let [ tipoPerfil ] = Object.entries(perfil)
      .find(([key, value]) => value.id === usuarioUpdate.atuacoes[0].tipoPerfil );

      setNome( usuarioUpdate.nome );
      setCpf( cpfCnpjMask( usuarioUpdate.cpf ) );
      setEmail( usuarioUpdate.email );
      setCelular( usuarioUpdate.celular === undefined ? "" : celularMask( usuarioUpdate.celular ) );
      setUsuario( usuarioUpdate.usuario );
      setPais({ value: nation.id, label: nation.nome });
      setAtivo( { value: usuarioUpdate.ativo, label: usuarioUpdate.ativo ? 'Sim' : 'Não' } );
      setTipoPerfil( { value: perfil[tipoPerfil].id, label: perfil[tipoPerfil].label } );
    }
  }, [ usuarioUpdate ]);

  useEffect(() => {
    if( props.update ) {
      setFlBtnLoading( false );
      props.clearUpdateUser();
    }
  }, [ props.update ]);

  useEffect( () => {
    if( props.cpfValido || props.cpfValido === false )
      setLoadingCpf( false );
  }, [ props.cpfValido ] );

  useEffect( () => {
    if( props.emailValido || props.emailValido === false )
      setLoadingEmail( false );
  }, [ props.emailValido ] );

  /**
   * Essa função aciona o action para validação do CPF
   */
  const validarCpf = () => {
    setLoadingCpf( true );

    props.setCpfValido( null );
    props.validarCpfRequest( cpf, id );
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
   * Se a str contiver somente espaços em branco essa função irá remove-los
   * Se a str contiver um texto e ao final diversos espaços em branco essa
   * função irá remove-los
   * @param {String} str 
   * @returns {String} str
   */
  const formatarString = str => {
    return str.replace( /\s+/g, ' ' ).trim();
  }

  function handleSubmit( e ) {
    e.preventDefault();

    /**
     * Verificando se e-mai le cpf são válidos
     * 
     * Obs.: foi necessário colocar a redundancia == false pois ao carregar a página
     * a variável emailValido e cpfValido inicia com null, o que significa
     * que não houve validação ainda dos valores, porém, como estamos na página
     * de editar os valires das variáveis já foram validados pelo back-end
     * e necessitará somente de outra validação caso o usuárioe edite.
     */
    if( props.emailValido == false || props.cpfValido == false ) {
      props.showNotifyToast( "Existem campos inválidos", "warning" );

      return;
    }

    setFlBtnLoading( true );

    let at = {
      tipoPerfil: null,
      local_id: null
    }

    if( tipoPerfil.value === 1 ) {
      at.tipoPerfil = tipoPerfil.value;
      at.local_id = regionalSaude.value;
    }else {
      at.tipoPerfil = tipoPerfil.value;
      at.local_id = municipio.value;
    }

    updateUsuarioRequest( id, {
      nome,
      cpf,
      email,
      celular,
      ativo: ativo.value,
      atuacoes: [
        at
      ]
    } );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaUsers /></PageIcon>
          Editar Usuário
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">{ usuarioUpdate.nome }</h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
              <form onSubmit={ handleSubmit }>
                <Row>
                  <Col sm='6'>
                    <Row>
                      <Col>
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
                    </Row>
                    <Row>
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
                                props.cpfValido && !loadingCpf ?
                                  <FaCheck className="success" /> :
                                  <div />
                              }
                              {
                                props.cpfValido === false && !loadingCpf ?
                                  <FaTimes className="error" /> :
                                  <div />
                              }
                              {
                                loadingCpf ?
                                  <FaSpinner className="loading" /> :
                                  <div />
                              }
                            </div>
                          </InputGroup>
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
                          <label htmlFor="usuario">Usuário <code>*</code></label>
                          <input id="usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) } disabled required />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="celular">Celular</label>
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
                          <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                          <Select
                            value={ tipoPerfil }
                            styles={ selectDefault }
                            options={ optionPerfil }
                            onChange={ e => setTipoPerfil(e) }
                            required />
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="ativo">Ativo <code>*</code></label>
                          <Select
                            id="ativo"
                            value={ ativo }
                            options={ optionAtivo }
                            styles={ selectDefault }
                            onChange={ e => setAtivo(e) }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm='6'>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="pais">País <code>*</code></label>
                          <Select
                            id="pais"
                            value={ pais }
                            styles={ selectDefault }
                            options={ optionPais }
                            onChange={ e => setPais(e) }
                            isDisabled={ true }
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
                            onChange={ e => setRegiao(e) }
                            isDisabled={ true }
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
                            onChange={ e => setEstado(e) }
                            isDisabled={ true }
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
                            onChange={ e => setRegionalSaude(e) }
                            isDisabled={ true }
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
                            onChange={ e => setMunicipio(e) }
                            isDisabled={ true }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <ContainerFixed>
                  <ButtonSave
                    title="Salvar"
                    className="bg-info text-white"
                    loading={ flBtnLoading }
                    disabled={ flBtnLoading }
                    type="submit" />
                </ContainerFixed>
              </form>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ( {
  municipios: state.municipio.municipios,
  usuarioUpdate: state.usuario.usuarioUpdate,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  municipiosList: state.municipio.municipiosList,
  update: state.usuario.updateUser,
  cpfValido: state.usuario.cpfValido,
  emailValido: state.usuario.emailValido,
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    updateUsuarioRequest,
    getUsuarioByIdRequest,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    getCityByRegionalHealthRequest,
    clearUpdateUser,
    validarCpfRequest,
    setCpfValido,
    validarEmailRequest,
    setEmailValido,
    showNotifyToast,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarUsuario);
