import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import OptionMenu from '../../../components/OptionMenu';

import { Container } from './styles';

const ReportHomePage = () => {
  const reportsContent = [
    {
      title: 'Relatório diário do agente',
      description: 'Informações das atividades desempenhadas',
      icon: 'description',
      iconColor: '#ffb26a',
      goTo: 'Atividades',
      observation: 'diary-report-agent',
    },
    {
      title: 'Relatório diário da equipe',
      description: 'Progresso da equipe nas atividades',
      icon: 'description',
      iconColor: '#35c32a',
      goTo: 'Atividades',
      observation: 'diary-report-team',
    },
    {
      title: 'Relatório semanal da atividade',
      description: 'Relatório da semana epidemiológica',
      icon: 'description',
      iconColor: '#ef476f',
      goTo: 'Atividades',
      observation: 'weekly-report',
    },
    {
      title: 'Relatório da atividade atual',
      description: 'Informações da atividade em tempo real',
      icon: 'description',
      iconColor: '#7954A1',
      goTo: 'Atividades',
      observation: 'current-activity-report',
    },
    {
      title: 'Relatório da equipe por atividade',
      description: 'Desempenho da equipe na atividade',
      icon: 'description',
      iconColor: '#0292B7',
      goTo: 'Atividades',
      observation: 'team-activity-report',
    },
  ];

  const navigation = useNavigation();

  return (
    <>
      <Container>
        {reportsContent.map(item => (
          <TouchableWithoutFeedback
            key={item.title}
            onPress={() =>
              navigation.navigate(item.goTo, { observation: item.observation })
            }
          >
            <OptionMenu
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconColor={item.iconColor}
            />
          </TouchableWithoutFeedback>
        ))}
      </Container>
    </>
  );
};

export default ReportHomePage;
