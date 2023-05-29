import React from 'react';
import Select from 'react-select';
import { Row } from 'react-bootstrap';
//STYLES
import { FormGroup, selectDefault } from '../../styles/global';
import { PagePopUp } from '../../styles/util';
import { CardBodyInfo } from './styles';

export const CycleSelector = ({ optionCiclos, cicloSelecionado, setCicloSelecionado, paddingBottom, ...props }) => {
    return(
        <section className="card-list">
            <Row>
                <PagePopUp className="w-100" style={{ paddingTop: 15, paddingBottom: paddingBottom ? paddingBottom : 40, paddingRight: 15, paddingLeft: 15 }}>
                    <div className="card">
                        <CardBodyInfo>
                            <div className="d-flex flex-grow-1 align-items-center">
                                <FormGroup className="w-50 m-0 mr-2 inline">
                                    <label htmlFor="ciclo"><b>Escolha um ciclo</b></label>
                                    <Select
                                    id="ciclo"
                                    value={ cicloSelecionado }
                                    styles={ selectDefault }
                                    options={ optionCiclos }
                                    onChange={ setCicloSelecionado }
                                    />
                                </FormGroup>
                            </div>
                        </CardBodyInfo>
                    </div>
                </PagePopUp>
            </Row>
      </section>
    )
}