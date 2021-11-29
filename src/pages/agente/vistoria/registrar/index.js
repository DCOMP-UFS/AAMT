import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaClipboardCheck } from 'react-icons/fa';
import PNCD from '../components/nw_PNCD';
import LIRAa from '../components/nw_LIRAa';
import SelecionarImovel from '../components/SelecionarImovel';
import AlterarImovel from '../components/AlterarImovel';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../../store/actions/sidebarAgente';
import { showNotifyToast } from '../../../../store/AppConfig/appConfigActions';

// STYLES
import { PageIcon, PageHeader, Steps, StepControl } from '../../../../styles/util';
import { Button } from '../../../../styles/global';

function RegistrarVistoria({ vistoria, trabalhoDiario, ...props }) {
  const [ steps, setSteps ] = useState([
    { valid: false, name: 'Selecionar Imóvel', slug: 'selecionar_imovel', content: <SelecionarImovel /> },
    { valid: false, name: 'Alterar Imóvel', slug: 'alterar_imovel', content: <AlterarImovel /> },
    { valid: false, name: 'Dados da Vistoria', slug: 'vistoria', content: <div>Content Vistoria</div> },
    { valid: false,  name: 'Inspeção', slug: 'inspecao', content: <div>Content Inspeção</div> },
  ]);
  const [ indexStep, setIndexStep ] = useState( 0 );

  useEffect(() => {
    props.changeSidebar(2, 1);
  }, []);

  const next = () => {
    let [ valido, mensagem ] = [ false, '' ];

    if( indexStep === 0 )
      [ valido, mensagem ] = validarImovel();
    if( indexStep === 1 )
      [ valido, mensagem ] = validarAlterarImovel();
    if( indexStep === 2 )
      [ valido, mensagem ] = validarVistoria();

    if( valido ) {
      let s     = steps,
          index = indexStep + 1 < steps.length ? indexStep + 1 : indexStep;

      s[ indexStep ].valid = true;

      setSteps( s );
      setIndexStep( index );
    } else {
      let s = steps;

      s[ indexStep ].valid = false;
      props.showNotifyToast( mensagem, "warning" );
    }
  }

  const prev = () => {
    setIndexStep( indexStep - 1 >= 0 ? indexStep - 1 : 0 );
  }

  const validarImovel = () => {
    return vistoria.imovel.id ? [ true, '' ] : [ false, 'Selecione um imóvel antes de prosseguir' ];
  }

  const validarAlterarImovel = () => {
    console.log('Validar Alterar Imóvel');
    return [ true, '' ];
  }

  const validarVistoria = () => {
    console.log('Validar Vistoria');
    return [ true, '' ];
  }

  function getForm() {
    const metodologia = trabalhoDiario.atividade.metodologia.sigla,
          objetivo    = trabalhoDiario.atividade.objetivo.sigla;

    switch(metodologia) {
      case 'PNCD':
        return <PNCD objetivo={objetivo} />

      default: // LIRAa
      return <LIRAa objetivo={objetivo} />
    }
  }

  return (
    <div>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaClipboardCheck /></PageIcon>
          Vistoria de Campo
        </h3>
      </PageHeader>

      <section className="card-list">
        <Row>
          <Col md="12">
            <article>
              <div className="card p-0">
                <Steps>
                  <div className="menu-steps">
                    <ul className="steps">
                      {
                        steps.map((step, index) => {
                          return (
                            <li
                              key={ step.slug ? step.slug : index }
                              className={`step-item ${ step.valid ? 'valid' : '' } ${ indexStep == index ? 'active' : '' }`}
                            >{ step.name }</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="step-panel">
                    {
                      steps.map((step, index) => {
                        return(
                          <div
                            key={ step.slug }
                            className={`panel-item ${ indexStep == index ? 'active' : '' }`}>
                            { step.content }
                          </div>
                        );
                      })
                    }

                    <StepControl>
                      <Button
                        type="button"
                        className={ `secondary ${ indexStep > 0 ? 'visible' : 'invisible' }` }
                        onClick={ prev }
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        className="info"
                        onClick={ next }
                      >
                        {
                          indexStep === steps.length - 1 ? 'Salvar' : 'Avançar'
                        }
                      </Button>
                    </StepControl>
                  </div>
                </Steps>
              </div>
            </article>
            {/* <div className="card">
              { getForm() }
            </div> */}
          </Col>
        </Row>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  vistoria: state.vistoria
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    showNotifyToast
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrarVistoria);
