/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../components/ButtonSave';
import ButtonNewObject from '../../components/ButtonNewObject';
import { FaRoad } from 'react-icons/fa';
import ModalAddStreet from './ModalAddStreet';
import ModalUpdateStreet from './ModalUpdateStreet';
import ModalDeleteStreet from './ModalDeleteStreet';
import ButtonClose from '../../components/ButtonClose';
import $ from 'jquery';
import { FaMapSigns } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getLocationByIdRequest, updateLocationRequest } from '../../store/Localidade/localidadeActions';
import { getCategoryRequest } from '../../store/Categoria/categoriaActions';
import { getStreetByLocalityRequest, changeStreetSelect } from '../../store/Rua/ruaActions';

// STYLES
import {
  UlStreet,
  Street,
  ContainerIcon,
  DivDescription,
  Span,
  Container
} from './styles';
import { FormGroup, selectDefault, LiEmpty } from '../../styles/global';
import { ContainerFixed, PageHeader, PageIcon } from '../../styles/util';

const EditarLocalidades = ({ localidade, ruas, getLocationByIdRequest, ...props }) => {
  const [ id ] = useState(props.match.params.id);
  const [ codigo, setCodigo ] = useState(null);
  const [ nome, setNome ] = useState("");
  const [ categoria, setCategoria ] = useState({});
  const [ ativo, setAtivo ] = useState({});
  const [ optionCategoria, setOptionCategoria ] = useState([]);
  const [ optionAtivo ] = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);

  useEffect(() => {
    props.changeSidebar( "localidade" );
    getLocationByIdRequest( id );
    props.getCategoryRequest();
    props.getStreetByLocalityRequest( id );
  }, []);

  useEffect(() => {
    const options = props.categorias.map(( c ) => ({ value: c.id, label: c.nome }));

    setOptionCategoria( options );
  }, [ props.categorias ]);

  useEffect(() => {
    if( Object.entries( localidade ).length > 0 ) {
      setCodigo( localidade.codigo );
      setNome( localidade.nome );
      setCategoria( { value: localidade.categoria.id, label: localidade.categoria.nome } );
      setAtivo( { value: localidade.ativo, label: localidade.ativo ? 'Sim' : 'Não' } );
    }
  }, [ localidade ]);

  function openModalUpdate( index ) {
    props.changeStreetSelect( index );
    $('#modal-editar-rua').modal('show');
  }

  function openModalDelete( index ) {
    props.changeStreetSelect( index );
    $('#modal-excluir-rua').modal('show');
  }

  function handleSubmit( e ) {
    e.preventDefault();

    props.updateLocationRequest( id, {
      codigo,
      nome,
      categoria_id: categoria.value,
      ativo: ativo.value
    });
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaMapSigns /></PageIcon>
          Editar Localidade/Bairro
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Localidade/Bairro: <mark className="bg-info text-white" >{ localidade.nome }</mark></h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
              <Row>
                <Col sm='6'>
                  <form onSubmit={ handleSubmit } >
                    <h4 className="title">Informações da localidade</h4>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="codigo">Código</label>
                          <input id="codigo" value={codigo ? codigo : ""} className="form-control" onChange={ e => setCodigo(e.target.value) } />
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <label htmlFor="categoria">Categoria <code>*</code></label>
                          <Select
                            id="categoria"
                            value={ categoria }
                            styles={ selectDefault }
                            options={ optionCategoria }
                            onChange={ e => setCategoria(e) }
                            required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label htmlFor="nome">Nome <code>*</code></label>
                          <input id="nome" value={nome} className="form-control" onChange={ e => setNome(e.target.value) } required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
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

                    <ContainerFixed>
                      <ButtonSave
                        title="Salvar"
                        className="bg-info text-white"
                        type="submit" />
                    </ContainerFixed>
                  </form>
                </Col>

                <Col sm='6'>
                  <h4 className="title">
                    Ruas
                    <ButtonNewObject
                      title="Cadastrar Rua"
                      data-toggle="modal"
                      data-target="#modal-novo-rua"
                    />
                  </h4>

                  <ListStreet
                    ruas={ ruas }
                    openModalUpdate={ openModalUpdate }
                    openModalDelete={ openModalDelete }
                  />

                  <ModalAddStreet data-localidade-id={ id } />
                  <ModalUpdateStreet />
                  <ModalDeleteStreet />
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ListStreet( props ) {
  let li = props.ruas.map( (rua, index) => (
    <Street key={ index } >
      <Container onClick={ () => props.openModalUpdate( index ) }>
        <ContainerIcon>
          <FaRoad />
        </ContainerIcon>
        <DivDescription>
          <div>
            <mark className="mr-2 bg-info text-white">{ rua.nome }</mark>
            <span>CEP: { rua.cep }</span>
          </div>

          <Span></Span>
        </DivDescription>
      </Container>
      <ButtonClose
        title="Excluir Rua"
        onClick={ () => props.openModalDelete( index ) }
        className="ml-2 text-danger"
      />
    </Street>
  ));

  if( props.ruas.length === 0 ) {
    li = (
      <LiEmpty>
        <h4>Nenhum imóvel encontrado</h4>
      </LiEmpty>
    );
  }

  return (
    <UlStreet>
      { li }
    </UlStreet>
  )
}

const mapStateToProps = state => ({
  municipio: state.appConfig.usuario.municipio,
  localidade: state.localidade.localidade,
  categorias: state.categoria.categorias,
  ruas: state.rua.ruas,
  created: state.rua.created,
  updatedStreet: state.rua.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar,
    getLocationByIdRequest,
    getCategoryRequest,
    updateLocationRequest,
    getStreetByLocalityRequest,
    changeStreetSelect
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarLocalidades);
