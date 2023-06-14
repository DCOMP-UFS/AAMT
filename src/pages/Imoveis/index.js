import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IoIosHome } from 'react-icons/io';
import { FaPenSquare } from 'react-icons/fa';
import Table, { ButtonAdd, ButtonDelete } from '../../components/Table';
import { Row } from 'react-bootstrap';
import { tipoImovelEnum } from '../../config/enumerate';
import ModalImovel from './components/ModalImovel';
import { Tooltip, IconButton } from '@material-ui/core';
import $ from 'jquery';
import { ModalConfirm } from '../../components/Modal';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';
import { getImoveisMunicipioRequest, setImovel, deletarImovelRequest, setImovelUpdate } from '../../store/Imovel/imovelActions';

// Styles
import { Container } from './styles';
import { PageIcon, PageHeader } from '../../styles/util';

const columns = [
  {
    name: "quarteiraoNumero",
    label: "Nº quart.",
    options: {
      filter: true
    }
  },
  {
    name: "quarteiraoSequencia",
    label: "Sequencia quart.",
    options: {
      filter: true
    }
  },
  {
    name: "localidade",
    label: "Localidade",
    options: {
      filter: true
    }
  },
  {
    name: "lado",
    label: "Logradouro",
    options: {
      filter: true
    }
  },
  {
    name: "numero",
    label: "Nº imóvel",
    options: {
      filter: false
    }
  },
  {
    name: "sequencia",
    label: "Sequência imóvel",
    options: {
      filter: false
    }
  },
  {
    name: "tipo_imovel",
    label: "Tipo",
    options: {
      filter: true
    }
  },
  {
    name: "ativo",
    label: "Situação",
    options: {
      filter: true
    }
  },
  {
    name: "complemento",
    label: "Complemento",
    options: {
      filter: false,
      display: false,
    }
  },
  {
    name: "acoes",
    label: "Ações",
    options: {
      filter: false
    }
  }
];

export const Imoveis = ({ imoveis, usuario, ...props }) => {
  const [ rowsSelected, setRowsSelected ] = useState( [] );
  const [ rows, setRows ]                 = useState( [] );
  const [ isModalOpen, setIsModalOpen]    = useState( false );
  const options = {
    customToolbar: () => {
      return (
        <ButtonAdd
          title="Adicionar Imóvel"
          data-toggle="modal"
          data-target="#modal-imovel"
          onClick={ () => {
            props.setImovel( {} )
            setIsModalOpen(true)
          } }
        />
      );
    },
    customToolbarSelect: () => {
      return (
        <ButtonDelete
          title="Desativar Imóveis"
          data-toggle="modal"
          data-target="#modal-deletar-imovel"
        />
      );
    },
    onRowsSelect : ( curRowSelected, allRowsSelected ) => {
      setRowsSelected( allRowsSelected.map( ({ dataIndex }) => dataIndex ) );
    }
  };

  useEffect(() => {
    props.changeSidebar( "imovel" );
    props.getImoveisMunicipioRequest( usuario.municipio.id );
  }, []);

  useEffect(() => {
    if( imoveis.length ) {
      let r = rows;

      r = imoveis.map( ( imovel, index ) => ([
        imovel.quarteirao.numero,
        imovel.quarteirao.sequencia,
        imovel.localidade.nome,
        imovel.logradouro,
        imovel.numero,
        imovel.sequencia,
        tipoImovelEnum.find( tipo => tipo.id === imovel.tipoImovel ).label,
        imovel.ativo ? 'Ativo' : 'Inativo',
        imovel.complemento,
        <Tooltip
            className="bg-warning text-white"
            title="Editar"
            onClick={ () => {
              setIsModalOpen(true)
              handlerImovel( index )
            } }
          >
            <IconButton aria-label="Editar">
              <FaPenSquare />
            </IconButton>
          </Tooltip>
      ]));

      setRows( r );
    }
  }, [ imoveis, props.reload ]);

  const handlerImovel = index => {
    props.setImovelUpdate( index )
    props.setImovel( imoveis[ index ] );

    $( '#modal-imovel' ).modal( 'show' );
  }

  const handleClose = () => {setIsModalOpen(false)}

  /**
   * Aciona o action para remover os imóveis
   */
  const desativarImoveis = () => {
    rowsSelected.forEach( index => {
      //essa função na verdade irá desativar o imovel para
      //que não seja mais acessivel para o usario
      props.deletarImovelRequest( imoveis[ index ].id );
    } );

    setRowsSelected( [] );
  }

  return (
    <Container>
      <PageHeader>
        <h3 className="page-title">
          <PageIcon><IoIosHome /></PageIcon>
          Imóveis do Município
        </h3>
      </PageHeader>
      <section className="card-list">
        <Row>
          <article className="col-md-12 stretch-card">
            <Table
              title={ `Imóveis` }
              columns={ columns }
              data={ rows }
              options={ options }
            />
            <ModalImovel isOpen={isModalOpen} handleClose={handleClose} />
            <ModalConfirm id="modal-deletar-imovel" title="Deletar Imóvel" confirm={ desativarImoveis }>
              <p>Deseja realmente deletar o(s) imóvel(is)</p>
            </ModalConfirm>
          </article>
        </Row>
      </section>
    </Container>
  );
}

const mapStateToProps = state => ({
  usuario: state.appConfig.usuario,
  imoveis: state.imovel.imoveis,
  imovel: state.imovel.imovel,
  reload: state.imovel.reload,
})

const mapDispatchToProps = {
  changeSidebar,
  getImoveisMunicipioRequest,
  setImovel,
  deletarImovelRequest,
  setImovelUpdate
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Imoveis )
