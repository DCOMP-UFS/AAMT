import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import { FaVial, FaSearch, FaTruck } from 'react-icons/fa';
import { Row } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import Select from 'react-select';
import ModalExaminarAmostra from '../../components/ModalExaminarAmostra';
import LoadginGif from '../../assets/loading.gif'
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { 
  getAmostrasByLab, 
  getAmostrasRequest, 
  encaminharAmostrasRequest,
  encaminharAmostrasReset,
  setAmostra,
  setIndexExaminarAmostra,
  setIndexIdAmostrasEncaminhadas
 } from '../../store/Amostra/amostraActions';
import { getLaboratoriosRequest } from '../../store/Laboratorio/laboratorioActions';
import { showNotifyToast } from '../../store/AppConfig/appConfigActions';
import { getOpenAndFinishedCyclesRequest } from '../../store/Ciclo/cicloActions';

// STYLES
import { Button, FormGroup, selectDefault } from '../../styles/global';
import { PageIcon, PageHeader } from '../../styles/util';
import { Container } from './styles';
import { TramRounded } from '@material-ui/icons';

//UTILIES FUNCTIONS
import { ordenadorData } from '../../config/function';
import { dataToStringBr } from '../../config/function';

//COMPONENTS
import { CycleSelector } from '../../components/CycleSelector';

const columns = [
  {
    name: "codigo",
    label: "Cód. Amostra",
    options: {
      filter: false
    }
  },
  {
    name: "createdAt",
    label: "Coletada Em",
    options: {
      filter: false,
      sortCompare: ordenadorData
    }
  },
  {
    name: "encaminhada",
    label: "Encaminhada Em",
    options: {
      filter: false,
      sortCompare: ordenadorData
    }
  },
  {
    name: "Codigo Atividade",
    label: "Cód. Atividade",
    options: {
      filter: false,
      setCellProps: () => ({ style: { paddingLeft: "30px"}}),
    }
  },
  "Atividade",
  {
    name: "objetivo",
    label: "Objetivo",
    options: {
      filter: false,
      setCellProps: () => ({ style: { paddingLeft: "35px"}}),
    }
  },
  "Situação",
  {
    name: "acoes",
    label: "Ações",
    options: {
      filter: false
    }
  }
];

