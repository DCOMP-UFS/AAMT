import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import api from '../../../services/api';

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
  SelectActivityButton,
} from './styles';

const ChooseActivity = () => {
  const [activities, setActivities] = useState([]);

  const userId = useSelector(state => state.user.profile.id);

  const navigation = useNavigation();
  const route = useRoute();
  const { observation } = route.params;

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await api.get(
          `/atividades/abertas/${userId}/usuarios`
        );

        setActivities(response.data);
      } catch (err) {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar a lista de atividades'
        );
      }
    }

    loadActivities();
  }, []);

  function navigationTo(id, equipe_id) {
    if (observation === 'diary-report-agent') {
      return navigation.navigate('Trabalhos diários', {
        id,
      });
    }
    if (observation === 'diary-report-team') {
      return navigation.navigate('Escolher a data', {
        id,
      });
    }
    if (observation === 'weekly-report') {
      return navigation.navigate('Escolha a semana', {
        id,
      });
    }
    if (observation === 'current-activity-report') {
      return navigation.navigate('Boletim geral da atividade', {
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
            <SelectActivityButton onPress={() => navigationTo(activity.id, 0)}>
              Selecionar atividade
            </SelectActivityButton>
          )}

          {observation === 'current-activity-report' && (
            <SelectActivityButton onPress={() => navigationTo(activity.id, 0)}>
              Selecionar atividade
            </SelectActivityButton>
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
                        member.tipo_perfil === 4 && (
                          <TouchableOpacity
                            key={member.usuario.id}
                            onPress={() =>
                              navigationTo(member.usuario.id, team.id)
                            }
                          >
                            <AccordionItemText>
                              {member.usuario.nome}
                            </AccordionItemText>
                          </TouchableOpacity>
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
