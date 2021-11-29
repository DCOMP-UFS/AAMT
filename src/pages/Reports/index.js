import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import OptionMenu from '../../components/OptionMenu';

import { Container } from './styles';

const Reports = ({ profile }) => {
  const supervisorReports = [
    {
      title: 'Boletim Diário',
      description: 'Informações das atividades desempenhadas',
      iconColor: '#ffb26a',
      goTo: 'Selecione a atividade',
      observation: 'diary-report-agent',
    },
    // {
    //   title: 'Boletim Diário por Equipe',
    //   description: 'Progresso da equipe nas atividades',
    //   iconColor: '#35c32a',
    //   goTo: 'Selecione a atividade',
    //   observation: 'diary-report-team',
    // },
    {
      title: 'Boletim Semanal',
      description: 'Resumo da semana epidemiológica',
      iconColor: '#ef476f',
      goTo: 'Selecione a atividade',
      observation: 'weekly-report',
    },
    {
      title: 'Boletim Geral da Atividade',
      description: 'Informações completas da atividade',
      iconColor: '#7954A1',
      goTo: 'Selecione a atividade',
      observation: 'current-activity-report',
    },
    // {
    //   title: 'Boletim da Equipe por Atividade',
    //   description: 'Desempenho da equipe na atividade',
    //   iconColor: '#0292B7',
    //   goTo: 'Selecione a atividade',
    //   observation: 'team-activity-report',
    // },
  ];

  const agentReports = [
    {
      title: 'Boletim Diário',
      description: 'Resumo do trabalho diário do agente',
      iconColor: '#ffb26a',
      goTo: 'Trabalhos diários',
      observation: 'diary-report-agent',
    },
  ];

  function chooseUser() {
    const profileType = profile.atuacoes[0].tipoPerfil;

    switch (profileType) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        return supervisorReports;
      case 4:
        return agentReports;
      default:
        break;
    }
  }

  const navigation = useNavigation();

  return (
    <>
      <Container>
        {chooseUser().map(item => (
          <TouchableOpacity
            key={item.title}
            onPress={() =>
              navigation.navigate(item.goTo, { observation: item.observation })
            }
          >
            <OptionMenu
              title={item.title}
              description={item.description}
              icon="file-alt"
              iconColor={item.iconColor}
            />
          </TouchableOpacity>
        ))}
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Reports);
