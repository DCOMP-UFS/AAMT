/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import { perfil } from '../../config/enumerate';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';
import MaskedInput from '../../components/MaskedInput'
import SelectWrap from '../../components/SelectWrap';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS 
import { createUsuarioRequest, clearCreateUser } from '../../store/Usuario/usuarioActions';
import { getLaboratoriosRequest } from '../../store/Laboratorio/laboratorioActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

//FUNCTIONS
import { isBlank, onlyLetters, onlyNumbers, isCpfValid} from '../../config/function';


function ModalAdd({ createUsuarioRequest, municipio, createUser, laboratorios, isOpen, handleClose, ...props }) {
  const [ nome, setNome ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ rg, setRg ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ celular, setCelular ] = useState("");
  const [ usuario, setUsuario ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ tipoPerfil, setTipoPerfil ] = useState({});
  const [ optionsLaboratorio, setOptionsLaboratorio] = useState([]);
  const [ laboratorio, setLaboratorio ] = useState({});
  const [ flLoading, setFlLoading ]     = useState( false );

  const [isValidNome , setIsValidNome] = useState(true)
  const [isValidCpf , setIsValidCpf] = useState(true)
  const [isValidRg , setIsValidRg] = useState(true)
  const [isValidUsuario , setIsValidUsuario] = useState(true)
  const [isValidSenha , setIsValidSenha] = useState(true)

  const optionPerfil = Object.entries(perfil)
    .filter( ([ key, value ]) => {
      if( value.id > 1 )
        return true;
      else
        return false
    })
    .map(([key, value]) => {
      return { value: value.id, label: value.label };
    });
  
  //É acionado toda fez que o modal é aberto
  //No momento que o modal é aberto, todas as informações
  //que o usuario digitou anteriormente são limpas
  useEffect(() => {
    if(isOpen)
      clearInput()

    handleClose()
  }, [isOpen]);
  
  useEffect(() => {
    props.getLaboratoriosRequest(municipio.id)
    props.clearCreateUser();
  }, []);

  useEffect(() => {
    const options = laboratorios.map(lab => ({value: lab.laboratorio_id, label: lab.nome}));
    setOptionsLaboratorio(options)
  }, [laboratorios]);

  useEffect(() => {
    if( createUser ) {
      setFlLoading(false)
      $('#modal-novo-usuario').modal('hide');
      setNome("");
      setCpf("");
      setRg("");
      setEmail("");
      setCelular("");
      setUsuario("");
      setSenha("");
      setTipoPerfil({});
      setLaboratorio({});
    }
    props.clearCreateUser();
  }, [ createUser ]);

  useEffect(() => {
    setLaboratorio({});
  }, [ tipoPerfil ]);

  function clearInput() {
    setNome("");
    setCpf("");
    setRg("");
    setEmail("");
    setCelular("");
    setUsuario("");
    setSenha("");
    setTipoPerfil({});
    setLaboratorio({});
  }

  function handleCadastrar( e ) {
    e.preventDefault();
    if( isCamposValidos() ){
      setFlLoading(true)
      createUsuarioRequest(
        nome,
        cpf,
        rg,
        email,
        celular,
        usuario,
        senha,
        tipoPerfil.value,
        null,
        municipio.id,
        laboratorio.value,
      );
    }
  }

  function isCamposValidos() {
    const nomeValido = !isBlank(nome)
    const cpfValido =  isCpfValid(cpf)
    const usuarioValido = !isBlank(usuario)
    const senhaValida = !isBlank(senha)

    nomeValido      ? setIsValidNome(true)     : setIsValidNome(false)
    cpfValido       ? setIsValidCpf(true)      : setIsValidCpf(false)
    rg              ? setIsValidRg(true)       : setIsValidRg(false)
    usuarioValido   ? setIsValidUsuario(true)  : setIsValidUsuario(false)
    senhaValida     ? setIsValidSenha(true)    : setIsValidSenha(false)

    return (nomeValido && cpfValido && rg && usuarioValido && senhaValida)
  }

  return(
    <Modal
      id="modal-novo-usuario"
      title={<span>Cadastrar Usuário <mark className="bg-info text-white">{municipio.nome}</mark></span>}
      size='lg'
    >
      <form onSubmit={ handleCadastrar }>
        <ModalBody>
          <p className="text-description">
            Atenção! Os campos com <code>*</code> são obrigatórios
          </p>
          <Row>
            <Col>
              <FormGroup>
                <label htmlFor="tipoPerfil">Perfil <code>*</code></label>
                <SelectWrap
                  value={ tipoPerfil }
                  styles={ selectDefault }
                  options={ optionPerfil }
                  onChange={ e => setTipoPerfil(e) }
                  required />
                {/* <input id="tipoPerfil" className="form-control" onChange={ e => setTipoPerfil(e.target.value) }  /> */}
              </FormGroup>
            </Col>
          </Row>
          <Row className={tipoPerfil.value !== 5 ? "d-none" :""}>
            <Col>
              <FormGroup>
                <label htmlFor="tipoPerfil">Laboratorio vinculado <code>*</code></label>
                <SelectWrap
                  value={ laboratorio }
                  styles={ selectDefault }
                  options={ optionsLaboratorio }
                  onChange={ e => setLaboratorio(e) }
                  required={tipoPerfil.value !== 5 ? false : true} />
              </FormGroup>
            </Col>
          </Row>
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
                <label htmlFor="celular">Telefone/Ramal</label>
                <input 
                  id="celular" 
                  value={ celular } 
                  className="form-control" 
                  onChange={ e => ( onlyNumbers(e.target.value) ? setCelular(e.target.value) : '' ) } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="usuario">Usuário <code>*</code></label>
                <input id="usuario" value={ usuario } className="form-control" onChange={ e => setUsuario(e.target.value) }  required />
                  {
                    !isValidUsuario ?
                      <span class="form-label-invalid">Usuario inválido</span> :
                      ''
                  }
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="senha">Senha <code>*</code></label>
                <input id="senha" value={ senha } type="password" className="form-control" onChange={ e => setSenha(e.target.value.trim()) }  required />
                {
                  !isValidSenha ?
                    <span class="form-label-invalid">Senha inválida</span> :
                    ''
                }
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

const mapStateToProps = state => ({
  municipio: state.appConfig.usuario.municipio,
  createUser: state.usuario.createUser,
  laboratorios: state.nw_laboratorio.laboratorios
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createUsuarioRequest,
    clearCreateUser,
    getLaboratoriosRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
