import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../../components/PopDescription';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { FaUser } from 'react-icons/fa';
import Loading from '../../../../../components/Loading';
import Select from 'react-select'
import { situacaoLadoEnum } from '../../../../../config/enumerate.js';

// ACTIONS
import { toggleLado, getRotaEquipeRequest, setFl_loading, checarRota, resetToggleLado } from '../../../../../store/Atividade/atividadeActions';
import { showNotifyToast } from '../../../../../store/AppConfig/appConfigActions';
// STYLES
import { Container, Block, Usuario, Avatar, StreetCard } from './styles';
import { Button } from '../../../../../styles/global';

/**
 * Componente de step da página de planejamento de rotas.
 * Este step é responsável por selecionar as ruas que um agente irá trabalhar e
 * solicitar o planejamento de sua rota.
 * 
 * @param {Boolean} fl_loading alternador do componente loading
 * @param {Integer} indexEquipe index da equipe selecionada no array de equipes
 * @param {Integer} indexMembro membro selecionado para planejamento da rota
 * @param {Array} rota_equipe quarteiroes planejados para equipe selecionada
 * @param {Array} equipes lista de equipes de responsabilidade do supervisor 
 * @param {Object} props demais parametros do componente
 * @returns 
 */
export const SelecionarQuarteiroes = ( { fl_loading, indexEquipe, indexMembro, rota_equipe, equipes, indexAtividade, ...props } ) => {

  const [ metodoFiltragem, setMetodoFiltragem ] = useState({ label: "Sem filtragem", value: null })
  const [ optionsMetodoFiltragem, setOptionsMetodoFiltragem ] = useState([
    { label: "Sem filtragem", value: null },
    { label: "Número", value: 1 },
    { label: "Bairro/localidade", value: 2 },
    { label: "Zona", value: 3 },

  ]);
  const [ opcaoSelecionada, setOpcaoSelecionada ] = useState( '' )
  const [ opcoesDisponiveis, setOpcoesDisponiveis ] =  useState([])
  const [ opcoesLocalidades, setOpcoesLocalidades ] =  useState([])
  const [ opcoesZonas, setOpcoesZonas ] =  useState([])
  const [ fl_filtragem, setFl_Filtragem] = useState(false)
  const [ rotaEquipeFiltrada, setRotaEquipeFiltrada] = useState([])

  /**
   * Este effect é acionado assim que o componente é montado.
   * Sua responsabilidade é ativar o componente de loading e solicitar as rotas planejadas para equipe.
   * Ele tambem é responsavel por
   */
  useEffect( () => {
    if( indexEquipe !== -1 ) {
      props.setFl_loading( true );

      //Monta a lista das localidades que a équipe é responsavel
      let opcoes_localidades = equipes[ indexEquipe ].localidadesEquipe.map( loc => ({label:loc.nome, value:loc.id}) )
      setOpcoesLocalidades(opcoes_localidades)

      //Monta a lista de zonas que a equipe é responsavel
      let opcoes_zonas = equipes[ indexEquipe ].zonasEquipe.map( z => ({label:z.nome, value:z.id}) )
      setOpcoesZonas(opcoes_zonas)

      //Busca as rotas ja planejadas hoje pela equipe 
      props.getRotaEquipeRequest( equipes[ indexEquipe ].id );
      
    }
  }, [ indexEquipe, indexAtividade ] );

  /**
   * Ao selecionar um membro de uma equipe se sim, é verificado se este membro ja possui uma
   * rota planejada para hoje atravers do metodo checarRota(). Caso o usuario possui uma rota para hoje,
   * o metodo checarRotar() faz com que os lados dos quarteirões da rota de hoje sejam exibidos para o usuario
   * 
   */
  useEffect( () => {
    if( indexMembro > -1 ){
      //props.resetToggleLado();
      setMetodoFiltragem({ label: "Sem filtragem", value: null })
      props.checarRota();
    }
  }, [ indexEquipe, indexMembro] );

  /*
    UseEffect faz a filtragem da lista de quarteirões de acordo com o
    tipo de filtro selecionado
  */
  useEffect( () => {
    //Sem Filtragem
    if(metodoFiltragem.value == null)
      setRotaEquipeFiltrada(rota_equipe)
    else{
      let lista_filtrada = []
      
      //Numero
      if(metodoFiltragem.value == 1)
        lista_filtrada = rota_equipe.filter( q => q.numero == parseInt(opcaoSelecionada))
      //Bairro/localidade
      else if(metodoFiltragem.value == 2)
        lista_filtrada = rota_equipe.filter( q => q.localidade_id == opcaoSelecionada.value)
      //Zona
      else if(metodoFiltragem.value == 3)
        lista_filtrada = rota_equipe.filter( q => q.zona_id == opcaoSelecionada.value)

      setRotaEquipeFiltrada(lista_filtrada)
      
    }
  }, [ rota_equipe, fl_filtragem ] );

  //Todas vez que o tipo de filtragem é mudado, este useEffect adequar as opções disponiveis para a filtragem
  //de acordo com o tipo de filtragem escolhida
  useEffect( () => {
    //Numero
    if(metodoFiltragem.value == 1)
      setOpcaoSelecionada('')
    //Bairro/Localidade
    else if(metodoFiltragem.value == 2){
      setOpcaoSelecionada(undefined)
      setOpcoesDisponiveis(opcoesLocalidades)
    }
    //Zona
    else if(metodoFiltragem.value == 3){
      if(opcoesZonas.length == 0)
        setOpcaoSelecionada({label:'Sem zonas disponíveis',value:null})
      else
        setOpcaoSelecionada(undefined)

      setOpcoesDisponiveis(opcoesZonas)
    }
    //Sem filtragem
    else{
      setOpcaoSelecionada(undefined)
      setOpcoesDisponiveis([])
    }
  }, [ metodoFiltragem ] );

  const verificarFiltragem = () => {

    let valido = true
  
    if(metodoFiltragem.value == 1){
      if(opcaoSelecionada == ''){
        valido = false
        props.showNotifyToast( "Informe o número para a filtragem", "warning" );
      }
    }
    else if(metodoFiltragem.value == 2){
      if(opcaoSelecionada == undefined){
        valido = false
        props.showNotifyToast( "Informe o bairro/localidade para a filtragem", "warning" );
      }
    }
    else if(metodoFiltragem.value == 3){
      if(opcaoSelecionada == undefined || opcaoSelecionada.value == null){
        valido = false
        props.showNotifyToast( "Informe a zona para a filtragem", "warning" );
      }
    } 

    if(valido)
      setFl_Filtragem(!fl_filtragem)
  }

  return (
    <Container>
      <Usuario>
        <Avatar>
          <FaUser />
        </Avatar>
        { indexEquipe > -1 && indexMembro > -1 ? equipes[ indexEquipe ].membros[ indexMembro ].usuario.nome : '' }
      </Usuario>
      
      <Row>
        <Col md="12">
          <h4 className="title">
            Selecione os Quarteirões
            <PopDescription
              title="Seleção de Quarteirões"
              placement="right"
              content="Selecione os quarteirões que o agente irá trabalhar."
            />
          </h4>
          <Row>
            <Col md="3">
              <label htmlFor="Filtro">Filtragem por:</label>
              <Select
                id="filtro"
                value={ metodoFiltragem }
                options={ optionsMetodoFiltragem }
                onChange={ e => setMetodoFiltragem(e) }
              />
            </Col>
            <Col className={ metodoFiltragem.value == 1 ? "" : "d-none"}  md="3">
              <label>Informe o número</label>
              <input
                value={  metodoFiltragem.value == 1 ? opcaoSelecionada : 0 }
                type="number"
                style={{height:"37px", width:"150px", borderRadius:"4px"}}
                onChange={ e => setOpcaoSelecionada( e.target.value.toString() ) }
              />
            </Col>
            <Col className={ metodoFiltragem.value == 2  || metodoFiltragem.value == 3 ? "" : "d-none"} md="5">
              <label htmlFor="opcoes">{ metodoFiltragem.value == 2 ? "Bairro/localidade" : "Zona"}</label>
              <Select
                id="opcoes"
                placeholder=""
                value={ opcaoSelecionada }
                options={ opcoesDisponiveis }
                onChange={ e => setOpcaoSelecionada(e) }
              />
            </Col>
            <Col md="2">
              <div style={{marginTop:"22px"}}>
                <Button
                  className="info"
                  onClick={ verificarFiltragem }
                >Filtrar</Button>
              </div>
              
            </Col>
          </Row>
          { 
            (() => {
              
  
              if(indexEquipe > -1 && indexMembro > -1 && equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje.id){

                let trabalhoDiarioHoje = equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje

                //Significa que o usuario ja possui trabalho diario não finalizado, mas é de outra equipe que ele pertence
                if(trabalhoDiarioHoje.equipe.id != equipes[ indexEquipe ].id && trabalhoDiarioHoje.horaFim == null ){
                  return (
                    <div style={{width:"65%", marginTop:"15px"}}>
                      <div className="card">
                        <label className="m-0">
                
                          <b style={{color:"red"}}>Atenção: </b> 
                          Não é possivel passar uma rota para este agente, poís ele já recebeu hoje outra rota, que ainda não foi finalizada,
                          na equipe com apelido "{trabalhoDiarioHoje.equipe.apelido}".
                      
                        </label>
                      </div>
                    </div>
                  )
                }
                else if(trabalhoDiarioHoje.horaInicio == null && trabalhoDiarioHoje.horaFim == null){
                  return (
                    <div style={{width:"65%", marginTop:"15px"}}>
                      <div className="card">
                        <label className="m-0">
                
                          <b style={{color:"red"}}>Atenção:</b> Agente já possui rota para hoje, mas ainda é possivel alterá-la.
                          
                      
                        </label>
                      </div>
                    </div>
                  )
                }
                else if(trabalhoDiarioHoje.horaInicio != null && trabalhoDiarioHoje.horaFim == null){
                  return (
                    <div style={{width:"65%", marginTop:"15px"}}>
                      <div className="card">
                        <label className="m-0">
                
                          <b style={{color:"red"}}>Atenção:</b> Agente já possui rota para hoje, não sendo possível mais alterá-la por ter sido iniciada.
                          
                      
                        </label>
                      </div>
                    </div>
                  )
                }
              }
              else  
                return (<div></div>)
             }) ()
          } 
        </Col>
      </Row>
      <Row id="list-quarteirao" style={ { paddingBottom: '30px', minHeight: '500px', maxHeight: '500px', overflow: 'auto' } }>
        <ExibirQuarteiroes 
          rota_equipe={ rotaEquipeFiltrada } 
          fl_loading={ fl_loading }
          equipes={ equipes }
          indexEquipe={ indexEquipe }
          indexMembro={ indexMembro }
          toggleLado={ props.toggleLado }
          atividade= {props.atividades[indexAtividade]}
        />
      </Row>
    </Container>
  )
}

