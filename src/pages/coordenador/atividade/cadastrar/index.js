/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { abrangencia as abrangenciaEnum }  from '../../../../config/enumerate';
import ButtonSave from '../../../../components/ButtonSave';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebar';
import { getMethodologiesRequest } from '../../../../store/actions/MetodologiaActions';
import { getAllowedCyclesRequest } from '../../../../store/actions/CicloActions';
import { createActiveRequest } from '../../../../store/actions/AtividadeActions';

// STYLES
import { FormGroup, selectDefault } from '../../../../styles/global';
import { ContainerFixed } from '../../../../styles/util';


function Atividades({ metodologias, ciclos, ...props }) {
  const [ objetivoAtividade, setObjetivoAtividade ] = useState("");
  const [ ciclo, setCiclo ] = useState({});
  const [ flTodosImoveis, setFlTodosImoveis ] = useState({ value: false, label: "Não" });
  const [ optionCiclo, setOptionCiclo ] = useState({});
  const [ optionflTodosImoveis ] = useState([
    { value: true, label: "Sim" },
    { value: false, label: "Não" }
  ]);
  const [ abrangencia, setAbrangencia ] = useState({});
  const optionAbrangencia = Object.entries(abrangenciaEnum).map(([key, value]) => {
    return { value: value.id, label: value.label };
  });
  const [ metodologia, setMetodologia ] = useState({});
  const [ optionMetodologia, setOptionMetodologia ] = useState([]);
  const [ objetivo, setObjetivo ] = useState({});
  const [ optionObjetivo, setoptionObjetivo ] = useState([]);

  useEffect(() => {
    props.changeSidebar(1, 2);
    props.getMethodologiesRequest();
    props.getAllowedCyclesRequest( props.regionalSaude_id );
  }, []);

  useEffect(() => {
    const option = metodologias.map( (m, index) => (
      { value: m.id, label: m.sigla, index }
    ));

    setOptionMetodologia( option );
  }, [ metodologias ]);

  useEffect(() => {
    setObjetivo({});

    if( Object.entries(metodologia).length > 0 ) {
      const option = metodologias[ metodologia.index ].objetivos.map( atv => (
        { value: atv.id, label: atv.descricao }
      ));

      setoptionObjetivo( option );
    }
  }, [ metodologia ]);

  useEffect(() => {
    const options = ciclos.map( (ciclo) => (
      { value: ciclo.id, label: `${ ciclo.ano }.${ ciclo.sequencia }` }
    ));

    setOptionCiclo(options);
  }, [ ciclos ]);

  useEffect(() => {
    if( props.created )
      window.location = window.location.origin.toString() + "/coord/atividades";
  }, [ props.created ]);

  function handleSubmit( e ) {
    e.preventDefault();

    props.createActiveRequest(
      objetivoAtividade,
      flTodosImoveis.value,
      2,//responsabilidade
      ciclo.value,
      props.municipio_id,
      metodologia.value,
      objetivo.value,
      abrangencia.value
    );
  }

  return (
    <section className="card-list">
      <div className="row">

        {/* Formulário básico */}
        <article className="col-md-12 stretch-card">
          <div className="card">
            <h4 className="title">Atividade</h4>
            <p className="text-description">
              Atenção os campos com <code>*</code> são obrigatórios
            </p>

            <form onSubmit={ handleSubmit }>
              <ContainerFixed>
                <ButtonSave
                  title="Salvar"
                  className="bg-info text-white"
                  type="submit" />
              </ContainerFixed>
              <Row>
                <Col>
                  <Row>
                    <Col>
                    <FormGroup>
                      <label>Objetivo da atividade <code>*</code></label>
                      <textarea
                        id="objetivoAtividade"
                        value={ objetivoAtividade }
                        className="form-control"
                        onChange={ e => setObjetivoAtividade( e.target.value ) }
                        rows="5"
                        required
                      ></textarea>
                    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Metodologia <code>*</code></label>
                        <Select
                          id="metodologia"
                          value={ metodologia }
                          styles={ selectDefault }
                          options={ optionMetodologia }
                          onChange={ e => setMetodologia( e ) }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm='6'>
                      <FormGroup>
                        <label>Atividade <code>*</code></label>
                        <Select
                          id="objetivo"
                          value={ objetivo }
                          styles={ selectDefault }
                          options={ optionObjetivo }
                          onChange={ e => setObjetivo( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label htmlFor="flTodosImoveis">Realizar a atividade em todos os imóveis? <code>*</code></label>
                        <Select
                          id="flTodosImoveis"
                          value={ flTodosImoveis }
                          options={ optionflTodosImoveis }
                          onChange={ e => setFlTodosImoveis(e) }
                          styles={ selectDefault }
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Abrangência <code>*</code></label>
                        <Select
                          id="abrangencia"
                          value={ abrangencia }
                          styles={ selectDefault }
                          options={ optionAbrangencia }
                          onChange={ e => setAbrangencia( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Ciclo <code>*</code></label>
                        <Select
                          id="ciclo"
                          value={ ciclo }
                          styles={ selectDefault }
                          options={ optionCiclo }
                          onChange={ e => setCiclo( e ) }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  municipio_id: state.appConfig.usuario.municipio.id,
  regionalSaude_id: state.appConfig.usuario.municipio.regional.id,
  metodologias: state.metodologia.metodologias,
  ciclos: state.ciclo.ciclos,
  created: state.atividade.created
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getMethodologiesRequest,
    getAllowedCyclesRequest,
    createActiveRequest
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atividades);