export const Amostras = ({ laboratorios, amostras, usuario, ciclos, ...props }) => {
  const [ rows, setRows ] = useState( [] );
  const [ rowsSelected, setRowsSelected ] = useState( [] );
  const [ laboratoriosOptions, setLaboratoriosOptions ] = useState( [] );
  const [ laboratorioSelect, setLaboratorioSelect ] = useState( { value: null, label: '' } );
  const [ openModalExaminar, setOpenModalExaminar] = useState(false)
  const [ labAmostra, setLabAmostra] = useState({ value: null, label: '' })
  const [ flLoading, setFlLoading ] = useState( false );
  const [ cicloSelecionado, setCicloSelecionado ] = useState(null);
  const [ optionCiclos, setOptionCiclos ] = useState({});

  const handleCloseModalExaminar = () => {setOpenModalExaminar(false)}

  const options = {
    //Não permite que amostras com situação positiva, negativa ou encaminhada
    //sejam selecionados para serem encaminhadas
    isRowSelectable: (dataIndex) => {
      return (rows[dataIndex][6] != "Positiva" && rows[dataIndex][6] != "Negativa" && rows[dataIndex][6] != "Encaminhada")
    },
    customToolbarSelect: () => {
      return (
        <Button
          type="button"
          className="info"
          data-toggle="modal"
          data-target="#modal-encaminhar"
        >Encaminhar Amostras</Button>
      );
    },
    onRowsSelect : ( curRowSelected, allRowsSelected ) => {
      setRowsSelected( allRowsSelected.map( ({ dataIndex }) => dataIndex ) );
    }
  };

  useEffect( () => {
    props.changeSidebar( "amostra" );
    props.getOpenAndFinishedCyclesRequest(usuario.municipio.regional.id)
    props.getLaboratoriosRequest( usuario.municipio.id );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect(() => {
    if( laboratorios.length > 0 ) {
      setLaboratoriosOptions( laboratorios.map( lab => ( {
        value: lab.id, label: lab.nome
      } ) ) );
    }
  }, [ laboratorios ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => {
      let current_date = new Date();
      let dataInicio = new Date( ciclo.dataInicio );
      let dataFim = new Date( ciclo.dataFim );
      current_date.setHours(0,0,0,0);
      dataInicio.setHours(0,0,0,0);
      dataFim.setHours(0,0,0,0);

      const periodo_ciclo = " -> de "+dataToStringBr(ciclo.dataInicio)+" até "+dataToStringBr(ciclo.dataFim)

      if( dataInicio <= current_date && dataFim >= current_date )
        setCicloSelecionado({ 
          value: ciclo.id, 
          label: `${ ciclo.ano }.${ ciclo.sequencia }`+periodo_ciclo, 
          dataInicio: ciclo.dataInicio, 
          dataFim: ciclo.dataFim });

      return (
        { 
          value: ciclo.id, 
          label: `${ ciclo.ano }.${ ciclo.sequencia }`+periodo_ciclo, 
          dataInicio: ciclo.dataInicio, 
          dataFim: ciclo.dataFim 
        }
      );
    });

    setOptionCiclos(options);
  }, [ ciclos ]);

  useEffect(() => {
    if( cicloSelecionado != null) {
      props.getAmostrasRequest( usuario.id, cicloSelecionado.value );
    }
  }, [ cicloSelecionado ]);

  useEffect( () => {
    let r = rows;
    r = amostras.map( ( amostra, index ) => {
      const trabalhoDiario  = amostra.trabalhoDiario;
      const metodologia     = amostra.atividade.metodologia;
      const objetivo        = amostra.atividade.objetivo;
      const dataColeta      = trabalhoDiario.data.split( '-' );

      var dataEncaminhamento = null

      if(amostra.dataEncaminhamento){
        const auxData = amostra.dataEncaminhamento.split( '-' )
        dataEncaminhamento = `${ auxData[ 2 ] }/${ auxData[ 1 ] }/${ auxData[ 0 ] }`
      } 

      let situacaoAmostra = '';
      if( amostra.situacaoAmostra === 1 )
        situacaoAmostra = 'Coletada';
      if( amostra.situacaoAmostra === 2 )
        situacaoAmostra = 'Encaminhada';
      if( amostra.situacaoAmostra === 3 )
        situacaoAmostra = 'Positiva';
      if( amostra.situacaoAmostra === 4 )
        situacaoAmostra = 'Negativa';

      return [
        amostra.codigo,
        `${ dataColeta[ 2 ] }/${ dataColeta[ 1 ] }/${ dataColeta[ 0 ] }`,
        dataEncaminhamento,
        trabalhoDiario.id,
        metodologia.sigla,
        objetivo.sigla,
        situacaoAmostra,
        <Tooltip
          className="bg-warning text-white"
          title= {(() => {
              if (amostra.situacaoAmostra == 1) 
                return "Examinar"
              else if(amostra.situacaoAmostra == 2) 
                return "Onde foi encaminhado?"
              else
                return "Visualizar exame"
            })()}
          onClick={ () => handlerSample( index ) }
        >
          <IconButton aria-label="Examinar">
            {(() => {
              if (amostra.situacaoAmostra == 1) 
                return <FaVial />
              else if(amostra.situacaoAmostra == 2) 
                return <FaTruck/>
              else
                return <FaSearch/> 
            })()}
      
            
          </IconButton>
        </Tooltip>,
      ]
    } );
    setRows( r );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ amostras, props.reload ] );

  const handlerSample = index => {
    //O amostra foi encaminhada e não pode ser examinada pelo supervisor
    //Será exibido um modal com as informações do laboratorio encaminhado
    if(amostras[ index ].situacaoAmostra == 2){
      const lab = laboratoriosOptions.find( lab => lab.value = amostras[ index ].laboratorio_id)
      setLabAmostra(lab)
      $( '#modal-laboratorio-enviado' ).modal( 'show' );
  
    }
    else{
      props.setIndexExaminarAmostra(index)
      props.setAmostra( amostras[ index ] );
      setOpenModalExaminar(true)
      $( '#modal-examinar' ).modal( 'show' );
    }
  }

  const enviarAmostras = e => {
    e.preventDefault();

    if( laboratorioSelect.value ) {
      setFlLoading(true)
      const index_id_amostras = rowsSelected.map( function(r) {return {index: r, id: amostras[ r ].id }} );
      props.setIndexIdAmostrasEncaminhadas(index_id_amostras)
      const amostras_ids = rowsSelected.map( r => amostras[ r ].id );
      props.encaminharAmostrasRequest( laboratorioSelect.value, amostras_ids );
    }
  }

  useEffect(() => {
    if( props.amostrasEncaminhadas ) {
      props.showNotifyToast("Amostra(s) encaminhada(s) com sucesso", "success")
      $( '#modal-encaminhar' ).modal( 'hide' );
    }
    setFlLoading(false)
    props.encaminharAmostrasReset()
  }, [ props.amostrasEncaminhadas ]);

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaVial /></PageIcon>
          Coleta de Amostras
        </h3>
      </PageHeader>

      <CycleSelector 
        optionCiclos={optionCiclos} 
        cicloSelecionado={cicloSelecionado} 
        setCicloSelecionado={ (e) => setCicloSelecionado(e) } />
      {
        (() => {
          if(props.buscandoAmostras){
            return (
              <div style={{ marginTop: "25%", marginLeft: "50%" }}>
                <CircularProgress color="inherit" />
              </div>
            )
          }
          else if(cicloSelecionado != null) {
            return (
              <section className="card-list">
                <Row>
                  <article className="col-md-12 stretch-card">
                    <Table
                      title={ `Amostras` }
                      columns={ columns }
                      data={ rows }
                      options={ options }
                    />

                    <ModalExaminarAmostra id="modal-examinar" isOpen={openModalExaminar} handleClose={handleCloseModalExaminar}/>

                    <Modal id="modal-encaminhar" title="Encaminhar amostras">
                      <form onSubmit={ e => enviarAmostras( e ) }>
                        <ModalBody>
                          <FormGroup>
                            <label htmlFor="laboratorio">Laboratório <code>*</code></label>
                            <Select
                              id="laboratorio"
                              value={ laboratorioSelect }
                              options={ laboratoriosOptions }
                              styles={ selectDefault }
                              onChange={ e => setLaboratorioSelect( e ) }
                              className={ laboratorioSelect.value ? '' : 'invalid' }
                            />
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button className="secondary" data-dismiss="modal" disabled={ flLoading }>Cancelar</Button>
                          <Button 
                            type="submit" 
                            className="info"
                            disabled={ flLoading }>
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
                        </ModalFooter>
                      </form>
                    </Modal>

                    <Modal id="modal-laboratorio-enviado" title="Informações Laboratório">
                      
                      <ModalBody>
                        <FormGroup>
                          <label htmlFor="laboratorio">Laboratório</label>
                            <input
                              value={ labAmostra.label }
                              type="text"
                              className="form-control"
                              disabled={true}
                            />         
                        </FormGroup>
                      </ModalBody>
                    </Modal>

                  </article>
                </Row>
              </section>
            )
          }
        })()
      }
    </Container>
  );
}

const mapStateToProps = state => ( {
  usuario     : state.appConfig.usuario,
  amostras    : state.amostra.amostras,
  amostrasEncaminhadas: state.amostra.amostrasEncaminhadas,
  laboratorios: state.nw_laboratorio.laboratorios,
  ciclos      : state.ciclo.ciclos,
  buscandoAmostras: state.amostra.buscandoAmostras,
  reload      : state.amostra.reload,

} );

const mapDispatchToProps = {
  changeSidebar,
  getAmostrasRequest,
  getAmostrasByLab,
  getLaboratoriosRequest,
  encaminharAmostrasRequest,
  encaminharAmostrasReset,
  setAmostra,
  showNotifyToast,
  getOpenAndFinishedCyclesRequest,
  setIndexExaminarAmostra,
  setIndexIdAmostrasEncaminhadas
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Amostras );
