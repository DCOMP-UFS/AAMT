import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { tipoImovelEnum } from '../../../../../config/enumerate';
import Table from '../../../../../components/Table';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { setImovel } from '../../../../../store/Vistoria/vistoriaActions';

import { Container } from './styles';

const columns = [
  {
    name: "numImovel",
    label: "Nº",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "seqImovel",
    label: "Seq.",
    options: {
      filter: false,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "tipoImovel",
    label: "Tipo",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "lado",
    label: "Rua",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  },
  {
    name: "quarteirao",
    label: "Quart.",
    options: {
      filter: true,
      align: "left",
      disablePadding: false
    }
  }
];

function SelecionarImovel({ rota, vistoria, ...props }) {
  const [ imoveis, setImoveis ] = useState([]);
  const [ rows, setRows ] = useState([]);
  const options = {
    selectableRows: 'none',
    customRowRender: (data, dataIndex, rowIndex) => {
      let selected = false;
      if( vistoria.imovel.dataIndex )
        if( vistoria.imovel.dataIndex === dataIndex )
          selected = true;

      return (
        <tr
          key={ 'tr_' + dataIndex }
          id={ `table-vistoria-${ dataIndex }` }
          className={ `MuiTableRow-root MuiTableRow-hover ${ selected ? 'selected' : '' }` }
          onClick={ () => onClickRow( dataIndex ) }
        >
          {
            data.map((column, index) => <td key={'td_' + dataIndex + '_' + index} className="MuiTableCell-root MuiTableCell-body">{ column }</td>)
          }
        </tr>
      );
    }
  };

  function onClickRow( index ){
    let rows = document.querySelectorAll('tr.MuiTableRow-root');

    rows.forEach(el => {
      el.className = el.className.replace(/\bselected\b/, "");
    });

    let row = document.getElementById(`table-vistoria-${index}`);
    row.className = row.className + ' selected';

    props.setImovel({
      ...imoveis[ index ],
      dataIndex: index
    });
  };

  useEffect(() => {
    let imo = [];

    rota.forEach(q => {
      q.lados.forEach(l => {
        let i = l.imoveis.map(imovel => ({ ...imovel, rua: l.rua.nome, quarteirao: q.numero }));

        imo = [ ...i, ...imo ];
      });
    });

    setImoveis( imo );
  }, [ rota ]);

  useEffect(() => {
    function createRows() {
      const imovs = imoveis.map( ( imovel, index ) => {
        const tipoImovel = tipoImovelEnum.find( tipo => imovel.tipoImovel === tipo.id );

        return (
          [
            imovel.numero,
            imovel.sequencia ? imovel.sequencia : '',
            tipoImovel.label,
            imovel.rua,
            imovel.quarteirao,
          ]
        )
      });

      setRows( imovs );
    }

    createRows();
  }, [ imoveis ]);

  return (
    <Container>
      <Row>
        <Col>
          <Table
            title="Selecione um Imóveis"
            columns={ columns }
            data={ rows }
            options={ options }
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  rota: state.rotaCache.rota,
  vistoria: state.vistoria,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setImovel
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelecionarImovel);
