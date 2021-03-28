import React, { useEffect, useCallback, useState } from 'react';
import { View, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

import api from '../../../services/api';

import { Container, Card, Header, PropertyTitle } from './styles';

const AcitivitySummary = () => {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [propertiesType, setPropertiesType] = useState([
    { label: 'Residencial', value: 0 },
    { label: 'Terreno Baldio', value: 0 },
    { label: 'Comercial', value: 0 },
    { label: 'Ponto Estratégico', value: 0 },
    { label: 'Outros', value: 0 },
  ]);
  const [recipientType, setRecipientType] = useState([
    { label: 'A1', value: 0 },
    { label: 'A2', value: 0 },
    { label: 'B', value: 0 },
    { label: 'C', value: 0 },
    { label: 'D1', value: 0 },
    { label: 'D2', value: 0 },
    { label: 'E', value: 0 },
  ]);
  const [pendency, setPendency] = useState([
    { label: 'Fechado', value: 0 },
    { label: 'Recusado', value: 0 },
  ]);
  const [status, setStatus] = useState([
    { label: 'Normal', value: 0 },
    { label: 'Recuperado', value: 0 },
  ]);
  const [destination, setDestination] = useState([
    { label: 'Eliminado', value: 0 },
    { label: 'Tratado', value: 0 },
  ]);
  const [treatment, setTreatment] = useState([
    { label: 'Focal', value: 0 },
    { label: 'Perifocal', value: 0 },
  ]);
  const [sampleNumber, setSampleNumber] = useState(0);

  function filter() {
    let pendencia = pendency;
    let statusVistoria = status;
    let tipoImovel = propertiesType;
    let tipoDeposito = recipientType;
    let destinoDeposito = destination;
    let tratamento = treatment;
    let amostras = sampleNumber;

    activity.map(inspection => {
      switch (inspection.imovel.tipoImovel) {
        case '1':
          tipoImovel[0].value++;
          break;
        case '2':
          tipoImovel[1].value++;
          break;
        case '3':
          tipoImovel[2].value++;
          break;
        case '4':
          tipoImovel[3].value++;
          break;
        default:
          tipoImovel[4].value++;
          break;
      }
      switch (inspection.pendencia) {
        case 'F':
          pendencia[0].value++;
          break;
        case 'R':
          pendencia[1].value++;
          break;
        default:
          break;
      }
      switch (inspection.situacaoVistoria) {
        case 'N':
          statusVistoria[0].value++;
          break;
        case 'R':
          statusVistoria[1].value++;
          break;
        default:
          break;
      }
      if (inspection.depositos.length > 0) {
        inspection.depositos.map(deposito => {
          switch (deposito.tipoRecipiente) {
            case 'A1':
              tipoDeposito[0].value++;
              break;
            case 'A2':
              tipoDeposito[1].value++;
              break;
            case 'B':
              tipoDeposito[2].value++;
              break;
            case 'C':
              tipoDeposito[3].value++;
              break;
            case 'D1':
              tipoDeposito[4].value++;
              break;
            case 'D2':
              tipoDeposito[5].value++;
              break;
            case 'E':
              tipoDeposito[6].value++;
              break;
            default:
              break;
          }
          switch (deposito.fl_tratado) {
            case true:
              destinoDeposito[0].value++;
              break;
            default:
              break;
          }
          switch (deposito.fl_eliminado) {
            case true:
              destinoDeposito[1].value++;
              break;
            default:
              break;
          }
          if (deposito.tratamentos.length > 0) {
            deposito.tratamentos.map(tipoTratamento => {
              switch (tipoTratamento.tecnica) {
                case 1:
                  tratamento[0].value++;
                  break;
                case 2:
                  tratamento[1].value++;
                  break;
                default:
                  break;
              }
            });
          }
          if (deposito.amostras.length > 0) {
            amostras = amostras + deposito.amostras.length;
          }
        });
      }
    });

    setPropertiesType(tipoImovel);
    setRecipientType(tipoDeposito);
    setPendency(pendencia);
    setStatus(statusVistoria);
    setDestination(destinoDeposito);
    setTreatment(tratamento);
    setSampleNumber(amostras);
  }

  const route = useRoute();
  const { id } = route.params;

  const loadActivity = useCallback(async () => {
    try {
      const response = await api.get(`/trabalhoDiario/${id}`);

      if (!!response.data.status) {
        setActivity(response.data.data.vistorias);
      }
    } catch (err) {
      if (err.response.status === 400) {
        Alert.alert('Ocorreu um erro', 'Não foi possível carregar o relatório');
      }
    }
  }, []);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  useEffect(() => {
    filter();
  }, [activity]);

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
          <PropertyTitle>Imóveis trabalhados por tipo</PropertyTitle>
        </Header>
        {Bar(propertiesType)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Imóveis trabalhados por status</PropertyTitle>
        </Header>
        {Bar(status)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Imóveis trabalhados por pendencia</PropertyTitle>
        </Header>
        {Bar(pendency)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Depósitos inspecionados por tipo</PropertyTitle>
        </Header>
        {Bar(recipientType)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Destino dos depósitos</PropertyTitle>
        </Header>
        {Bar(destination)}
      </Card>
      <Card>
        <Header>
          <PropertyTitle>Tipo de tratamento</PropertyTitle>
        </Header>
        {Bar(treatment)}
      </Card>
    </Container>
  );
};

export default AcitivitySummary;
