import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';
import { Table, Row, Rows } from 'react-native-table-component';

import LoadingPage from '../../../components/LoadingPage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import emptyState from '../../../assets/empty-state.png';

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
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
  CardPair,
  InfoContainer,
  Title,
  MiniText,
  NumberText,
  RowContainer,
} from './styles';

const WeeklyReport = () => {
  const chunksLength = 4;
  const [report, setReport] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([
    { label: 'Trabalhados', value: 0 },
    { label: 'Inspecionados', value: 0 },
    { label: 'Com foco', value: 0 },
    { label: 'Tratados', value: 0 },
    { label: 'Fechados', value: 0 },
    { label: 'Recusados', value: 0 },
    { label: 'Recuperados', value: 0 },
  ]);
  const [blocksWorked, setBlocksWorked] = useState([]);
  const [blocksFinished, setBlocksFinished] = useState([]);
  const [blocksWithAegypti, setBlocksWithAegypti] = useState([]);
  const [blocksWithAlbopictus, setBlocksWithAlbopictus] = useState([]);
  const [sampleNumber, setSampleNumber] = useState(0);
  const [larvicide, setLarvicide] = useState(0);
  const [agentNumber, setAgentNumber] = useState(0);
  const [totalRecipients, setTotalRecipients] = useState(0);

  const blocksWorkedOptions = Array(chunksLength).fill('Nº/Seq.');

  const route = useRoute();
  const { id, epidemiologicalWeek, selectedYear } = route.params;

  useEffect(() => {
    async function loadReport() {
      try {
        let url = `/relatorios/semanal?atividade_id=${id}&ano=${selectedYear}&semana=${epidemiologicalWeek}`;

        const response = await api.get(url);

        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      
        if (
          err.response &&
          err.response.data.error ===
          'Este ano não possui 53 semanas epidemiológicas'
        ) {
          setReport(undefined);
        } 
        else {
          setReport(undefined);
          Alert.alert(
            'Ocorreu um erro',
            'Não foi possível carregar o boletim semanal. Verifique se é um problema com conexão de internet. '+ 
            'Não sendo o caso, por favor contate o suporte técnico'
          );
        }
      }
    }

    loadReport();
  }, []);

  function createChunks(originalArray) {
    let result = [];
    if (originalArray.length === 0) {
      result = Array(chunksLength).fill('');
    } else {
      result = new Array(Math.ceil(originalArray.length / chunksLength))
        .fill()
        .map(_ => originalArray.splice(0, chunksLength));

      const tempLength = result.length;
      const lastChunkLength = result[tempLength - 1].length;

      if (lastChunkLength < chunksLength) {
        for (
          let index = 0;
          index <= chunksLength - lastChunkLength - 1;
          index++
        ) {
          result[tempLength - 1].push('');
        }
      }
    }
    return result;
  }

  useEffect(() => {
    if (report?.epiWeek) {
      const trabalhados = report.situacao_quarteirao.trabalhados.map(
        array => array.numero
      );
      const concluidos = report.situacao_quarteirao.concluidos.map(
        array => array.numero
      );
      setBlocksWorked(createChunks(trabalhados));
      setBlocksFinished(createChunks(concluidos));
      setBlocksWithAegypti(
        createChunks(report.quarteiroesPositivos.aedesAegypti)
      );
      setBlocksWithAlbopictus(
        createChunks(report.quarteiroesPositivos.aedesAlbopictus)
      );
      setLarvicide(report.depositTreated[1].value);
      setSampleNumber(report.totalSample);
      setAgentNumber(report.epiWeek.totalAgentes);
      let stts = status;
      stts[0].value = report.propertiesByStatus[2].value;
      stts[1].value = report.properties[0].value;
      stts[2].value = report.properties[2].value;
      stts[3].value = report.properties[1].value;
      stts[4].value = report.propertiesByPendency[0].value;
      stts[5].value = report.propertiesByPendency[1].value;
      stts[6].value = report.propertiesByStatus[1].value;
      setStatus(stts);
      setTotalRecipients(
        report.recipientsByType
          .map(li => li.value)
          .reduce((sum, val) => sum + val, 0)
      );
    }
  }, [report]);

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    HeadStyle: {
      height: 50,
      alignContent: 'center',
      backgroundColor: '#000',
    },
    TableText: {
      margin: 10,
      color: '#000',
      alignSelf: 'center',
      fontFamily: 'Roboto-Regular',
    },
    HeadText: {
      margin: 10,
      color: '#fff',
      fontFamily: 'Roboto-Bold',
      alignSelf: 'center',
    },
    RowsData: {
      backgroundColor: '#f2f2f2',
    },
  });

  const TableComponent = ({ title, headerData, contentData }) => {
    return (
      <Card>
        <Header>
          <PropertyTitle>{title}</PropertyTitle>
        </Header>
        <View>
          <View style={styles.container}>
            <Table>
              <Row
                data={headerData}
                style={styles.HeadStyle}
                textStyle={styles.HeadText}
              />
              <Rows
                data={contentData}
                textStyle={styles.TableText}
                style={styles.RowsData}
              />
            </Table>
          </View>
        </View>
      </Card>
    );
  };

  const EmptyState = () => {
    return (
      <EmptyContainer>
        <Image
          source={emptyState}
          style={{
            resizeMode: 'contain',
            width: 270,
            height: 160,
            marginBottom: 20,
            tintColor: '#999999',
          }}
        />
        <EmptyTitle>Ohh... que pena!</EmptyTitle>
        <EmptyDescription>
          O boletim semanal não está disponível
        </EmptyDescription>
      </EmptyContainer>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Container>
          {report?.epiWeek ? (
            <>
              <Card>
                <Header>
                  <TitleContainer>
                    <Icon size={23} name="calendar-today" color="#3a3c4e" />
                    <PropertyTitle>{`Semana Epidemiológica ${epidemiologicalWeek}`}</PropertyTitle>
                  </TitleContainer>
                </Header>
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
                  <PropertyTitle>Imóveis por status</PropertyTitle>
                </Header>
                {Bar(status)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Depósitos por tipo</PropertyTitle>
                </Header>
                {Bar(report.recipientsByType)}
              </Card>
              <RowContainer>
                <CardPair>
                  <InfoContainer>
                    <Title>Agente(s)</Title>
                    <MiniText>Agente(s)</MiniText>
                  </InfoContainer>
                  <NumberText>{agentNumber}</NumberText>
                </CardPair>
                <CardPair>
                  <InfoContainer>
                    <Title>Depósito(s)</Title>
                    <MiniText>Nº depositos</MiniText>
                  </InfoContainer>
                  <NumberText>{totalRecipients}</NumberText>
                </CardPair>
              </RowContainer>
              <RowContainer>
                <CardPair>
                  <InfoContainer>
                    <Title>Amostra(s)</Title>
                    <MiniText>Nº amostras</MiniText>
                  </InfoContainer>
                  <NumberText>{sampleNumber}</NumberText>
                </CardPair>
                <CardPair>
                  <InfoContainer>
                    <Title>Eliminado(s</Title>
                    <MiniText>Qtd. Depósito(s)</MiniText>
                  </InfoContainer>
                  <NumberText>
                    {report.recipientDestination[0].value}
                  </NumberText>
                </CardPair>
              </RowContainer>
              <RowContainer>
                <CardPair>
                  <InfoContainer>
                    <Title>Tratado(s)</Title>
                    <MiniText>Qtd. Depósito(s)</MiniText>
                  </InfoContainer>
                  <NumberText>
                    {report.recipientDestination[1].value}
                  </NumberText>
                </CardPair>
                <CardPair>
                  <InfoContainer>
                    <Title>Larvicida</Title>
                    <MiniText>Qtd. usada</MiniText>
                  </InfoContainer>
                  <NumberText>{`${larvicide} g`}</NumberText>
                </CardPair>
              </RowContainer>
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
              <TableComponent
                title="Nº/Seq. dos quarteirões trabalhados"
                headerData={blocksWorkedOptions}
                contentData={blocksWorked}
              />
              <TableComponent
                title="Nº/Seq. dos quarteirões concluidos"
                headerData={blocksWorkedOptions}
                contentData={blocksFinished}
              />
              <TableComponent
                title="Nº/Seq. dos quarteirões com Aedes aegypti"
                headerData={blocksWorkedOptions}
                contentData={blocksWithAegypti}
              />
              <TableComponent
                title="Nº/Seq. dos quarteirões com Aedes albopictus"
                headerData={blocksWorkedOptions}
                contentData={blocksWithAlbopictus}
              />
            </>
          ) : (<EmptyState />)}
          {/*report.length === 0 && <EmptyState />*/}
        </Container>
      )}
    </>
  );
};

export default WeeklyReport;
