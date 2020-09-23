import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { FaClipboardCheck, FaCheckDouble } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
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
import { stableSort, getSorting } from '../../../config/function';
import dotenv from 'dotenv';
import ModalFinalizarTrabalho from '../components/ModalFinalizarTrabalho';
import $ from 'jquery';
import { tipoImovel as tipoImovelEnum } from '../../../config/enumerate';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebarAgente';
import { getRouteRequest } from '../../../store/actions/RotaActions';
import { resetHandleSave, routeNotStarted } from '../../../store/actions/VistoriaCacheActions';

// STYLES
import { Button } from '../../../styles/global';
import { PageIcon, PageHeader, PagePopUp } from '../../../styles/util';
import { Container } from './styles';

dotenv.config();

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
                  "/agente/vistoria/cadastrar"
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

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

function createData(id, numQuarteirao, logradouro, numero, sequencia, tipoImovel, situacaoVistoria, pendencia, horaInicio) {
  return { id, numQuarteirao, logradouro, numero, sequencia, tipoImovel, visita: situacaoVistoria, pendencia, horaInicio }
}

function Vistoria({ vistorias, routeNotStarted, usuario, trabalhoDiario, rota, showNotStarted, ...props }) {
  const [ prefix_id_rows, setPrefix_id_rows ] = useState('v_');
  const [ order, setOrder ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('horaInicio');
  const [ selected, setSelected ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ dense, setDense ] = useState(true);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ emptyRows, setEmptyRows ] = useState(0);
  const [ rows, setRows ] = useState(
    vistorias.map(( v, index ) => (
      createData(
        (prefix_id_rows + index),
        v.imovel.numeroQuarteirao,
        v.imovel.logradouro,
        v.imovel.numero,
        v.imovel.sequencia,
        tipoImovelEnum[
          Object.entries( tipoImovelEnum ).find(([ key, value ]) => value.id === v.imovel.tipoImovel )[0]
        ].sigla,
        v.situacaoVistoria === "N" ? "Normal" : "Recuperada",
        v.pendencia ? ( v.pendencia === "F" ? "Fechada" : "Recusada" ) : "",
        v.horaEntrada
      )
    ))
  );
  const [ headCells, setHeadCells ] = useState([
    { id: 'numQuarteirao', align: "left", disablePadding: false, label: 'Nº do Quart.' },
    { id: 'logradouro', align: "left", disablePadding: false, label: 'Logradouro' },
    { id: 'numero', align: "left", disablePadding: false, label: 'Nº' },
    { id: 'sequencia', align: "left", disablePadding: false, label: 'Sequência' },
    { id: 'tipoImovel', align: "left", disablePadding: false, label: 'Tipo do Imóvel' },
    { id: 'visita', align: "left", disablePadding: false, label: 'Visita' },
    { id: 'pendencia', align: "left", disablePadding: false, label: 'Pendência' },
    { id: 'horaInicio', align: "left", disablePadding: false, label: 'Hora de entrada' },
  ]);

  useEffect(() => {
    if( showNotStarted )
      setTimeout(() => { window.location = window.location.origin + '/agente/home'; }, 300);
  }, [ showNotStarted ]);

  useEffect(() => {
    if( !trabalhoDiario.id ) {
      props.routeNotStarted();
    } else if( !trabalhoDiario.horaInicio ) {
      props.routeNotStarted();
    }

    props.changeSidebar(2, 1);
    setEmptyRows(rowsPerPage - Math.min(
      rowsPerPage, rows.length - page * rowsPerPage
    ));

    const [ d, m, Y ]  = new Date().toLocaleDateString('en-GB').split('/');
    const current_date = `${Y}-${m}-${d}`;

    props.getRouteRequest( usuario.id, current_date );
    props.resetHandleSave();
  }, []);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';

    setOrder( isDesc ? 'asc' : 'desc' );
    setOrderBy( property );
  }

  function handleSelectAllClick( event ) {
    if (event.target.checked) {
      const newSelecteds = rows.map (n => n.id );

      setSelected( newSelecteds );
      return;
    }

    setSelected( [] );
  }

  function handleClick( e, id ) {
    const selectedIndex = selected.indexOf( id );
    let newSelected = [];

    if( selectedIndex === -1 ) {
      newSelected = newSelected.concat( selected, id );
    } else if ( selectedIndex === 0 ) {
      newSelected = newSelected.concat( selected.slice(1) );
    } else if ( selectedIndex === selected.length - 1 ) {
      newSelected = newSelected.concat( selected.slice( 0, -1 ) );
    } else if ( selectedIndex > 0 ) {
      newSelected = newSelected.concat(
        selected.slice( 0, selectedIndex ),
        selected.slice( selectedIndex + 1 ),
      );
    }

    setSelected( newSelected );
  }

  function handleChangePage( event, newPage ) {
    setPage( newPage );
  }

  function handleChangeRowsPerPage( event ) {
    setRowsPerPage( parseInt( event.target.value, 10 ) );
    setPage( 0 );
  }

  function handleChangeDense( event ){
    setDense( event.target.checked );
  }

  function isSelected( id ) { return selected.indexOf( id ) !== -1; }

  function openModalFinalizarRota() {
    $('#modal-finalizar-rota').modal('show');
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><FaClipboardCheck /></PageIcon>
          Vistoria de Campo
        </h3>
      </PageHeader>

      <section className="card-list">
        <ModalFinalizarTrabalho id="modal-finalizar-rota" />
        <Row>
          <PagePopUp className="w-100">
            <div className="card">
              <Row>
                <Col className="d-flex align-items-center">
                  <Button
                    type="button"
                    className="success btn-small mr-2"
                    onClick={ openModalFinalizarRota }>
                    <FaCheckDouble className="btn-icon" />
                    Encerrar Rota
                  </Button>

                  <label className="m-0">
                    Após finalizar a rota não será mais possível modificar os dados das vistorias!
                  </label>
                </Col>
              </Row>
            </div>
          </PagePopUp>
        </Row>

        <Row>
          <article className="col-md-12 stretch-card mb-0" style={{ paddingTop: 15 }}>
            <div style={{ height: '300px', width: '100%', backgroundColor: '#ccc' }}>
              {/* <Map
                className="map"
                style={{width: 'calc(100vw - 365px)', height: '300px', position: 'relative'}}
                google={ props.google }
                zoom={14} >
                <Marker
                  onClick={ console.log('teste') }
                  name={'Current location'} />
              </Map> */}
            </div>
          </article>
        </Row>

        <Row>
          <article className="col-md-12 stretch-card mb-0">
            <Col className="p-0">
              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enanced table">

                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                      headCells={headCells}
                    />

                    <TableBody>
                      {stableSort(rows, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${row.id}`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={ isItemSelected }
                              tabIndex={-1}
                              key={row.id}
                              selected={ isItemSelected }
                            >
                              <TableCell padding="checkbox" onClick={ e => handleClick( e, row.id ) }>
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell component="th" id={labelId} scope="row">
                                {row.numQuarteirao}
                              </TableCell>
                              <TableCell align="left">{row.logradouro}</TableCell>
                              <TableCell align="left">{row.numero}</TableCell>
                              <TableCell align="left">{row.sequencia}</TableCell>
                              <TableCell align="left">{row.tipoImovel}</TableCell>
                              <TableCell align="left">{row.visita}</TableCell>
                              <TableCell align="left">{row.pendencia}</TableCell>
                              <TableCell align="left">{row.horaInicio}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                  </Table>
                </div>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={ rows.length }
                  rowsPerPage={ rowsPerPage }
                  page={ page }
                  onChangePage={ handleChangePage }
                  onChangeRowsPerPage={ handleChangeRowsPerPage }
                  labelRowsPerPage="Linhas por página"
                  labelDisplayedRows={ ({ from, to, count }) => {
                    let result = to === -1 ? count : to;
                    return from + "-" + result + " de " + count;
                  }}
                />
              </Paper>
            </Col>
          </article>
        </Row>
        <Row>
          <article className="col-md-12 pt-0">
            <Col className="p-0">
              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Espaçamento denso"
              />
            </Col>
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  trabalhoDiario: state.rotaCache.trabalhoDiario,
  rota: state.rotaCache.rota,
  quarteirao: state.quarteirao.quarteirao,
  form_vistoria: state.supportInfo.form_vistoria,
  vistorias: state.vistoriaCache.vistorias,
  showNotStarted: state.vistoriaCache.showNotStarted
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeSidebar,
    getRouteRequest,
    resetHandleSave,
    routeNotStarted
  }, dispatch);

const LoadingContainer = (props) => (
  <div>Carregando mapa...</div>
)

export default GoogleApiWrapper({
  apiKey: ( process.env.REACT_API_MAP_KEY ),
  LoadingContainer: LoadingContainer,
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Vistoria));
