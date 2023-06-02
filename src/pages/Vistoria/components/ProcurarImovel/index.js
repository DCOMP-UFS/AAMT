import React, { useEffect, useState } from 'react';
import { IoIosHome } from 'react-icons/io';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../components/PopDescription';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTION
import { setQuarteiraoSelect, setImovelSelected } from '../../../../store/Vistoria/vistoriaActions';

// ENUMERATE
import { tipoImovel as tipoImovelEnum } from '../../../../config/enumerate';

// STYLES
import { selectDefault } from '../../../../styles/global';
import { Container, UlImovel, LiImovel, ContainerIcon, DivDescription, LiEmpty, Span } from './styles';

function ProcurarImovel({ imovel, selectQuarteirao, rota, quarteirao, isPaginaEdicao, trabalhoDiario_id, loadingStatusVistoria, ...props }) {
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);
  const [ optionQuarteiraoPermant, setOptionQuarteiraoPermant ] = useState([]);
  const [ optionQuarteiraoTemp, setOptionQuarteiraoTemp ] = useState([]);
  const [ localidade, setLocalidade ]             = useState({})
  const [ numero, setNumero ] = useState("");
  const [ sequencia, setSequencia ] = useState("");
  const [ optionTipoImovel ] = useState(Object.entries( tipoImovelEnum ).map(([key, value]) => {
    return { value: value.id, label: value.label };
  }));
  const [ imoveis, setImoveis ] = useState( [] );
  const [ vistoriasFiltradas , setVistoriasFiltradas]  = useState([]) 

  useEffect(() => {
    //Lista que cotem todas as localidades visitadas neste trabalho diario
    let listLocalidades = []

    let optQuarteirao = rota.map(( quarteirao, index ) => {

      //Este trecho do codigo encontra todas as localidades deste trabalho diario
      let localidadeRepetida = false
      for( const loc of listLocalidades ) {
        if( loc.value == quarteirao.localidade.id ){
          localidadeRepetida = true
          break;
        }
      }
      if(!localidadeRepetida)
        listLocalidades.push({ value: quarteirao.localidade.id, label: quarteirao.localidade.nome })

      //Este trecho do codigo é responsavel por achar todos os quarteiroes do trabalho diario
      let label = ""
      if(quarteirao.sequencia == null)
        label = ""+quarteirao.numero
      else
        label = ""+quarteirao.numero+" - SEQ: "+quarteirao.sequencia
      

      return { value: index, label: label, id: quarteirao.id };
    });

    //Contem todas as opçoes de localidade
    setOptionLocalidade([
      { value: -1, label: 'Todos'},
      ...listLocalidades
    ])

    //Contem todas as opçoes de quarteirões
    setOptionQuarteiraoPermant([
      { value: -1, label: 'Todos', id: -1 },
      ...optQuarteirao
    ]);

    //Contem todas a opções de quarteirões de acordo com a localidade
    //Quando a pagina é iniciada, ele irá ser igual ao OptionQuarteiraoPermant
    setOptionQuarteiraoTemp([
      { value: -1, label: 'Todos', id: -1 },
      ...optQuarteirao
    ]);

    //procurar todas as vistorias deste trabalho diario
    var filtragem = props.vistorias.filter((vistoria) => vistoria.trabalhoDiario_id == trabalhoDiario_id)

    setVistoriasFiltradas(filtragem)
    setLocalidade( { value: -1, label: 'Todos'})
    props.setQuarteiraoSelect({ value: -1, label: 'Todos', id: -1 });
  }, []);

  useEffect(() => {
    if( localidade.value == -1)
      setOptionQuarteiraoTemp(optionQuarteiraoPermant)
    else{
      let quarteiroes_localidade = []

      rota.forEach( (q, index) => {
        if( q.localidade.id == localidade.value ){
          q.value = index
          quarteiroes_localidade.push(q)
        }
      })

      const new_option_quarteirao = quarteiroes_localidade.map(( quarteirao, index ) => {
        let label = ""
        if(quarteirao.sequencia == null)
          label = ""+quarteirao.numero
        else
          label = ""+quarteirao.numero+" - SEQ: "+quarteirao.sequencia
        return { value: quarteirao.value, label: label, id: quarteirao.id };
      });

      setOptionQuarteiraoTemp([
        { value: -1, label: 'Todos', id: -1 },
        ...new_option_quarteirao
      ]);
    }
      
    props.setQuarteiraoSelect({ value: -1, label: 'Todos', id: -1 });
  }, [localidade])

  useEffect(() => {
    if( selectQuarteirao ) {
      let im = [];
      if(selectQuarteirao.value === -1) {

        let rotaAux = null
        //caso o filtro da localidade seja 'Todos', não é necessario fazer nada
        if(localidade.value == -1)
          rotaAux = rota
        //caso o filtro da localidade seja outro valor, sera feita uma filtragem,
        //sendo mantido os quarteirões que pertecem a localidade selecionada
        else
          rotaAux = rota.filter( q => q.localidade.id == localidade.value  )

        rotaAux.forEach(rota => {
          var aux = rota.lados.reduce(( imvs, l ) => {
            l.imoveis = l.imoveis.map( i => {
              const inspection  = vistoriasFiltradas.find( vistoria => {
                if( imovel ) // existe um imóvel setado
                  return vistoria.imovel.id === i.id && vistoria.imovel.id !== imovel.id;
                else
                  return vistoria.imovel.id === i.id;
              });
  
              return ({ ...i, 
                numeroQuarteirao: rota.numero,
                sequenciaQuarteirao: rota.sequencia,
                localidade: rota.localidade.nome, 
                logradouro: l.rua.nome,
                fl_inspection: inspection ? true : false })
            });
  
            return [ ...imvs, ...l.imoveis ];
          }, []);
          im = im.concat(aux)
        });
      } else {
        im = rota[ selectQuarteirao.value ].lados.reduce(( imvs, l ) => {
          l.imoveis = l.imoveis.map( i => {
            const inspection  = vistoriasFiltradas.find( vistoria => {
              if( imovel ) // existe um imóvel setado
                return vistoria.imovel.id === i.id && vistoria.imovel.id !== imovel.id;
              else
                return vistoria.imovel.id === i.id;
            });

            return ({ ...i, 
              numeroQuarteirao: rota[ selectQuarteirao.value ].numero,
              sequenciaQuarteirao: rota[ selectQuarteirao.value ].sequencia, 
              localidade: rota[ selectQuarteirao.value ].localidade.nome,
              logradouro: l.rua.nome, 
              fl_inspection: inspection ? true : false })
          });

          return [ ...imvs, ...l.imoveis ];
        }, []);
      }

      setImoveis( im );
    }
    if(!isPaginaEdicao)
      props.setImovelSelected( {} );
  }, [ selectQuarteirao ]);

  function handleImovel( i ) {
    props.setImovelSelected( i );
  };

  function handleInputImovel(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let i = imovel;
    i[name] = value;

    props.setImovelSelected( i );
  }

  function handleTipoImovel( option ) {
    let i = imovel;
    i.tipoImovel = option.value;

    props.setImovelSelected( i );
  }

  function isImovelSelected(){
    if( !imovel || imovel.id == null)
      return false
    
    return true
  }

  return (
    <Container>
      <Row>
        <Col md="6">
          {/* 
            As colunas onde tem 'className={isPaginaEdicao ? "d-none" : ''}' 
            Nao serão exibidas caso esse componente foi acessado pela pagina
            de edição de vistoria( /vistoria/editar/:id )
          */}
          <Row>
            <Col md="12" className={isPaginaEdicao ? "d-none" : ''}>
              <h4 className="title">
                Filtrar
                <PopDescription title="Filtar imóveis" placement="right" content="Faça uma filtragem da lista de imóveis, exibida a direita, para selecionar o imóvel que deseja realizar uma vistoria!" />
              </h4>
            </Col>

            <Col md="6" className={isPaginaEdicao ? "d-none" : ''}>
              <div className="form-group">
                <label>Localidade?</label>
                <Select
                  styles={ selectDefault }
                  options={ optionLocalidade }
                  onChange={ option => setLocalidade( option ) }
                  value={ localidade } />
              </div>
            </Col>

            <Col md="6" className={isPaginaEdicao ? "d-none" : ''}>
              <div className="form-group">
                <label>Nº do quarteirão?</label>
                <Select
                  styles={ selectDefault }
                  options={ optionQuarteiraoTemp }
                  onChange={ option => props.setQuarteiraoSelect( option ) }
                  value={ selectQuarteirao } />
              </div>
            </Col>
            {/* <Col md="6">
              <div className="form-group">
                <label>Rua</label>
                <Select />
              </div>
            </Col> */}
            <Col md="6" className={isPaginaEdicao ? "d-none" : ''}>
              <div className="form-group">
                <label>Nº do imóvel?</label>
                <input
                  name="numero"
                  type="number"
                  min="0"
                  className="form-control"
                  value={ numero }
                  onChange={ e => setNumero( e.target.value )}/>
                  
              </div>
            </Col>

            <Col md="6" className={isPaginaEdicao ? "d-none" : ''}>
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="1"
                  className="form-control"
                  pattern   ="[0-9]*"
                  onKeyDown ={ e => [ "e", "E", "+", "-", ".", "," ].includes( e.key ) && e.preventDefault() }
                  value={ sequencia }
                  onChange={ e => setSequencia( e.target.value ) } />
              </div>
            </Col>

            <Col md="12">
              <h4 className="title">
                Imóvel selecionado
                {isPaginaEdicao ? '' :
                  <PopDescription
                    placement="right"
                    title="Imóvel selecionado"
                    content={
                      "Clique na lista de imóveis a direita para selecionar um imóvel. " +
                      "Após selecionar um imóvel, os campos serão preenchidos e habilitados para edição.\n " +
                      "As modificações realizadas nestes campos serão aplicadas no imóvel após finalizar os trabalhos do dia!"
                    } />
                  }
              </h4>
              <p className="text-description">
                Atenção os campos com <code>*</code> são obrigatórios
              </p>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Nº do imóvel<code>*</code></label>
                <input
                  name="numero"
                  className="form-control"
                  type="number"
                  min="0"
                  disabled={ isImovelSelected() ? "" : "disabled" }
                  value={ isImovelSelected() ?  imovel.numero : "" }
                  onChange={ handleInputImovel }
                  
                />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Sequência</label>
                <input
                  name="sequencia"
                  type="number"
                  min="1"
                  className="form-control"
                  pattern   ="[0-9]*"
                  onKeyDown ={ e => [ "e", "E", "+", "-", ".", "," ].includes( e.key ) && e.preventDefault() }
                  disabled={ isImovelSelected() ? "" : "disabled" }
                  value={ isImovelSelected() ? ( imovel.sequencia !== null ? imovel.sequencia : "" ) : "" }
                  onChange={ handleInputImovel } 
                  />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Responsável do imóvel</label>
                <input
                  name="responsavel"
                  type="text"
                  className="form-control"
                  disabled={ isImovelSelected() ? "" : "disabled" }
                  value={ isImovelSelected() ? imovel.responsavel : "" }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Tipo do imóvel<code>*</code></label>
                <Select
                  name="tipoImovel"
                  styles={ selectDefault }
                  isDisabled={ isImovelSelected() ? false : true }
                  value={
                    isImovelSelected() ?
                      optionTipoImovel.find( ti => ti.value === imovel.tipoImovel ) :
                      {}
                  }
                  options={ optionTipoImovel }
                  onChange={ handleTipoImovel } />
              </div>
            </Col>

            <Col md="12">
              <div className="form-group">
                <label>Complemento</label>
                <input
                  name="complemento"
                  type="text"
                  className="form-control"
                  disabled={ isImovelSelected() ? "" : "disabled" }
                  value={ isImovelSelected() ? imovel.complemento : "" }
                  onChange={ handleInputImovel } />
              </div>
            </Col>
          </Row>
        </Col>
        
        
        <Col md="6" className={isPaginaEdicao ? "d-none" : ''}>
          <h4 className="title">
            Imóveis
            <PopDescription
              title="Lista de Imóveis"
              placement="right"
              content="Essa é a lista de imóveis, de acordo com o filtro. Clique em um imóvel para selecionar-lo nesta vistoria!" />
          </h4>

          <ListImovel
            idImovelSelect={ imovel ? imovel.id : undefined }
            quarteirao={ selectQuarteirao ? rota[ selectQuarteirao.value ] : undefined }
            imoveis={ imoveis }
            rotaIndex={ selectQuarteirao ? selectQuarteirao.value : undefined }
            handleImovel={ handleImovel }
            numero={ numero === "" ? "-1" : numero }
            sequencia={ sequencia === "" ? "-1" : sequencia }
            vistorias={ vistoriasFiltradas } 
            loadingStatusVistoria={loadingStatusVistoria}
            />
        </Col>
      </Row>
    </Container>
  );
}

