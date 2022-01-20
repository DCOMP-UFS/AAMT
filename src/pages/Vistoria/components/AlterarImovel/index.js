import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PopDescription from '../../../../components/PopDescription';
import Select from 'react-select';
import { tipoImovel as tipoImovelEnum } from '../../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { setImovel } from '../../../../store/Vistoria/vistoriaActions';

// STYLES
import { Container } from './styles';
import { selectDefault } from '../../../../styles/global';

function AlterarImovel({ vistoria, ...props }) {
  const [ numero, setNumero ] = useState( undefined );
  const [ sequencia, setSequencia ] = useState( undefined );
  const [ responsavel, setResponsavel ] = useState( "" );
  const [ tipoImovel, setTipoImovel ] = useState( { value: -1, label: "" } );
  const [ complemento, setComplemento ] = useState( "" );
  const [ optionTipoImovel ] = useState(Object.entries( tipoImovelEnum ).map(([key, value]) => {
    return { value: value.id, label: value.label };
  }));

  useEffect(() => {
    const setImovel = () => {
      setNumero( vistoria.imovel.numero ? vistoria.imovel.numero : undefined );
      setSequencia( vistoria.imovel.sequencia ? vistoria.imovel.sequencia : undefined );
      setResponsavel( vistoria.imovel.responsavel ? vistoria.imovel.responsavel : "" );
      setComplemento( vistoria.imovel.complemento ? vistoria.imovel.complemento : "" );

      if( vistoria.imovel.tipoImovel ) {
        let [ key ] = Object.entries( tipoImovelEnum ).find(([ key, value ]) => {
          if( value.id === vistoria.imovel.tipoImovel )
            return true;
          else
            return false;
        });

        setTipoImovel({ value: tipoImovelEnum[ key ].id, label: tipoImovelEnum[ key ].label });
      }
    }

    setImovel();
  }, [ vistoria ]);

  return (
    <Container>
      <Row>
        <Col md="12">
          <h4 className="title">
            Alterar Imóvel (Opcional)
            <PopDescription
              title="Alterar Imóvel"
              placement="right"
              content="As alterações, nos dados do imóvel, serão aplicadas após a finalização do trabalho diário!"
            />
          </h4>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <div className="form-group">
            <label htmlFor="numero">Nº do imóvel<code>*</code></label>
            <input
              id="numero"
              name="numero"
              className="form-control"
              type="number"
              min="0"
              value={ numero ? numero : "" }
              onChange={ e => setNumero( parseInt( e.target.value ) ) }
            />
          </div>
        </Col>

        <Col md="6">
          <div className="form-group">
            <label htmlFor="sequencia">Sequência</label>
            <input
              id="sequencia"
              name="sequencia"
              type="number"
              className="form-control"
              min="0"
              value={ sequencia ? sequencia : "" }
              onChange={ e => setSequencia( parseInt( e.target.value ) ) }
            />
          </div>
        </Col>

        <Col md="6">
          <div className="form-group">
            <label htmlFor="responsavel">Responsável do imóvel</label>
            <input
              id="responsavel"
              name="responsavel"
              type="text"
              className="form-control"
              value={ responsavel ? responsavel : "" }
              onChange={ e => setResponsavel( e.target.value ) }
            />
          </div>
        </Col>

        <Col md="6">
          <div className="form-group">
            <label>Tipo do imóvel<code>*</code></label>
            <Select
              name="tipoImovel"
              styles={ selectDefault }
              value={ tipoImovel }
              onChange={ option => setTipoImovel( option ) }
              options={ optionTipoImovel }
            />
          </div>
        </Col>

        <Col md="12">
          <div className="form-group">
            <label>Complemento</label>
            <input
              name="complemento"
              type="text"
              className="form-control"
              value={ complemento ? complemento : "" }
              onChange={ e => setComplemento( e.target.value ) }
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  vistoria: state.vistoria
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setImovel
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlterarImovel);
