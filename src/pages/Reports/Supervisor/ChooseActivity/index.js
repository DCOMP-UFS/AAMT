import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import api from '../../../../services/api';

import Button from '../../../../components/Button';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Card,
  Header,
  Title,
  AccordionHeader,
  AccordionTitle,
  AccordionItemText,
  Box,
  Label,
  Smaller,
} from './styles';

const ChooseActivity = () => {
  const [activities, setActivities] = useState([]);

  const userId = useSelector(state => state.user.profile.id);

  const navigation = useNavigation();
  const route = useRoute();
  const { observation } = route.params;

  console.log(observation);
  console.log(userId);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await api.get(
          `/atividades/abertas/${userId}/usuarios`
        );

        setActivities(response.data);

        console.log(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    loadActivities();
  }, []);

  console.log(observation);

  function navigationTo(id, equipe_id) {
    if (observation === 'diary-report-agent') {
      return navigation.navigate('Lista de atividades', {
        id,
      });
    }
    if (observation === 'diary-report-team') {
      return navigation.navigate('Escolher a data', {
        id,
      });
    }
    if (observation === 'weekly-report') {
      return navigation.navigate('Escolher a semana', {
        id,
      });
    }
    if (observation === 'current-activity-report') {
      return navigation.navigate('Relatorio da atividade atual', {
        id,
      });
    }
    if (observation === 'team-activity-report') {
      return navigation.navigate('Relatorio da equipe na atividade', {
        id,
        equipe_id,
      });
    }
  }

  return (
    <Container>
      {activities.map(activity => (
        <Card key={activity.id}>
          <Header>
            <Icon size={23} name="assignment" color="#3a3c4e" />
            <Title>{activity.metodologia.sigla}</Title>
          </Header>
          <Label>Objetivo</Label>
          <Smaller>{activity.objetivo.descricao}</Smaller>
          <Label>Data de início</Label>
          <Smaller>
            {format(parseISO(activity.createdAt), 'dd/MM/yyyy')}
          </Smaller>

          {observation === 'weekly-report' && (
            <Button onPress={() => navigationTo(activity.id, 0)}>
              Selecionar atividade
            </Button>
          )}

          {observation === 'current-activity-report' && (
            <Button onPress={() => navigationTo(activity.id, 0)}>
              Selecionar atividade
            </Button>
          )}

          {observation !== 'weekly-report' &&
            observation !== 'current-activity-report' &&
            activity.equipes.map((team, index) => (
              <Collapse key={index} style={{ margin: 5 }}>
                <CollapseHeader>
                  <AccordionHeader>
                    <AccordionTitle>{`Equipe ${index + 1}`}</AccordionTitle>
                  </AccordionHeader>
                </CollapseHeader>
                <CollapseBody>
                  <Box>
                    {team.membros.map(
                      member =>
                        member.tipo_perfil === 3 && (
                          <TouchableWithoutFeedback
                            key={member.usuario.id}
                            onPress={() =>
                              navigationTo(member.usuario.id, team.id)
                            }
                          >
                            <AccordionItemText>
                              {member.usuario.nome}
                            </AccordionItemText>
                          </TouchableWithoutFeedback>
                        )
                    )}
                  </Box>
                </CollapseBody>
              </Collapse>
            ))}
        </Card>
      ))}
    </Container>
  );
};

export default ChooseActivity;
