import React from 'react';
import { View } from 'react-native';

import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Card,
  Header,
  PropertyTitle,
  AgentContainer,
  AgentName,
  AgentNumbers,
  AgentNameContainer,
} from './styles';

const ActivityDiaryTeam = () => {
  const data = {
    amostras: {
      total: 3,
      coletadas: 3,
      pendentes: 0,
      examinadas: 0,
    },
    imoveis: {
      totalVistoriado: 1,
      naoVistoriados: 15,
      fechados: 0,
      recusados: 1,
      vistoriaNormal: 1,
      vistoriaRecuperada: 0,
    },
    vistoriasPorAgentes: [
      {
        usuario: {
          id: 4,
          nome: 'Duarte Antunes',
        },
        imoveisVistoriados: 1,
      },
      {
        usuario: {
          id: 10,
          nome: 'Roseli La Corte',
        },
        imoveisVistoriados: 0,
      },
    ],
  };

  const amostras = [
    { label: 'Total', value: 3 },
    { label: 'Coletadas', value: 3 },
    { label: 'Pendentes', value: 0 },
    { label: 'Examinadas', value: 0 },
  ];

  const pendencia = [
    { label: 'Fechado', value: 0 },
    { label: 'Recusado', value: 1 },
  ];

  const statusVistoria = [
    { label: 'Normal', value: 1 },
    { label: 'Recuperada', value: 0 },
  ];

  const imoveisVistoriados = [
    { label: 'Vistoriados', value: 1 },
    { label: 'Não vistoriados', value: 15 },
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
    <Container>
      <Card>
        <Header>
          <PropertyTitle>Imóveis vistoriados e não vistoriados</PropertyTitle>
        </Header>
        {Bar(imoveisVistoriados)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Pendências nos imóveis</PropertyTitle>
        </Header>
        {Bar(pendencia)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Status das vistorias</PropertyTitle>
        </Header>
        {Bar(statusVistoria)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Situação das amostras</PropertyTitle>
        </Header>
        {Bar(amostras)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Imóveis vistoriados por agente</PropertyTitle>
        </Header>
        {data.vistoriasPorAgentes.map(agente => (
          <AgentContainer key={agente.usuario.id}>
            <AgentNameContainer>
              <Icon size={23} name="person" color="#FFF" />
              <AgentName>{agente.usuario.nome}</AgentName>
            </AgentNameContainer>
            <AgentNumbers>{`${agente.imoveisVistoriados} imóveis`}</AgentNumbers>
          </AgentContainer>
        ))}
      </Card>
    </Container>
  );
};

export default ActivityDiaryTeam;
