import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

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

const CurrentActivityReport = () => {
  const route = useRoute();
  const { id } = route.params;

  const [relatorio, setRelatorio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await api.get(`/relatorios/atividade/${id}`);

        createReport(response.data);
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

  function createReport(data) {
    if (data === []) {
      return;
    }

    const situacao_quarteiroes = [
      {
        label: 'Aberto',
        value: data.situacao_quarteiroes ? data.situacao_quarteiroes.aberto : 0,
      },
      {
        label: 'Fazendo',
        value: data.situacao_quarteiroes
          ? data.situacao_quarteiroes.fazendo
          : 0,
      },
      {
        label: 'Concluído',
        value: data.situacao_quarteiroes
          ? data.situacao_quarteiroes.concluido
          : 0,
      },
    ];
    const imoveisPendentes = [
      {
        label: 'Fechados',
        value: data.pendencia ? data.pendencia.imoveisFechados : 0,
      },
      {
        label: 'Recusados',
        value: data.pendencia ? data.pendencia.imoveisRecusados : 0,
      },
    ];
    const amostrasStatus = [
      {
        label: 'Coletadas',
        value: data.amostras ? data.amostras.coletadas : 0,
      },
      {
        label: 'Pendentes',
        value: data.amostras ? data.amostras.pendentes : 0,
      },
    ];
    const amostrasExaminadas = [
      {
        label: 'Positivas',
        value: data.amostras ? data.amostras.positivas : 0,
      },
      {
        label: 'Negativas',
        value: data.amostras ? data.amostras.negativas : 0,
      },
    ];
    const imoveisSituacao = [
      {
        label: 'Positivos',
        value: data.amostras ? data.imoveisPositivos : 0,
      },
      {
        label: 'Negativos',
        value: data.amostras ? data.imoveisNegativos : 0,
      },
    ];
    console.log(situacao_quarteiroes);
    setRelatorio({
      situacao_quarteiroes,
      imoveisPendentes,
      amostrasStatus,
      amostrasExaminadas,
      imoveisSituacao,
    });
  }

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
    <Container>
      {!loading && (
        <>
          <Card>
            <Header>
              <PropertyTitle>Situação dos quarteirões</PropertyTitle>
            </Header>
            {Bar(relatorio.situacao_quarteiroes)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por pendência</PropertyTitle>
            </Header>
            {Bar(relatorio.imoveisPendentes)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Situação dos imóveis</PropertyTitle>
            </Header>
            {Bar(relatorio.imoveisSituacao)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Status das amostras</PropertyTitle>
            </Header>
            {Bar(relatorio.amostrasStatus)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Situação das amostras coletadas</PropertyTitle>
            </Header>
            {Bar(relatorio.amostrasExaminadas)}
          </Card>
        </>
      )}
    </Container>
  );
};

export default CurrentActivityReport;
