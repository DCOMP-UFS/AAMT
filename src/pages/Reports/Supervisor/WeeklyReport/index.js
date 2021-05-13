import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../../services/api';

import {
  Container,
  Card,
  Header,
  PropertyTitle,
  TitleContainer,
  Label,
  Small,
  CardRow,
  DetailsColumn,
} from './styles';

const WeeklyReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id, epiWeek } = route.params;

  useEffect(() => {
    async function loadReport() {
      try {
        let url = `/relatorios/semanal?atividade_id=${id}&ano=2021&semana=${epiWeek}`;

        const response = await api.get(url);

        setReport(response.data);
      } catch (err) {
        if (err.response.status === 400) {
          Alert.alert(
            'Ocorreu um erro',
            'Não foi possível carregar o relatório'
          );
        }
      }
      setLoading(false);
    }

    loadReport();
  }, []);

  const colors = [
    '#8FDDE7',
    '#FBE5C8',
    '#B6E5D8',
    '#FFC2C7',
    '#D3B5E5',
    '#E98980',
    '#E9EAEC',
  ];

  function Bar(data) {
    const CUT_OFF = 0;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value.value > CUT_OFF ? x(0) + 10 : x(value.value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
        >
          {value.value}
        </Text>
      ));

    return (
      <View
        style={{ flexDirection: 'row', height: 'auto', paddingVertical: 16 }}
      >
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(_, index) => data[index].label}
          svg={{ fill: 'black' }}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 8, height: 200 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.value}
          svg={{ fill: colors[Math.floor(Math.random() * 6)] }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels />
        </BarChart>
      </View>
    );
  }

  return (
    <>
      <Container>
        {!loading && (
          <>
            <Card>
              <Header>
                <TitleContainer>
                  <Icon size={23} name="calendar-today" color="#3a3c4e" />
                  <PropertyTitle>Semana Epidemiológica</PropertyTitle>
                </TitleContainer>
              </Header>
              <Label>Número</Label>
              <Small>{report.epiWeek.semana}</Small>
              <CardRow>
                <DetailsColumn>
                  <Label>Início da semana</Label>
                  <Small>{report.epiWeek.inicio}</Small>
                </DetailsColumn>
                <DetailsColumn>
                  <Label>Fim da semana</Label>
                  <Small>{report.epiWeek.fim}</Small>
                </DetailsColumn>
              </CardRow>
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Imóveis trabalhados por tipo</PropertyTitle>
              </Header>
              {Bar(report.propertiesByType)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Imóveis trabalhados por status</PropertyTitle>
              </Header>
              {Bar(report.propertiesByStatus)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Imóveis trabalhados por pendência</PropertyTitle>
              </Header>
              {Bar(report.propertiesByPendency)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Depósitos por tipo</PropertyTitle>
              </Header>
              {Bar(report.recipientsByType)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Tipo de tratamento</PropertyTitle>
              </Header>
              {Bar(report.recipientDestination)}
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default WeeklyReport;
