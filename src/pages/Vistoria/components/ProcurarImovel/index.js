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

function ProcurarImovel({ imovel, selectQuarteirao, rota, quarteirao, isPaginaEdicao, ...props }) {
  const [ optionQuarteirao, setOptionQuarteirao ] = useState([]);
  const [ numero, setNumero ] = useState("");
  const [ sequencia, setSequencia ] = useState("");
  const [ optionTipoImovel ] = useState(Object.entries( tipoImovelEnum ).map(([key, value]) => {
    return { value: value.id, label: value.label };
  }));
  const [ imoveis, setImoveis ] = useState( [] );

  useEffect(() => {
    let optQuarteirao = rota.map(( quarteirao, index ) => {
      return { value: index, label: quarteirao.numero, id: quarteirao.id };
    });
    setOptionQuarteirao([
      { value: -1, label: 'Todos', id: -1 },
      ...optQuarteirao
    ]);


    props.setQuarteiraoSelect({ value: 0, label: rota[0].numero, id: rota[0].id });
  }, []);

  useEffect(() => {
    if( selectQuarteirao ) {
      let im = [];
      if(selectQuarteirao.value === -1) {
        rota.forEach(rota => {
          var aux = rota.lados.reduce(( imvs, l ) => {
            l.imoveis = l.imoveis.map( i => {
              const inspection  = props.vistorias.find( vistoria => {
                if( imovel ) // existe um imóvel setado
                  return vistoria.imovel.id === i.id && vistoria.imovel.id !== imovel.id;
                else
                  return vistoria.imovel.id === i.id;
              });
  
              return ({ ...i, numeroQuarteirao: rota.numero, logradouro: l.rua.nome, fl_inspection: inspection ? true : false })
            });
  
            return [ ...imvs, ...l.imoveis ];
          }, []);
          im = im.concat(aux)
        });
      } else {
        im = rota[ selectQuarteirao.value ].lados.reduce(( imvs, l ) => {
          l.imoveis = l.imoveis.map( i => {
            const inspection  = props.vistorias.find( vistoria => {
              if( imovel ) // existe um imóvel setado
                return vistoria.imovel.id === i.id && vistoria.imovel.id !== imovel.id;
              else
                return vistoria.imovel.id === i.id;
            });

            return ({ ...i, numeroQuarteirao: rota[ selectQuarteirao.value ].numero, logradouro: l.rua.nome, fl_inspection: inspection ? true : false })
          });

          return [ ...imvs, ...l.imoveis ];
        }, []);
      }

      setImoveis( im );
    }
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
                <label>Nº do quarteirão?</label>
                <Select
                  styles={ selectDefault }
                  options={ optionQuarteirao }
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
                  min="0"
                  className="form-control"
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
                  min="0"
                  className="form-control"
                  disabled={ isImovelSelected() ? "" : "disabled" }
                  value={ isImovelSelected() ? ( imovel.sequencia !== null ? imovel.sequencia : "" ) : "" }
                  onChange={ handleInputImovel } />
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label>Responsável do imóvel<code>*</code></label>
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
            vistorias={ props.vistorias } />
        </Col>
      </Row>
    </Container>
  );
}

function ListImovel({ rotaIndex, idImovelSelect, quarteirao, imoveis, ...props }) {
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
        className={ `${ idImovelSelect === imovel.id ? "active" : imovel.fl_inspection ? " disabled" : "" }` }
        onClick={ () => {
          if( idImovelSelect !== imovel.id )
            if( imovel.fl_inspection )
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