const ExibirQuarteiroes = ( { rota_equipe, fl_loading, indexEquipe, indexMembro, equipes, toggleLado, atividade, ...props } ) => {
  var disableAll = false

  if(indexEquipe > -1 && indexMembro > -1){
    let trabalhoDiarioHoje = equipes[ indexEquipe ].membros[ indexMembro ].trabalhoDiarioHoje

    //Quarteirões serão desbilitados caso:
    // 1- Agente possui um trabalho diario não finalizado para hoje em outra equipe diferente da selecionada
    // 2- Agente possui um trabalho diario INICIADO, mas não finalizado, na equipe selecionada
    if( trabalhoDiarioHoje.equipe && trabalhoDiarioHoje.equipe.id != equipes[indexEquipe].id && !trabalhoDiarioHoje.horaFim  
        || trabalhoDiarioHoje.horaInicio && !trabalhoDiarioHoje.horaFim)
      disableAll = true
  }
    

  if( fl_loading ) {
    return <Loading element="#list-quarteirao" />;
  } else if( rota_equipe.length == 0 ) {
    return (
      <div className="info-empty text-muted">
        <p>Não existe nenhum quarteirão planejado para sua equipe</p>
      </div>
    );
  } else {
    return rota_equipe.map( ( quarteirao, indexQuarteirao ) => (
      <Col key={ "qrt_" + quarteirao.id } xs="12" sm="6">
        <Block >
          <label>
            {
              quarteirao.sequencia == null ?
              `Nº ${ quarteirao.numero } - LOC: ${quarteirao.localidade_nome}` :
              `Nº ${ quarteirao.numero } - SEQ: ${quarteirao.sequencia }  - LOC: ${quarteirao.localidade_nome}`
            }
          </label>

          <ul className="sides">
            {
              quarteirao.lados.map( ( lado, indexLado ) => {
                let fl_usuario_selecionado = false;

                if( indexEquipe > -1 && indexMembro > -1 && lado.situacao === 4 ) {
                  if( equipes[ indexEquipe ].membros[ indexMembro ].usuario_id === lado.usuario_id ) {
                    fl_usuario_selecionado = true;
                  } else {
                    fl_usuario_selecionado = false;
                  }
                }

                return (
                  <li
                    key={ "lado_" + lado.id }
                    className={
                      disableAll ? 'disabled' :
                      lado.situacao === 3 || atividade.situacao === 3 ? 'disabled' :
                      lado.situacao === 4 && !fl_usuario_selecionado ? 'disabled' :
                      ''
                    }
                    onClick={ () => {
                      if( !disableAll && !(lado.situacao == 3 || atividade.situacao == 3 ) && !(lado.situacao === 4 && !fl_usuario_selecionado) )
                        toggleLado( quarteirao.dataIndex, indexLado )
                    }}
                  >
                    <Tooltip
                      title= { lado.rua.nome }
                    >
                      {/* situacao_lado_id
                      1 - Em aberto
                      2 - Fazendo
                      3 - Concluído
                      4 - Planejado 
                      5 - Concluído com pendência
                      */}
                      <StreetCard className={
                        lado.situacao === 2 ? 'alternative2' :
                        lado.situacao === 3 ? 'success' :
                        lado.situacao === 4 ? 'warning' :
                        lado.situacao === 5 ? 'alternative1' :
                        ''
                      }>
                        <div className="body">
                          <Checkbox
                            color="primary"
                            className="p-0 pr-2"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            checked={ lado.selected ? lado.selected : false }
                          />
                          { "Lado "+lado.numero }
                        </div>
                        <div className="description">
                          <span>{ `${ lado.rua.nome}` }</span>
                        </div>
                        <div className="footer">
                          <span>{
                            situacaoLadoEnum.find( sit => sit.id === lado.situacao ).label
                          }</span>
                          <span>{ `${ lado.vistorias }/${ lado.imoveis }` }</span>
                        </div>
                      </StreetCard>
                    </Tooltip>
                  </li>
                )
              })
            }
          </ul>
        </Block>
      </Col>
    ) );
  }
};

const mapStateToProps = state => ( {
  usuario        : state.appConfig.usuario,
  equipes        : state.atividade.equipes,
  rota_equipe    : state.atividade.rota_equipe,
  indexEquipe    : state.atividade.indexEquipe,
  indexMembro    : state.atividade.indexMembro,
  reload         : state.atividade.reload,
  fl_loading     : state.atividade.fl_loading,
  indexAtividade : state.atividade.indexAtividade,
  atividades     : state.atividade.atividades
} );

const mapDispatchToProps = {
  toggleLado,
  getRotaEquipeRequest,
  setFl_loading,
  checarRota,
  resetToggleLado,
  showNotifyToast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SelecionarQuarteiroes );
