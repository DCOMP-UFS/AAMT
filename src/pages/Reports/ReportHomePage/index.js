import React from 'react';
import { StatusBar, TouchableWithoutFeedback } from 'react-native';
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
  ];

  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
