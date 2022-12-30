import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

import {LoadingContainer, LoadingComponent} from '../styles'

const ChooseActivity = ({ regionalSaude }) => {
  const [activities, setActivities] = useState([]);
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.profile.id);

  const navigation = useNavigation();
  const route = useRoute();
  const { observation } = route.params;

  useEffect(() => {
    async function getCycle() {
      try {
        setLoading(true)
        const response = await api.get(
          `/ciclos/open/${regionalSaude}/regionaisSaude`
        );

        if (response.data) {
          setCycle(response.data.id);
        }
        else
          setLoading(false)
      } catch (err) {
        setLoading(false)
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível determinar o ciclo atual'
        );
      }
    }
    getCycle();
  }, []);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await api.get(
          `/atividades/supervisor/${userId}/responsavel/${cycle}/ciclos`
        );
        
        setActivities(response.data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar a lista de atividades'
        );
      }
    }
    if (cycle) {
      loadActivities();
    }
  }, [cycle]);

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
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          {activities.map(activity => (
            <Card key={activity.id}>
              <Header>
                <Icon size={23} name="assignment" color="#3a3c4e" />
                <Title>{activity.metodologia.sigla}</Title>
              </Header>
              <Label>Código da atividade</Label>
              <Smaller>{activity.id}</Smaller>
              <Label>Objetivo</Label>
              <Smaller>{activity.objetivo.descricao}</Smaller>
              {/* <Label>Data de início</Label>
              <Smaller>
                {format(parseISO(activity.createdAt), 'dd/MM/yyyy')}
              </Smaller> */}

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
                        <AccordionTitle>{`Equipe ${
                          team.apelido ? team.apelido : ''
                        }`}</AccordionTitle>
                      </AccordionHeader>
                    </CollapseHeader>
                    <CollapseBody>
                      <Box>
                        {team.membros.map(
                          member =>
                            member.tipoPerfil === 4 && (
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
      )}
    </>
  );
};

const mapStateToProps = state => ({
  regionalSaude: state.user.profile.municipio.regional.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseActivity);
