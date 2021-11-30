import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  IoIosHeart,
  IoIosBaseball,
} from 'react-icons/io';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ACTIONS
import { changeSidebar } from '../../store/Sidebar/sidebarActions';

import "./style.css";

class Typography extends Component {
  constructor(props) {
    super(props);

    this.props.changeSidebar(8, 2);
  }

  render () {
    return (
      <section className="card-list">
        <div className="row">
          <article className="theme-article col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Cabeçalhos</h4>
              <p className="text-description">Adicionar tags <code>&lt;h1&gt;</code> para <code>&lt;h6&gt;</code></p>

              <h1>h1. Cabeçalho</h1>
              <h2>h2. Cabeçalho</h2>
              <h3>h3. Cabeçalho</h3>
              <h4>h4. Cabeçalho</h4>
              <h5>h5. Cabeçalho</h5>
              <h6>h6. Cabeçalho</h6>
            </div>
          </article>

          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Cabeçalhos Com Texto Secundário</h4>
              <p className="text-description">Adicionar texto secundário desbotado aos títulos</p>

              <h1>h1. Cabeçalho <small>texto secundário</small></h1>
              <h2>h2. Cabeçalho <small>texto secundário</small></h2>
              <h3>h3. Cabeçalho <small>texto secundário</small></h3>
              <h4>h4. Cabeçalho <small>texto secundário</small></h4>
              <h5>h5. Cabeçalho <small>texto secundário</small></h5>
              <h6>h6. Cabeçalho <small>texto secundário</small></h6>
            </div>
          </article>

          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Display de Cabeçalho</h4>
              <p className="text-description">Adicione a classe <code>.display-1</code> até <code>.display-4</code></p>

              <h1 className="display-1">Display 1</h1>
              <h1 className="display-2">Display 2</h1>
              <h1 className="display-3">Display 3</h1>
              <h1 className="display-4">Display 4</h1>
            </div>
          </article>

          <article className="theme-article col-md-6 stretch-card align-items-stretch">
            <div className="row stretch-row">
              <article className="theme-article col-md-12 stretch-card">
                <div className="card">
                  <h4 className="title">Parágrafo</h4>
                  <p className="text-description">Escreva o texto dentro da tag <code>&lt;p&gt;</code></p>

                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley not only five centuries,</p>
                </div>
              </article>

              <article className="theme-article col-md-12 mb-0 stretch-card">
                <div className="card">
                  <h4 className="title">Tamanho dos Ícones</h4>
                  <p className="text-description">Adicione a classe <code>.icon-lg</code>, <code>.icon-md</code>, <code>.icon-sm</code></p>

                  <ul className="list-icon list-group list-group-horizontal">
                    <li><IoIosHeart className="text-warning icon-lg" /> Icon-lg</li>
                    <li><IoIosHeart className="text-success icon-md" /> Icon-md</li>
                    <li><IoIosHeart className="text-danger icon-sm" /> Icon-sm</li>
                  </ul>
                </div>
              </article>
            </div>
          </article>

          {/* Blockquotes */}
          <article className="theme-article col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Blockquotes</h4>
              <p className="text-description">
                Use a tag <code>&lt;blockquote className="blockquote"&gt;</code>
              </p>

                <blockquote className="blockquote">
                  <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </blockquote>

                <blockquote className="blockquote blockquote-primary mt-5">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
            </div>
          </article>

          {/* Utilities */}
          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Endereços</h4>
              <p className="text-description">Use a tag <code>&lt;adress&gt;</code></p>

              <div className="row mb-3">
                <div className="col-md-6">
                  <address>
                    <p className="font-weight-bold">Connect Plus imc</p>
                    <p> 695 lsom Ave, </p>
                    <p> Suite 00 </p>
                    <p> San Francisco, CA 94107 </p>
                  </address>
                </div>
                <div className="col-md-6">
                  <address className="text-primary">
                    <p className="font-weight-bold"> E-mail </p>
                    <p className="mb-2"> johndoe@examplemeail.com </p>
                    <p className="font-weight-bold"> Web Address </p>
                    <p> www.Connect Plus.com </p>
                  </address>
                </div>
              </div>

              <h4 className="title">Lead</h4>
              <p className="text-description">Use a classe <code>.lead</code></p>

              <p className="lead"> Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. </p>
            </div>
          </article>

          {/* Cores dos textos */}
          <article className="theme-article col-md-12 stretch-card">
            <div className="card">
              <h4 className="title">Cor de Texto</h4>
              <p className="text-description">Use as classes <code>.text-primary</code>, <code>.text-secundary</code>, etc. para usar as cores de texto do tema</p>

              <div className="row">
                <div className="col-md-6">
                  <p className="text-primary">.text-primary</p>
                  <p className="text-success">.text-success</p>
                  <p className="text-danger">.text-danger</p>
                  <p className="text-warning">.text-warning</p>
                  <p className="text-info">.text-info</p>
                </div>
                <div className="col-md-6">
                  <p className="text-light bg-dark pl-1">.text-light</p>
                  <p className="text-secondary">.text-secondary</p>
                  <p className="text-dark">.text-dark</p>
                  <p className="text-muted">.text-muted</p>
                  <p className="text-white bg-dark pl-1">.text-white</p>
                </div>
              </div>
            </div>
          </article>

          {/* Alinhamento FLEX */}
          <div className="col-md-12">
            <div className="row">

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Top - Alinhamento de mídia</h4>

                  <div className="media">
                    <IoIosBaseball className="icon-lg align-self-start text-info mr-3" />
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque.</p>
                  </div>
                </div>
              </article>

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Center - Alinhamento de mídia</h4>

                  <div className="media">
                    <IoIosBaseball className="icon-lg align-self-center text-info mr-3" />
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque.</p>
                  </div>
                </div>
              </article>

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Bottom - Alinhamento de mídia</h4>

                  <div className="media">
                    <IoIosBaseball className="icon-lg align-self-end text-info mr-3" />
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque.</p>
                  </div>
                </div>
              </article>

            </div>
          </div>

          {/* Marcador de Texto */}
          <article className="theme-article col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Marcador de texto</h4>
              <p
                className="text-description">
                  Envolva o texto com a tag <code>&lt;mark&gt;</code> para marcar o texto
                </p>

              <p>
                It is a long <mark className="bg-warning text-white">established</mark> fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
              </p>
            </div>
          </article>

          {/* Listas sem decoração */}
          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Lista sem decoração</h4>

              <ul>
                  <li>Lorem ipsum dolor sit amet</li>
                  <li>Consectetur adipiscing elit</li>
                  <li>Integer molestie lorem at massa</li>
                  <li>Facilisis in pretium nisl aliquet</li>
                  <li>Nulla volutpat aliquam velit</li>
                </ul>
            </div>
          </article>

          {/* Negrito */}
          <article className="theme-article col-md-6 stretch-card">
            <div className="card">
              <h4 className="title">Texto em negrito</h4>
              <p
                className="text-description">
                  Use a classe <code>.font-weight-bold</code>
                </p>

              <p>
                It is a long <span className="font-weight-bold">established fact</span> that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
              </p>
            </div>
          </article>

          {/* Lista ordenada */}
          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Lista ordenada</h4>

              <ol>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit</li>
              </ol>
            </div>
          </article>

          {/* Decorando Texto */}
          <article className="theme-article col-md-6 stretch-card">
            <div className="card">
              <h4 className="title text-primary">Sublinhado</h4>
              <p
                className="text-description">
                  Use a tag <code>&lt;u&gt;</code> para adicionar o sublinhado
                </p>

              <p className="mb-5">
                <u>lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.</u>
              </p>

              <h4 className="title text-danger">Minúsculas</h4>
              <p
                className="text-description">
                  Use a classe <code>.text-lowercase</code>
                </p>

              <p className="text-lowercase mb-5">
                lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <h4 className="title text-warning">Maiúsculas</h4>
              <p
                className="text-description">
                  Use a classe <code>.text-uppercase</code>
                </p>

              <p className="text-uppercase">
                lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </article>

          {/* Decorando texto */}
          <article className="theme-article col-md-6  stretch-card">
            <div className="card">
              <h4 className="title">Mudo</h4>
              <p
                className="text-description">
                  Use a classe <code>.text-muted</code>
                </p>

              <p className="text-muted mb-5">
                lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <h4 className="title text-success">Strike</h4>
              <p
                className="text-description">
                  Use a tag <code>&lt;del&gt;</code>
                </p>

              <p className="mb-5">
                <del>lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.</del>
              </p>

              <h4 className="title text-info">Capitalizado</h4>
              <p className="text-description">
                Use a classe <code>.text-capitalize</code>
              </p>

              <p className="text-capitalize mb-5">
                lorem ipsum dolor sit amet, consectetur mod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </article>

          {/* Lista com icon */}
          <div className="col-md-12">
            <div className="row">

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Lista com ícone</h4>
                  <p className="text-description">
                    Adicione a classe <code>.list-ticked</code> em uma <code>&lt;ul&gt;</code>
                  </p>

                  <ul className="list-ticked">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>Nulla volutpat aliquam velit</li>
                  </ul>
                </div>
              </article>

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Lista com ícone</h4>
                  <p className="text-description">
                    Adicione a classe <code>.list-arrow</code> em uma <code>&lt;ul&gt;</code>
                  </p>

                  <ul className="list-arrow">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>Nulla volutpat aliquam velit</li>
                  </ul>
                </div>
              </article>

              <article className="theme-article col-md-4 stretch-card">
                <div className="card">
                  <h4 className="title">Lista com ícone</h4>
                  <p className="text-description">
                    Adicione a classe <code>.list-star</code> em uma <code>&lt;ul&gt;</code>
                  </p>

                  <ul className="list-star">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>Nulla volutpat aliquam velit</li>
                  </ul>
                </div>
              </article>

            </div>
          </div>

        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSidebar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Typography);
