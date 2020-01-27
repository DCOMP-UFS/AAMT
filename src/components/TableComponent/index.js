/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ContainerTable } from './styles';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeTableSelected } from '../../store/actions/supportInfo';

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
        <props.typographyTable className={ classes.title }>
          {numSelected} selecionadas
        </props.typographyTable>
      ) : (
        <div className={ classes.title }>
          <h4 className="title">{ props.title }</h4>
          <p className="text-description">{ props.description }</p>
        </div>
      )}

      {numSelected > 0 ? (
        <props.TooltipSelected />
      ) : (
        <div className={ classes.contentTooltip }>
          <props.TooltipUnselected className={ classes.marginRight } />

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

function TableComponent({ title, description, ...props}) {
  const [ rows, setRows ] = useState([]);
  const [ headCells ] = useState( props.headCells );
  const [ order, setOrder ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('horaInicio');
  const [ selected, setSelected ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ dense, setDense ] = useState(true);
  const [ rowsPerPage, setRowsPerPage ] = useState(5);

  useEffect(() => {
    setRows( props.rows );
  }, [props.rows]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';

    setOrder( isDesc ? 'asc' : 'desc' );
    setOrderBy( property );
  };

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected( newSelecteds );
      saveReducerSelected( newSelecteds );
      return;
    }

    setSelected([]);
  };

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected( newSelected );

    if( props.id ) {
      saveReducerSelected( newSelected );
    }
  };

  function saveReducerSelected( newSelected ) {
    let objSelected = [];

      newSelected.forEach((value) => {
        objSelected = [ ...objSelected, rows[--value] ];
      });

      props.changeTableSelected( props.id, objSelected );
  }

  function handleChangePage(event, newPage) {
    setPage( newPage );
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage( parseInt(event.target.value, 10) );
    setPage( 0 );
  };

  function handleChangeDense(event) {
    setDense( event.target.checked );
  };

  function isSelected(id) { return selected.indexOf(id) !== -1; }

  const emptyRows = rowsPerPage - Math.min(
    rowsPerPage, rows.length - page * rowsPerPage
  );

  return (
    <>
      <EnhancedTableToolbar
        title={ title }
        description={ description }
        numSelected={ selected.length }
        typographyTable={ props.TypographyTable }
        TooltipSelected={ props.TooltipSelected }
        TooltipUnselected={ props.TooltipUnselected } />
      <ContainerTable className={classes.tableWrapper}>
        <Table
          id={ props.id }
          className={ classes.table }
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
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={ row.id }
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox" onClick={event => handleClick(event, row.id)} >
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>

                  {headCells.map(( head, index ) => {
                    if( head.id === 'actions' ) {
                      const [ ComponentAction, params ] = row.actions;

                      return (
                        <TableCell key={ index } id={labelId} scope="row" padding="none">
                          <ComponentAction index={ params } />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={ index } id={labelId} scope="row" padding="none">
                        { row[head.id] }
                      </TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={ headCells.length + 1 } />
            </TableRow>
          )}
          </TableBody>

        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página"
          labelDisplayedRows={ ({ from, to, count }) => {
            let result = to === -1 ? count : to;
            return from + "-" + result + " de " + count;
          }}
        />
      </ContainerTable>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Espaçamento denso"
      />
    </>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTableSelected }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent);
