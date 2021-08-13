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

  function Bar(data) {
    const CUT_OFF = 0;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value.value > CUT_OFF ? x(0) + 10 : x(value.value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
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
          svg={{ fill: '#0095DA' }}
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
            <Card>
              <Header>
                <PropertyTitle>Situação por imóvel</PropertyTitle>
              </Header>
              {Bar(report.properties)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo A1</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[0].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo A2</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[1].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo B</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[2].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo C</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[3].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo D1</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[4].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo D2</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[4].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por depósito - Tipo E</PropertyTitle>
              </Header>
              {Bar(report.sampleByDeposit[4].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>
                  Amostras por tipo de imóvel - Residência
                </PropertyTitle>
              </Header>
              {Bar(report.sampleByProperty[0].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>
                  Amostras por tipo de imóvel - Comércio
                </PropertyTitle>
              </Header>
              {Bar(report.sampleByProperty[1].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>
                  Amostras por tipo de imóvel - Terreno Baldio
                </PropertyTitle>
              </Header>
              {Bar(report.sampleByProperty[2].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>
                  Amostras por tipo de imóvel - Ponto Estratégico
                </PropertyTitle>
              </Header>
              {Bar(report.sampleByProperty[3].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por exemplar - Ovo</PropertyTitle>
              </Header>
              {Bar(report.sampleExemplary[0].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por exemplar - Pupa</PropertyTitle>
              </Header>
              {Bar(report.sampleExemplary[1].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>
                  Amostras por exemplar - Exúvia de Pupa
                </PropertyTitle>
              </Header>
              {Bar(report.sampleExemplary[2].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por exemplar - Larva</PropertyTitle>
              </Header>
              {Bar(report.sampleExemplary[3].value)}
            </Card>
            <Card>
              <Header>
                <PropertyTitle>Amostras por exemplar - Adulto</PropertyTitle>
              </Header>
              {Bar(report.sampleExemplary[4].value)}
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default WeeklyReport;
