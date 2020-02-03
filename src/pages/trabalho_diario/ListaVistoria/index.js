import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddBoxIcon from '@material-ui/icons/AddBox';

import PNCD from '../../../components/formVistoria/PNCD';
import { CardBody, Button } from '../../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar';

// COMPONENTES
// import { Container } from './styles';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  contentTooltip: {
    flex: '100%',
    textAlign: 'right',
    flexDirection: 'column',
  },
  marginRight: {
    marginRight: "5px",
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selecionadas
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Vistorias
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Apagar">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div className={ classes.contentTooltip }>
          <Tooltip
            title="Vistoria"
            onClick={
              () => {
                window.location.href = (
                  window.location.origin.toString() +
                  "/trabalho_diario/vistoria/formulario"
                );
              }
            }
            className={ classes.marginRight }>
            <IconButton aria-label="more" className="text-success">
              <AddBoxIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Filtro">
            <IconButton aria-label="filter list" className="text-info">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const classes = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function createData(id, numQuarteirao, logradouro, numero, tipoImovel, horaInicio) {
  return { id, numQuarteirao, logradouro, numero, tipoImovel, horaInicio }
}

class ListaVistoria extends Component {
  constructor(props){
    super(props);
    this.props.changeSidebar(1, 2);
  }

  prefix_id_rows = "v_";

  state = {
    rows: [
      createData( (this.prefix_id_rows + 1), 1, "Rua A", 1, "R", "14:15" ),
      createData( (this.prefix_id_rows + 2), 1, "Rua A", 2, "R", "14:30" ),
      createData( (this.prefix_id_rows + 3), 1, "Rua A", 3, "C", "14:37" ),
      createData( (this.prefix_id_rows + 4), 2, "Rua B", 4, "TB", "14:50" ),
      createData( (this.prefix_id_rows + 5), 2, "Rua B", 5, "R", "15:30" ),
      createData( (this.prefix_id_rows + 6), 2, "Rua B", 6, "R", "15:45" ),
    ],

    headCells: [
      { id: 'numQuarteirao', align: "left", disablePadding: false, label: 'Nº do Quart.' },
      { id: 'logradouro', align: "left", disablePadding: false, label: 'Nome do Logradouro' },
      { id: 'numero', align: "left", disablePadding: false, label: 'Nº' },
      { id: 'tipoImovel', align: "left", disablePadding: false, label: 'Tipo do Imóvel' },
      { id: 'horaInicio', align: "left", disablePadding: false, label: 'Hora de entrada' },
    ],

    order: 'desc',
    orderBy: 'horaInicio',
    selected: [],
    page: 0,
    dense: true,
    rowsPerPage: 5,
  }

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';

    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property
    });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map(n => n.id);
      this.setState({
        selected: newSelecteds,
      });
      return;
    }

    this.setState({
      selected: [],
    });
  };

  handleClick = (event, id) => {
    const selectedIndex = this.state.selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected: newSelected
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  handleChangeDense = event => {
    this.setState({
      dense: event.target.checked
    });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const table = this.state;

    const emptyRows = table.rowsPerPage - Math.min(
      table.rowsPerPage, table.rows.length - table.page * table.rowsPerPage
    );

    // const form_vistoria = this.props.form_vistoria;

    // if( form_vistoria.imovel.index !== -1 ) {
    //   this.setState({
    //     imovel: this.props.quarteirao[ this.state.selectQuarteirao ].imovel[ form_vistoria.imovel.index ]
    //   });
    // }

    return (
      <section className="card-list">
        <CardBody className="col-md-12">
          <div className="c-container">

            <div className="c-body">
              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={table.selected.length} />
                <div className={classes.tableWrapper}>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={table.dense ? 'small' : 'medium'}
                    aria-label="enanced table">

                    <EnhancedTableHead
                      numSelected={table.selected.length}
                      order={table.order}
                      orderBy={table.orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={table.rows.length}
                      headCells={table.headCells}
                    />

                    <TableBody>
                    {stableSort(table.rows, getSorting(table.order, table.orderBy))
                      .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = this.isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${row.id}`;

                        return (
                          <TableRow
                            hover
                            onClick={event => this.handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {row.numQuarteirao}
                            </TableCell>
                            <TableCell align="left">{row.logradouro}</TableCell>
                            <TableCell align="left">{row.numero}</TableCell>
                            <TableCell align="left">{row.tipoImovel}</TableCell>
                            <TableCell align="left">{row.horaInicio}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (table.dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                    </TableBody>

                  </Table>
                </div>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={table.rows.length}
                  rowsPerPage={table.rowsPerPage}
                  page={table.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage="Linhas por página"
                  labelDisplayedRows={ ({ from, to, count }) => {
                    let result = to === -1 ? count : to;
                    return from + "-" + result + " de " + count;
                  }}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={table.dense} onChange={this.handleChangeDense} />}
                label="Espaçamento denso"
              />
            </div>

          </div>
        </CardBody>

        <div id="modalVistoria" className="modal fade show" role="dialog">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vistoria</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <PNCD />
              </div>
              <div className="modal-footer">
                <Button type="button" className="secondary" data-dismiss="modal">Cancelar</Button>
                <Button type="button">Registrar</Button>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => ({
  quarteirao: state.quarteirao.quarteirao,
  form_vistoria: state.supportInfo.form_vistoria
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaVistoria);
