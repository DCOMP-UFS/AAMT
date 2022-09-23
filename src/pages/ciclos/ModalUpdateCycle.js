/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import LoadginGif from '../../assets/loading.gif';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { updateCycleRequest, changeFlUpdate } from '../../store/Ciclo/cicloActions';

// STYLES
import { ContainerArrow } from '../../styles/util';
import { Button, FormGroup, selectDefault } from '../../styles/global';

function ModalUpdateCycle({ ciclos, index, isOpen, handleClose, ...props }) {
  const [ano, setAno] = useState({});
  const [sequencia, setSequencia] = useState({});
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [optionSequencia] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ]);
  const [optionAno, setOptionAno] = useState([]);
  const [flLoading, setFlLoading] = useState(false);
  const [dataInicioDesativado, setDataInicioDesativado] = useState(false);
  const [dataFimDesativado, setDataFimDesativado] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  //Executa toda vez que o modal é aberto
  useEffect(() => {
    if(isOpen){
      if (index >= 0) {
        const ciclo = ciclos[index];
        let today = new Date();
        today.setDate(today.getDate() - 1);
  
        if (index === 0) {
          setMinDate(today.toISOString().split("T")[0]);
        } else {
          let lastCycle = ciclos.at(-2);
          let tomorrow = new Date(lastCycle.dataFim);
          tomorrow.setDate((tomorrow.getDate()) + 1);
          setMinDate(tomorrow.toISOString().split("T")[0]);
        }
  
        setAno({ value: ciclo.ano, label: ciclo.ano });
        setSequencia({ value: ciclo.sequencia, label: ciclo.sequencia });
        setDataInicio(ciclo.dataInicio.split("T")[0]);
        setDataFim(ciclo.dataFim.split("T")[0]);
        setMaxDate(`${today.getFullYear()}-12-31`);
      }
    }
    //Não fecha o modal, mas sim faz com que o isOpen se torne false
    //Para que assim quando o modal for aberto, o isOpen recebe true
    //e assim o useEffect é acionado novamente
    handleClose()
  }, [isOpen]);

  useEffect(() => {
    const current_year = new Date().getFullYear();
    let optionYear = [];

    for (let index = 0; index < 6; index++) {
      optionYear.push({
        value: current_year + index,
        label: current_year + index,
      });
    }

    setOptionAno(optionYear);
  }, []);

  /* useEffect(() => {
    if (index >= 0) {
      const ciclo = ciclos[index];
      let today = new Date();
      today.setDate(today.getDate() - 1);

      if (index === 0) {
        setMinDate(today.toISOString().split("T")[0]);
      } else {
        let lastCycle = ciclos.at(-2);
        let tomorrow = new Date(lastCycle.dataFim);
        tomorrow.setDate((tomorrow.getDate()) + 1);
        setMinDate(tomorrow.toISOString().split("T")[0]);
      }

      setAno({ value: ciclo.ano, label: ciclo.ano });
      setSequencia({ value: ciclo.sequencia, label: ciclo.sequencia });
      setDataInicio(ciclo.dataInicio.split("T")[0]);
      setDataFim(ciclo.dataFim.split("T")[0]);
      setMaxDate(`${today.getFullYear()}-12-31`);
    }
  }, [index]); */

  // Evita que a dataFim seja anterior a dataInicio
  useEffect(() => {
    if (dataInicio) {
      let endDate = new Date(dataInicio);
      let today = new Date();
      let endDateStringFormat =
        endDate > today
          ? endDate.toISOString().split("T")[0]
          : today.toISOString().split("T")[0];
      document.getElementById("dataFim").min = endDateStringFormat;
      setDataFim(
        dataFim <= dataInicio && dataFim ? endDateStringFormat : dataFim
      );
    }
  }, [dataInicio]);

  // Controla a ativação dos inputs de datas
  useEffect(() => {
    if (index >= 0) {
      const ciclo = ciclos[index];
      const ultimoCicloCadastrado = ciclos.length - 1 === index ? true : false;
      if (ciclo.situacao === "Planejado" && ultimoCicloCadastrado) {
        setDataInicioDesativado(false);
        setDataFimDesativado(false);
      } else {
        setDataFimDesativado(true);
        setDataInicioDesativado(true);
      }
    }
  }, [index]);

  useEffect(() => {
    if (props.updated) {
      setFlLoading(false);
      props.changeFlUpdate(null);
      $("#modal-editar-ciclo").modal("hide");
    } else if (props.updated === false) {
      // Essa condição é necessária pois updated pode conter o valor NULL e que não deve entrar nessa condicional
      setFlLoading(false);
      props.changeFlUpdate(null);
    }
  }, [props.updated]);

  function clearInput() {
    if (!dataInicioDesativado) {
      setDataInicio("");
    }
    if (!dataFimDesativado) {
      setDataFim("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFlLoading(true);

    props.updateCycleRequest(ciclos[index].id, {
      ano: ano.value,
      sequencia: sequencia.value,
      dataInicio: dataInicio,
      dataFim: dataFim,
    });
  }

  return (
    <Modal id="modal-editar-ciclo" title="Editar Ciclo" size="lg">
      <form onSubmit={handleSubmit}>
        <ModalBody>
            <p className="text-description">
              Atenção! Os campos com <code>*</code> são obrigatórios
            </p>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="ano">
                  Ano <code>*</code>
                </label>
                <Select
                  id="ano"
                  value={ano}
                  options={optionAno}
                  onChange={(e) => setAno(e)}
                  styles={selectDefault}
                  isRequired={true}
                  required
                  isDisabled
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="sequencia">
                  Sequência <code>*</code>
                </label>
                <Select
                  id="sequencia"
                  value={sequencia}
                  options={optionSequencia}
                  onChange={(e) => setSequencia(e)}
                  styles={selectDefault}
                  required
                  isDisabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="ano">
                  Data de início <code>*</code>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={dataInicio}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                  disabled={dataInicioDesativado}
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <label htmlFor="sequencia">
                  Data de fim <code>*</code>
                </label>
                <input
                  type="date"
                  id="dataFim"
                  className="form-control"
                  value={dataFim}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDataFim(e.target.value)}
                  required
                  disabled={dataFimDesativado}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ContainerArrow>
            <div>
              <Button type="button" className="warning" onClick={clearInput}>
                Limpar
              </Button>
            </div>
            <div>
              <Button type="button" className="secondary" data-dismiss="modal">
                Cancelar
              </Button>
              <Button type="submit" disabled={flLoading}>
                {flLoading ? (
                  <>
                    <img
                      src={LoadginGif}
                      width="25"
                      style={{ marginRight: 10 }}
                      alt="Carregando"
                    />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </ContainerArrow>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ciclos: state.ciclo.ciclos,
  index: state.ciclo.index,
  updated: state.ciclo.updated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCycleRequest,
    changeFlUpdate
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateCycle);
