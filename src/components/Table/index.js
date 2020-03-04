import React from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Block from '@material-ui/icons/Block';
import $ from 'jquery';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// STYLES
import { Container } from './styles';

const optionsDefault = {
  filterType: 'dropdown',
  print: false,
  download: false,
  responsive: 'scroll',
  textLabels: {
    body: {
      noMatch: "Desculpa, nenhum registro correspondente encontrado",
      toolTip: "Ordenar",
      columnHeaderTooltip: column => `Ordenar por ${column.label}`
    },
    pagination: {
      next: "Próximo",
      previous: "Anterior",
      rowsPerPage: "Linhas por páginas:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Download CSV",
      print: "Imprimir",
      viewColumns: "Exibir coluna",
      filterTable: "Filtrar tabela",
    },
    filter: {
      all: "Todos",
      title: "FILTROS",
      reset: "RESETAR",
    },
    viewColumns: {
      title: "Mostrar colunas",
      titleAria: "Mostrar/esconder coluna da tabela",
    },
    selectedRows: {
      text: "linha(s) selecionadas",
      delete: "Apagar",
      deleteAria: "Apagar linha(s) selecionada(s)",
    }
  }
};

export default function Table({ title, data, columns, options: optionsProps }) {
  const options = { ...optionsDefault, ...optionsProps }

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableToolbarSelect: {
        root: {
          backgroundColor: "rgb(255, 226, 236)",
          paddingLeft: '16px',
          paddingRight: '8px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        title: {
          padding: "0!important",
          color: "#f50057"
        }
      }
    }
  })

  return (
    <Container className="w-100">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title || "Employee List"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </Container>
  );
}

export function ButtonEdit({ index, idModal, changeIndex }) {
  const handleClick = index => {
    changeIndex( index );
    $('#' + idModal).modal('show');
  }

  return(
    <Tooltip
      className="bg-warning"
      title="Editar"
      onClick={ () => { handleClick(index) } } >
      <IconButton aria-label="more">
        <Edit />
      </IconButton>
    </Tooltip>
  );
}

export function ButtonAdd({ handleClick, toggle, target }) {
  return (
    <Tooltip className="text-success" title={"Cadastrar"} data-toggle={ toggle } data-target={ target } >
      <IconButton onClick={ handleClick }>
        <AddBoxIcon />
      </IconButton>
    </Tooltip>
  );
}

export function ButtonDesabled({ title, handleClick, toggle, target, ...props }) {
  return (
    <Tooltip
      title={ title }
      className="bg-light text-dark"
      data-toggle={ toggle }
      data-target={ target }
      onChange={ handleClick } >
      <IconButton aria-label="desativar">
        <Block />
      </IconButton>
    </Tooltip>
  );
}
