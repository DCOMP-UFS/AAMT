/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { IoIosPaper } from 'react-icons/io';
import ButtonNewObject from '../../components/ButtonNewObject';
import ModalAddActive from './ModalAddActive';
import ModalUpdateActive from './ModalUpdateActive';
import ButtonClose from '../../components/ButtonClose';
import ButtonSave from '../../components/ButtonSave';
import $ from 'jquery';
import { FaSyncAlt } from 'react-icons/fa';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import {
  createCycleRequest,
  changeFlAddActive,
  getCyclesRequest,
} from "../../store/Ciclo/cicloActions";

// STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import {
  UlIcon,
  LiIcon,
  ContainerUl,
  ContainerIcon,
  DivDescription,
  LiEmpty,
  Span,
  ContainerFixed,
  PageIcon,
  PageHeader
} from '../../styles/util';

function CadastrarCiclo({ regionalSaude_id, ciclos, ...props }) {
  const [ reload, setReload ] = useState(false);
  const [ indexAtv, setIndexAtv ] = useState( null );
  const [ ano, setAno ] = useState({});
  const [ sequencia, setSequencia ] = useState({});
  const [ dataInicio, setDataInicio ] = useState("");
  const [ dataFim, setDataFim ] = useState("");
  const [ atividades, setAtividades ] = useState([]);
  const [ optionSequencia ] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ]);
  const [ optionAno, setOptionAno ] = useState([]);
  const [ flBtnLoading, setFlBtnLoading ] = useState( false );
  const [ minDate, setMinDate ] = useState( "" );
  const [ maxDate, setMaxDate ] = useState( "" );
  const [ isModalAddActiveOpen, setIsModalAddActiveOpen ] = useState( false );
  const [ isModalUpdateActiveOpen, setIsModalUpdateOpen ] = useState( false );

  const handleCloseAddActive = () => {setIsModalAddActiveOpen(false)}
  const handleCloseUpdateActive = () => {setIsModalUpdateOpen(false)}

  useEffect(() => {
    props.changeSidebar( "ciclo", "ci_cadastrar" );
    props.getCyclesRequest( regionalSaude_id );
  }, []);

  useEffect(() => {
    let today = new Date();
    //today.setDate(today.getDate() - 1);

    if (ciclos.length === 0) {
      setSequencia({ value: 1, label: "1" });
      setMinDate(today.toISOString().split("T")[0]);
    } else {
      let lastCycle = ciclos.at(-1);
      let tomorrow = new Date(lastCycle.dataFim);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSequencia({ value: lastCycle.sequencia + 1, label: (lastCycle.sequencia + 1).toString() });
      setMinDate(tomorrow.toISOString().split("T")[0]);
    }

    const current_year = new Date().getFullYear();
    let optionYear = [];

    // Cria a lista de opções de anos
    // for (let index = 0; index < 6; index++) {
    //   optionYear.push({ value: current_year + index, label: current_year + index });
    // }

    // Define o ano atual e seta o ano no input
    optionYear.push({ value: current_year, label: current_year });
    setAno(optionYear[0]);

    setMaxDate(`${today.getFullYear()}-12-31`);
    setOptionAno(optionYear);
  }, [ciclos])

  // Evita que a dataFim seja anterior a dataInicio
  useEffect(() => {
    if (dataInicio) {
      let endDate = new Date(dataInicio);
      endDate.setDate(endDate.getDate() + 1);
      let endDateStringFormat = endDate.toISOString().split("T")[0];
      document.getElementById("dataFim").min = endDateStringFormat;
      setDataFim((dataFim <= dataInicio && dataFim) ? endDateStringFormat : dataFim);
    }
  }, [dataInicio])

  function addAtividade( atividade ) {
    setAtividades( [...atividades, atividade] );
    props.changeFlAddActive( true );
    $("#modal-novo-atividade").modal('hide');
  }

  function updateAtividade( atividade ) {
    let atvs = atividades;
    atvs[ indexAtv ] = atividade;
    setAtividades( atvs );
    setReload( !reload );

    $("#modal-editar-atividade").modal('hide');
  }

  function removeActive( index ) {
    let atvs = atividades;
    atvs.splice( index, 1 );
    setAtividades( atvs );
    setReload( !reload );
  }

  function handleSubmit( e ) {
    e.preventDefault();
    setFlBtnLoading( true );
    props.createCycleRequest(
      ano.value,
      sequencia.value,
      dataInicio,
      dataFim,
      regionalSaude_id,
      atividades
    );
  }

  return (
    <>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaSyncAlt /></PageIcon>
          Cadastrar Ciclo
        </h3>
      </PageHeader>
      <section className="card-list">
        <div className="row">

          {/* Formulário básico */}
          <article className="col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Ciclo</h4>
              <p className="text-description">
                Atenção! Os campos com <code>*</code> são obrigatórios
              </p>
              <Row>
                <Col sm='6'>
                  <form onSubmit={ handleSubmit }>
                    <ContainerFixed>
                      <ButtonSave
                        title="Salvar"
                        className="bg-info text-white"
                        loading={ flBtnLoading }
                        disabled={ flBtnLoading }
                        type="submit" />
                    </ContainerFixed>

                    <h4 className="title">Informações do ciclo</h4>
                    <p className="text-description">
                      Atenção! As atividades cadastradas neste ciclo serão aplicadas a todos os municípios de responsabilidade da regional de saúde
                    </p>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="ano">Ano <code>*</code></label>
                          <Select
                            id="ano"
                            value={ano}
                            options={optionAno}
                            onChange={e => setAno(e)}
                            styles={selectDefault}
                            isRequired={true}
                            required
                            isDisabled
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="sequencia">Sequência <code>*</code></label>
                          <Select
                            id="sequencia"
                            value={ sequencia }
                            options={ optionSequencia }
                            onChange={ e => setSequencia( e ) }
                            styles={ selectDefault }
                            required
                            isDisabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="ano">Data de início <code>*</code></label>
                          <input
                            type="date"
                            className="form-control"
                            value={ dataInicio }
                            min={minDate}
                            max={maxDate}
                            onChange={ e => setDataInicio( e.target.value ) }
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <label htmlFor="sequencia">Data de fim <code>*</code></label>
                          <input
                            id="dataFim"
                            type="date"
                            className="form-control"
                            value={ dataFim }
                            min={minDate}
                            max={maxDate}
                            onChange={ e => setDataFim( e.target.value ) }
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                  </form>
                </Col>

                <Col sm='6'>
                  <h4 className="title">
                    Atividades
                    <ButtonNewObject
                      title="Cadastrar Atividade"
                      data-toggle="modal"
                      data-target="#modal-novo-atividade"
                      onClick={() => {setIsModalAddActiveOpen(true)}}
                    />
                    <small>Quais atividades deseja executadar neste ciclo?</small>
                  </h4>

                  <ListActive
                    atividades={ atividades }
                    deleteAction={ removeActive }
                    setIndexAtv={ setIndexAtv }
                    setIsModalUpdateOpen={ setIsModalUpdateOpen }
                  />
                </Col>

                <ModalAddActive addAtividade={ addAtividade } isOpen={isModalAddActiveOpen} handleClose={handleCloseAddActive}/>
                <ModalUpdateActive
                  atividade={ atividades[ indexAtv ] }
                  updateAtividade={ updateAtividade }
                  isOpen={isModalUpdateActiveOpen}
                  handleClose={handleCloseUpdateActive}
                />
              </Row>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ListActive({ atividades, deleteAction, setIndexAtv, setIsModalUpdateOpen }) {
  let list = atividades.map( (atv, index) => (
    <LiIcon
      key={ index }
      onClick={
        () => {
          setIndexAtv( index );
          setIsModalUpdateOpen(true);
          $("#modal-editar-atividade").modal('show');
        }
      }
    >
      <ContainerUl>
        <ContainerIcon>
          <IoIosPaper />
        </ContainerIcon>
        <DivDescription>
          <div>
            <span className="mr-2">{ atv.selectMetodologia.label }</span>
            <span>{ atv.selectObjetivo.label }</span>
          </div>
          <Span>
            <ButtonClose
              title="Excluir imóvel"
              onClick={ () => deleteAction( index ) }
              className="ml-2 text-danger p-1"
            />
          </Span>
        </DivDescription>
      </ContainerUl>
    </LiIcon>
  ));

  if( list.length === 0 ) {
    list = <LiEmpty className="p-2"><h4 className="title w-100 text-center m-0">Nenhuma atividade cadastrada</h4></LiEmpty>
  }

  return (
    <UlIcon>
      { list }
    </UlIcon>
  );
}

const mapStateToProps = (state) => ({
  regionalSaude_id: state.appConfig.usuario.regionalSaude.id,
  ciclos: state.ciclo.ciclos
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeSidebar,
      createCycleRequest,
      changeFlAddActive,
      getCyclesRequest,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadastrarCiclo);