function ListImovel({ rotaIndex, idImovelSelect, quarteirao, imoveis, loadingStatusVistoria, ...props }) {
  const numero = parseInt( props.numero );
  const sequencia = parseInt( props.sequencia );

  const filterImovel = imoveis.filter(
    imovel => {
      return (
        numero === -1 ||
        (
          imovel.numero === numero &&
          ( sequencia === -1 || imovel.sequencia === sequencia )
        )
      );
    }
  );

  let li = filterImovel.map(( imovel, index ) => {
    return (
      <LiImovel
        key={ index}
        className={ `${ idImovelSelect === imovel.id ? "active" : imovel.fl_inspection || loadingStatusVistoria ? " disabled" : "" }` }
        onClick={ () => {
          if( idImovelSelect !== imovel.id )
            if( loadingStatusVistoria || imovel.fl_inspection )
              return;
          
          props.handleImovel( imovel );
        } } >
        <ContainerIcon className="ContainerIcon" >
          <IoIosHome />
        </ContainerIcon>
        <DivDescription>
          <div>
            <span className="mr-2">Imóvel nº: { imovel.numero }</span>
            {
              imovel.sequencia === -1 ?
                ("") :
                <span>Seq.: { imovel.sequencia === -1 ? "" : imovel.sequencia }</span>
            }
          </div>
        </DivDescription>
      </LiImovel>
    )
  });

  if(filterImovel.length === 0) {
    li = <LiEmpty>
      <h4>Nenhum imóvel encontrado</h4>
    </LiEmpty>;
  }

  return (
    <UlImovel>
      { li }
    </UlImovel>
  )
}

const mapStateToProps = state => ({
  rota: state.rotaCache.rota,
  quarteirao: state.supportInfo.quarteirao,
  selectQuarteirao: state.vistoria.selectQuarteirao,
  imovel: state.vistoria.imovel,
  reload: state.vistoria.reload,
  vistorias: state.vistoriaCache.vistorias,
  trabalhoDiario_id: state.rotaCache.trabalhoDiario.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setQuarteiraoSelect,
    setImovelSelected,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcurarImovel);
