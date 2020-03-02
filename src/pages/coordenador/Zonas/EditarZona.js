/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import ButtonSave from '../../../components/ButtonSave';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';
import { updateZoneRequest, getZoneByIdRequest } from '../../../store/actions/ZonaActions';
import { getLocationByCityRequest } from '../../../store/actions/LocalidadeActions';

// STYLES
import { FormGroup, selectDefault } from '../../../styles/global';
import { ContainerFixed } from '../../../styles/util';

function EditarZona({ zona, getLocationByCityRequest, getZoneByIdRequest, municipio_id, ...props }) {
  const [ id ] = useState(props.match.params.id);
  const [ localidade, setLocalidade ] = useState({});
  const [ ativo, setAtivo ] = useState({});
  const [ optionLocalidade, setOptionLocalidade ] = useState([]);
  const [ optionAtivo ] = useState([ { value: 1, label: 'Sim' }, { value: 0, label: 'Não' } ]);

  useEffect(() => {
    props.changeSidebar(4, 0);
    getLocationByCityRequest( municipio_id );
    getZoneByIdRequest( id );
  }, []);

  useEffect(() => {
    const options = props.localidades.map(( l ) => ({ value: l.id, label: l.nome }));

    setOptionLocalidade( options );
  }, [ props.localidades ]);

  useEffect(() => {
    if( Object.entries( zona ).length > 0 ) {
      if( zona.localidade ){
        setLocalidade({ value: zona.localidade.id, label: zona.localidade.nome });
      }
      setAtivo( { value: zona.ativo, label: zona.ativo ? 'Sim' : 'Não' } );
    }
  }, [ zona ]);

  function handleSubmit( e ) {
    e.preventDefault();

    props.updateZoneRequest( id, {
      localidade_id: localidade.value,
      ativo: ativo.value
    });
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Zona: <mark className="bg-info text-white" >{ zona.nome }</mark></h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>
            <Row>
              <Col sm='6'>
                <form onSubmit={ handleSubmit } >
                  <h4 className="title">Informações da localidade</h4>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="categoria">Localidade</label>
                        <Select
                          id="localidade"
                          value={ localidade }
                          styles={ selectDefault }
                          options={ optionLocalidade }
                          onChange={ e => setLocalidade(e) }
                          required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="categoria">Ativo</label>
                        <Select
                          id="ativo"
                          value={ ativo }
                          styles={ selectDefault }
                          options={ optionAtivo }
                          onChange={ e => setAtivo(e) }
                          required />
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
                <h4 className="title">Quarteirões</h4>
              </Col>
            </Row>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  zona: state.zona.zona,
  localidades: state.localidade.localidades
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getLocationByCityRequest,
    updateZoneRequest,
    getZoneByIdRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarZona);