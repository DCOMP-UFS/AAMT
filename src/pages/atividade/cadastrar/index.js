import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { IoIosClose } from 'react-icons/io';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

import { Button } from '../../../styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../../store/actions/sidebar'

import './style.css';

// COMPONENTS
import { selectDefault, Separator } from '../../../styles/global';
import ButtonClose from '../../../components/ButtonClose';

export class CDT_Atividade extends Component {
  state = {
    suportInfo: {
      persons: [
        { id: 1, name: "Capitão" },
        { id: 2, name: "Recruta" },
        { id: 3, name: "Kowalski" },
        { id: 4, name: "Rico" },
        { id: 5, name: "Rei Julien" },
        { id: 6, name: "Mort" },
        { id: 7, name: "Maurice" },
        { id: 8, name: "Alex" },
        { id: 9, name: "Mart" },
        { id: 10, name: "Glória" },
        { id: 11, name: "Melman" },
      ],
      tempPersonEquipe: [],
      modalTeamSelect: -1,
    },

    optionLocal: [],
    optionAbrangencia: [
      { value: 'na', label: 'Nacional'},
      { value: 're', label: 'Regional'},
      { value: 'es', label: 'Estadual'},
      { value: 'mu', label: 'Municipal'},
      { value: 'lo', label: 'Por localidade'},
      { value: 'zo', label: 'Por zona'},
      { value: 'qt', label: 'Por quarteirão'}
    ],
    optionFormulario: [
      { value: 'liraa', label: 'LIRAa' },
      { value: 'pncd', label: 'PNCD' }
    ],
    local: null,
    abrangencia: null,
    equipes: [
      {
        members: [
          { id: 1, name: "Capitão", office: "supervisor" },
          { id: 2, name: "Recruta", office: "tecnico" },
          { id: 3, name: "Kowalski", office: "tecnico" },
          { id: 4, name: "Rico", office: "tecnico" },
        ]
      },
      {
        members: [
          { id: 5, name: "Rei Julien", office: "supervisor" },
          { id: 6, name: "Mort", office: "tecnico" },
          { id: 7, name: "Maurice", office: "tecnico" },
        ]
      }
    ],
  };

  constructor(props){
    super(props);

    this.props.changeSidebar(3, 0);
  }

  handleLocal = ( local ) => {
    this.setState({ local });
    console.log('Option selected:', local);
  }

  handleAbrangencia = ( abrangencia ) => {
    this.setState({ abrangencia });

    switch(abrangencia.value) {
      case 'na':
        this.setState({ optionLocal: [
          { value: '1', label: 'Brasil' },
          { value: '2', label: 'México' }
        ]});
        break;

      case 'mu':
        this.setState({optionLocal: [
          { value: '1', label: 'Simão Dias' },
          { value: '2', label: 'Aracaju' },
          { value: '3', label: 'São Cristóvão' },
          { value: '4', label: 'Nossa Senhora do Socorro' }
        ]});
        break;
      default:
        break;
    }

    console.log('Abrangência: ', abrangencia);
  }

  handleFormulario = ( formulario ) => {
    this.setState({ formulario });
    console.log('Option selected:', formulario);
  }

  openModalTeam = ( index ) => {
    // const teamList = this.state.equipes.concat({
    //   id: 3 ,
    //   supervisor: "Alex",
    //   membros: [ "Marty", "Glória", "Melman" ]
    // });

    this.setState(prevState => {
      let suportInfo = Object.assign({}, prevState.suportInfo);
      suportInfo.tempPersonEquipe = [];
      suportInfo.modalTeamSelect = index;

      return { suportInfo };
    });

    console.log(this.state.suportInfo.modalTeamSelect);


    $('#modalTeam').modal('show');
  }

  removeTeam = ( index ) => {
    const array = this.state.equipes; // make a separate copy of the array

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ equipes: array });
    }

  }

  render() {
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

              <form className="form-basico">
                {/* <DADOS_GERAIS> */}
                <section>
                  <div className="form-group">
                    <label>Qual abrangência da atividade que deseja iniciar?<code>*</code></label>
                    <Select
                      styles={ selectDefault }
                      options={this.state.optionAbrangencia}
                      onChange={this.handleAbrangencia}
                      />
                  </div>

                  <div className="d-flex w-100 container-map">
                    <div>
                      <div className="form-group">
                        <label>Local<code>*</code></label>
                        <Select
                          styles={ selectDefault }
                          options={this.state.optionLocal}
                          onChange={this.handleLocal}
                          isMulti />
                      </div>

                      <div className="form-group">
                        <label>Período<code>*</code></label>
                        <input type="datetime" className="form-control" />
                      </div>

                      <div className="form-group">
                        <input type="datetime" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group pl-5">
                      <Map className="map" google={this.props.google} zoom={14}>

                        <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />

                      </Map>
                    </div>
                  </div>
                </section>
                {/* </DADOS_GERAIS> */}

                <Separator />

                {/* <EQUIPES> */}
                <section>

                  <h4 className="label-separator">
                    Equipes
                  </h4>
                  <p className="text-description">Insira as equipes e os supervisores que irão trabalhar na atividade</p>

                  <div className="container-equipe">

                    <div className="container-equipe-body">
                      <TeamList
                        equipes={ this.state.equipes }
                        openModalTeamFunction={ this.openModalTeam }
                        removeFunction={ this.removeTeam } />
                    </div>

                    <div className="container-equipe-footer">
                      <Button
                        type="button"
                        className="success"
                        data-toggle="modal"
                        data-target=".modalTeam"
                        onClick={ () => { this.openModalTeam(-1) } }>Nova</Button>
                    </div>

                    <div id="modalTeam" className="modal fade modalTeam" tabIndex="-1" role="dialog" aria-labelledby="modalTeam" aria-hidden="true">
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div>
                              <h5 className="title">Cadastro de uma nova equipe</h5>
                              <p className="text-description">
                                Dê um clique duplo no botão esquerdo do mouse para adicionar ou remover um agentes a equipe
                              </p>
                            </div>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                              <span aria-hidden="true">&times;</span>
                            </button> */}

                            <ButtonClose
                              title="Fechar"
                              data-dismiss="modal" />
                          </div>
                          <div className="modal-body d-flex flex-row">
                            <div className="container-agentes">
                              <h4>Agentes</h4>

                              <PersonList
                                persons={ this.state.suportInfo.persons }
                                addPesonFunction= { () => alert('Add person') } />
                            </div>

                            <div className="container-nova-equipe">
                              <h4>Equipe</h4>

                              <NewTeamList
                                removePersonFunction={ () => alert('Remove person') }
                                equipe={
                                    this.state.suportInfo.modalTeamSelect === -1 ?
                                      this.state.suportInfo.tempPersonEquipe :
                                      this.state.equipes[this.state.suportInfo.modalTeamSelect]
                                  } />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Button type="button" className="secondary" data-dismiss="modal">Fechar</Button>
                            <Button type="button">Cadastrar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </section>
                {/* </EQUIPES> */}

                <Separator />

                {/* <BOLETIM_DE_CAMPO> */}
                <section>
                  <h4 className="label-separator">
                    Formulário de Vistoria
                  </h4>

                  <div className="form-group">
                    <label>Tipo de atividade?</label>
                    <Select
                      styles={ selectDefault }
                      options={this.state.optionFormulario}
                      onChange={this.handleFormulario}
                      />
                  </div>

                  <div className="form-group">
                    <label htmlFor="objetivo">Objetivo da atividade<code>*</code></label>
                    <Select
                      styles={ selectDefault } />
                  </div>
                </section>
                {/* </BOLETIM_DE_CAMPO> */}
              </form>
            </div>
          </article>
        </div>
      </section>
    )
  }
}

function TeamList(props) {

  const removeFunction = props.removeFunction;
  const openModalTeamFunction = props.openModalTeamFunction;

  const listItems = props.equipes.map(( equipe, index) => {

    const supervisingMember = equipe.members.filter( ( member ) => member.office === "supervisor" )[0];

    return (
      <li key={index}>
        <h5 className="title" onClick={ () => { openModalTeamFunction(index) } }>Equipe: { supervisingMember.name }</h5>

        <small className="equipe-remove">
          <ButtonClose
            title="Excluir"
            classIcon="icon-sm"
            onClick={ () => { removeFunction(index); } } />
        </small>
      </li>
    );

  });

  return (
    <ul className="list-to-do list-equipe">
      { listItems }
    </ul>
  );

}

function PersonList(props) {

  const addPerson = props.addPesonFunction;

  const listItems = props.persons.map(( person, index ) =>
    <li key={person.id}>
      <h5 className="title" onDoubleClick={ () => { addPerson(index) } }>{ person.name }</h5>
    </li>
  );

  return (
    <ul className="list-to-do list-person">
      { listItems }
    </ul>
  );

}

function NewTeamList(props) {
  const removePerson = props.removePersonFunction;

  const listItems = props.equipe.map(( member ) =>
    <li key={member.id}>
      <h5 className="title" onDoubleClick={ () => { removePerson(member.id) } }>{ member.name }</h5>

      <small className="equipe-remove">
        <button type="button" className="btn-inverse-danger" onClick={ () => { removePerson(member.id); } }>
          <IoIosClose className="icon-sm" />
        </button>
      </small>
    </li>
  );

  return (
    <ul className="list-to-do list-team">
      { listItems }
    </ul>
  );
}

const LoadingContainer = (props) => (
  <div>Carregando mapa...</div>
)

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCYow9L-l0V_XA6kzpt-62S4-VGKwLy65w"),
  LoadingContainer: LoadingContainer
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(CDT_Atividade))
