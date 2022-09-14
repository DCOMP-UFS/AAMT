/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import { perfil } from '../../config/enumerate';
import { FaUsers } from 'react-icons/fa';
import MaskedInput from '../../components/MaskedInput'
import SelectWrap from '../../components/SelectWrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { updateUsuarioRequest, getUsuarioByIdRequest, clearUpdateUser } from '../../store/Usuario/usuarioActions';
import { getNationsRequest } from '../../store/Pais/paisActions';
import { GetRegionsByNationRequest } from '../../store/Regiao/regiaoActions';
import { GetStatesByRegionRequest } from '../../store/Estado/estadoActions';
import { getRegionalHealthByStateRequest } from '../../store/RegionalSaude/regionalSaudeActions';
import { getCityByRegionalHealthRequest } from '../../store/Municipio/municipioActions';

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { ContainerFixed, PageIcon, PageHeader } from '../../styles/util';

//FUNCTIONS
import { isBlank, onlyLetters, onlyNumbers, isCpfValid} from '../../config/function';

const UsuariosRegEditar = ( { usuarioUpdate, ...props } ) => {
  const [ id ] = useState(props.match.params.id);
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ ativo, setAtivo ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});
  const [ pais, setPais ] = useState({});
  const [ optionPais ] = useState([]);
  const [ regiao, setRegiao ] = useState({});
  const [ optionRegiao, setOptionRegiao ] = useState([]);
  const [ estado, setEstado ] = useState({});
  const [ optionEstado, setOptionEstado ] = useState([]);
  const [ regionalSaude, setRegionalSaude ] = useState({});
  const [ optionRegionalSaude, setOptionRegionalSaude ] = useState([]);
  const [ municipio, setMunicipio ] = useState({});
  const [ optionMunicipio, setOptionMunicipio ] = useState([]);
  const [ flMunicipio, setFlMunicipio] = useState( true );
  const [ flLoading, setFlLoading ] = useState( false );

  const [ userRegiao, setUserRegiao ] = useState({});
  const [ userEstado, setUserEstado ] = useState({});
  const [ userRegionalSaude, setUserRegionalSaude ] = useState({});
  const [ userMunicipio, setUserMunicipio ] = useState({});

  const [isValidNome , setIsValidNome] = useState(true)
  const [isValidCpf , setIsValidCpf] = useState(true)
  const [isValidRg , setIsValidRg] = useState(true)

  const optionPerfil = Object.entries(perfil).map(([key, value]) => {
    return { value: value.id, label: value.label };
  });

  const [ optionAtivo ] = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);

  useEffect( () => {
    props.changeSidebar( "usuario" );
    props.getUsuarioByIdRequest( id );
  }, [] );

  useEffect(() => {
    if( Object.entries(pais).length > 0 ) {
      props.GetRegionsByNationRequest( pais.value );
      setRegiao({});
      setEstado({});
      setOptionEstado([]);
      setRegionalSaude({});
      setOptionRegionalSaude([]);
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ pais ]);

  useEffect(() => {
    const options = props.regioes.map(( r ) => {
      if( r.id === userRegiao.id )
        setRegiao( { value: r.id, label: r.nome } );

      return ({ value: r.id, label: r.nome });
    });

    setOptionRegiao( options );
  }, [ props.regioes ]);

  useEffect(() => {
    if( Object.entries(regiao).length > 0 ) {
      props.GetStatesByRegionRequest( regiao.value );
      setEstado({});
      setRegionalSaude({});
      setOptionRegionalSaude([]);
      setMunicipio({});
      setOptionMunicipio([]);
    }
  }, [ regiao ]);

  useEffect(() => {
    const options = props.estados.map(( e ) => {
      if( e.id === userEstado.id )
        setEstado( { value: e.id, label: e.nome } );

      return ({ value: e.id, label: e.nome });
    });

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
    const options = props.regionaisSaude.map(( r ) => {
      if( r.id === userRegionalSaude.id )
        setRegionalSaude( { value: r.id, label: r.nome } );

      return ({ value: r.id, label: r.nome });
    });

    setOptionRegionalSaude( options );
  }, [ props.regionaisSaude ]);

  useEffect(() => {
    if( Object.entries(regionalSaude).length > 0 ) {
      props.getCityByRegionalHealthRequest( regionalSaude.value );
      setMunicipio( userMunicipio );
    }
  }, [ regionalSaude ]);

  useEffect(() => {
    const options = props.municipiosList.map(( m ) => {
      if( m.id === userMunicipio.id )
        setMunicipio( { value: m.id, label: m.nome } );

      return ({ value: m.id, label: m.nome })
    });

    setOptionMunicipio( options );
  }, [ props.municipiosList ]);

  useEffect(() => {
    if( Object.entries( usuarioUpdate ).length > 0 ) {
      let regionalHealth = {};
      let city = {};

      switch ( usuarioUpdate.atuacoes[0].tipoPerfil ) {
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
      setCpf( usuarioUpdate.cpf );
      setRg( usuarioUpdate.rg );
      setEmail( usuarioUpdate.email );
      setCelular( usuarioUpdate.celular === undefined ? "" : usuarioUpdate.celular );
      setUsuario( usuarioUpdate.usuario );
      setPais({ value: nation.id, label: nation.nome });
      setAtivo( { value: usuarioUpdate.ativo, label: usuarioUpdate.ativo ? 'Sim' : 'Não' } );
      setTipoPerfil( { value: perfil[tipoPerfil].id, label: perfil[tipoPerfil].label } );

      if( perfil[tipoPerfil].id === 1) {
        setFlMunicipio( false );
      }
    }
  }, [ usuarioUpdate ]);

  useEffect(() => {
    setFlLoading( false );
    props.clearUpdateUser();
  }, [ props.updateUser ]);

  function handleSubmit( e ) {
    e.preventDefault();
    setFlLoading( true );

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

    if(isCamposValidos()){
      props.updateUsuarioRequest( id, {
        nome,
        cpf,
        rg,
        email,
        celular,
        ativo: ativo.value,
        atuacoes: [
          at
        ]
      });
    }
  }

  function isCamposValidos() {

    const nomeValido = !isBlank(nome)
    const cpfValido =  isCpfValid(cpf)

    nomeValido      ? setIsValidNome(true)     : setIsValidNome(false)
    cpfValido       ? setIsValidCpf(true)      : setIsValidCpf(false)
    rg              ? setIsValidRg(true)       : setIsValidRg(false)

    return (nomeValido && cpfValido && rg)
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
              <h4 className="title">Usuário: <mark className="bg-info text-white" >{ usuarioUpdate.nome }</mark></h4>
              <p className="text-description">
                Atenção! Os campos com <code>*</code> são obrigatórios
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
                            value={nome} 
                            className="form-control" 
                            onChange={ e =>( onlyLetters(e.target.value) ? setNome(e.target.value) : '' ) } 
                            required />
                            {
                              !isValidNome ?
                                <span class="form-label-invalid">Nome inválido</span> :
                                ''
                            }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="cpf">CPF <code>*</code></label>
                          <MaskedInput
                            id="cpf" 
                            type="cpf"
                            value={ cpf } 
                            className="form-control" 
                            onChange={ e => setCpf(e.target.value) }  
                            required />
                            {
                              !isValidCpf ?
                                <span class="form-label-invalid">CPF inválido</span> :
                              ''
                            }
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="rg">RG <code>*</code></label>
                          <input 
                            id="rg" 
                            value={ rg } 
                            className="form-control" 
                            onChange={ e =>( onlyNumbers(e.target.value) ? setRg(e.target.value) : '') }  
                            required />
                            {
                              !isValidRg ?
                                <span class="form-label-invalid">RG inválido</span> :
                                ''
                            }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="email">E-mail <code>*</code></label>
                          <input id="email" value={ email } type="email" className="form-control" onChange={ e => setEmail(e.target.value) }  required />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="celular">Celular</label>
                          <input
                            id="celular"
                            value={ celular }
                            className="form-control"
                            onChange={ e => ( onlyNumbers(e.target.value) ? setCelular(e.target.value) : '' ) }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="usuario">Usuário</label>
                          <input id="usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) } disabled required />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                          <SelectWrap
                            value={ tipoPerfil }
                            styles={ selectDefault }
                            options={ optionPerfil }
                            onChange={ e => {
                              setTipoPerfil(e)
                              if( e.value === 1 )
                                setFlMunicipio(false);
                              else
                                setFlMunicipio(true);

                            }}
                            required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                      <FormGroup>
                          <label htmlFor="ativo">Ativo <code>*</code></label>
                          <SelectWrap
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
                          <SelectWrap
                            id="pais"
                            value={ pais }
                            styles={ selectDefault }
                            options={ optionPais }
                            onChange={ e => setPais(e) }
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="regiao">Região <code>*</code></label>
                          <SelectWrap
                            id="regiao"
                            value={ regiao }
                            styles={ selectDefault }
                            options={ optionRegiao }
                            onChange={ e => setRegiao(e) }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="estado">Estado <code>*</code></label>
                          <SelectWrap
                            id="estado"
                            value={ estado }
                            styles={ selectDefault }
                            options={ optionEstado }
                            onChange={ e => setEstado(e) }
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="regionalSaude">Regional de saúde <code>*</code></label>
                          <SelectWrap
                            id="regionalSaude"
                            value={ regionalSaude }
                            styles={ selectDefault }
                            options={ optionRegionalSaude }
                            onChange={ e => setRegionalSaude(e) }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="municipio">Município <code>*</code></label>
                          <SelectWrap
                            id="municipio"
                            value={ municipio }
                            styles={ selectDefault }
                            options={ optionMunicipio }
                            onChange={ e => setMunicipio(e) }
                            isDisabled={ !flMunicipio }
                            required={ flMunicipio }
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
                    loading={ flLoading }
                    disabled={ flLoading }
                    type="submit"
                  />
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
  updateUser: state.usuario.updateUser,
  paises: state.pais.paises,
  regioes: state.regiao.regioes,
  estados: state.estado.estados,
  regionaisSaude: state.regionalSaude.regionaisSaude,
  municipiosList: state.municipio.municipiosList
} );

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
    changeSidebar,
    updateUsuarioRequest,
    getUsuarioByIdRequest,
    getNationsRequest,
    GetRegionsByNationRequest,
    GetStatesByRegionRequest,
    getRegionalHealthByStateRequest,
    getCityByRegionalHealthRequest,
    clearUpdateUser
  }, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( UsuariosRegEditar );
