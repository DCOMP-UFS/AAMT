import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';
import { Table, Row, Rows } from 'react-native-table-component';

import LoadingPage from '../../../components/LoadingPage';
import Dropdown from '../../../components/Dropdown';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import emptyState from '../../../assets/empty-state.png';

import {
  Container,
  Card,
  Header,
  PropertyTitle,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
  CardPair,
  InfoContainer,
  Title,
  MiniText,
  NumberText,
  RowContainer,
  SectionContainer,
  Small,
} from './styles';

const ActivityGeneralReport = () => {
  const chunksLength = 4;
  const [report, setReport] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([
    { label: 'Trabalhados', value: 0 },
    { label: 'Pesquisados', value: 0 },
    { label: 'Com foco', value: 0 },
    { label: 'Tratados', value: 0 },
    { label: 'Fechados', value: 0 },
    { label: 'Recusados', value: 0 },
    { label: 'Recuperados', value: 0 },
  ]);
  const [totalBlocksWorked, setTotalBlocksWorked] = useState([]);
  const [totalBlocksFinished, setTotalBlocksFinished] = useState([]);
  const [totalBlocksFinishedWithPendency, setTotalBlocksFinishedWithPendency ] = useState([]);
  const [totalBlocksWithAegypti, setTotalBlocksWithAegypti] = useState([]);
  const [totalBlocksWithAlbopictus, setTotalBlocksWithAlbopictus] = useState([]);

  const [blocksWorked, setBlocksWorked] = useState([]);
  const [blocksFinished, setBlocksFinished] = useState([]);
  const [blocksFinishedWithPendency, setBlocksFinishedWithPendency ] = useState([]);
  const [blocksWithAegypti, setBlocksWithAegypti] = useState([]);
  const [blocksWithAlbopictus, setBlocksWithAlbopictus] = useState([]);

  const [sampleNumber, setSampleNumber] = useState(0);
  const [larvicide, setLarvicide] = useState(0);
  const [totalRecipients, setTotalRecipients] = useState(0);

  const [ optionsLocalidade, setOptionsLocalidade ] = useState( [] )
  const [ localidade, setLocalidade ] = useState( undefined )
  const [ isFilterQuarteiroes, setIsFilterQuarteiroes ] = useState(false)

  const blocksWorkedOptions = Array(chunksLength).fill('Nº/Seq.');

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await api.get(`/relatorios/atividade/${id}`);
        setReport(response.data);
        setLoading(false);

      } catch (err) {
        setReport(undefined);
        setLoading(false);
        
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar o boletim geral. Verifique se é um problema com conexão de internet. '+ 
          'Não sendo o caso, por favor contate o suporte técnico'
        );
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

  function mapQuarteiraoList ( quarteiroes ){
    const quarteiroesMapped = quarteiroes.map( q => {
      if(q.sequencia == null)
        return q.numero
      else
        return q.numero+" / "+q.sequencia
    })
    
    return quarteiroesMapped
  }

  //Adiconar localidades não repetidas na lista localidades
  function addLocalidadesUnicas( listaLocalidades, listaQuarteiroes ){

    listaQuarteiroes.forEach( q => {
      let localidadeRepetida = false

      for( const loc of listaLocalidades ) {
        if( loc.id == q.localidade_id ){
          localidadeRepetida = true
          break;
        }
      }
      if(!localidadeRepetida)
        listaLocalidades.push({ id: q.localidade_id, name: q.localidade_nome })
    });

    return listaLocalidades
  }

  useEffect(() => {
    if (report?.situacao_quarteirao) {

      const qrt_trabalhados = report.situacao_quarteirao.trabalhados;
      const qrt_concluidos = report.situacao_quarteirao.concluidos;
      const qrt_concluidosPendencia = report.situacao_quarteirao.concluidosPendencia;
      const qrt_pstv_aegypti = report.quarteiroesPositivos.aedesAegypti;
      const qrt_pstv_albopictus = report.quarteiroesPositivos.aedesAlbopictus;

      setTotalBlocksWorked(qrt_trabalhados);
      setTotalBlocksFinished(qrt_concluidos);
      setTotalBlocksFinishedWithPendency(qrt_concluidosPendencia)
      setTotalBlocksWithAegypti(qrt_pstv_aegypti);
      setTotalBlocksWithAlbopictus(qrt_pstv_albopictus);

      let listaLocalidades = []
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_trabalhados)
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_concluidos)
      listaLocalidades = addLocalidadesUnicas(listaLocalidades, qrt_concluidosPendencia)

      setOptionsLocalidade(listaLocalidades)

      const trabalhados = mapQuarteiraoList(qrt_trabalhados)
      const concluidos = mapQuarteiraoList(qrt_concluidos)
      const concluidosComPendencia = mapQuarteiraoList(qrt_concluidosPendencia)
      const comAegypti = mapQuarteiraoList(qrt_pstv_aegypti)
      const comAlbopictus = mapQuarteiraoList(qrt_pstv_aegypti)

      setBlocksWorked(createChunks(trabalhados));
      setBlocksFinished(createChunks(concluidos));
      setBlocksFinishedWithPendency(concluidosComPendencia)
      setBlocksWithAegypti(createChunks(comAegypti));
      setBlocksWithAlbopictus(createChunks(comAlbopictus));

      setLarvicide(report.depositTreated[1].value);
      setSampleNumber(report.totalSample);
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

  useEffect(() => {
    if(localidade != undefined){
      
      const newQuarteiroesTrabalhados = totalBlocksWorked.filter( q => q.localidade_id == localidade)
      const newQuarteiroesConcluidos = totalBlocksFinished.filter( q => q.localidade_id == localidade)
      const newQuarteiroesConcluidosPendencia = totalBlocksFinishedWithPendency.filter( q => q.localidade_id == localidade)
      const newQuarteiroesAedesAegypti = totalBlocksWithAegypti.filter( q => q.localidade_id == localidade)
      const newQuarteiroesAedesAlbopictus = totalBlocksWithAlbopictus.filter( q => q.localidade_id == localidade)

      const trabalhados = mapQuarteiraoList(newQuarteiroesTrabalhados)
      const concluidos = mapQuarteiraoList(newQuarteiroesConcluidos)
      const concluidosComPendencia = mapQuarteiraoList(newQuarteiroesConcluidosPendencia)
      const comAegypti = mapQuarteiraoList(newQuarteiroesAedesAegypti)
      const comAlbopictus = mapQuarteiraoList(newQuarteiroesAedesAlbopictus)
      
      setBlocksWorked(createChunks(trabalhados));
      setBlocksFinished(createChunks(concluidos));
      setBlocksFinishedWithPendency(concluidosComPendencia)
      setBlocksWithAegypti(createChunks(comAegypti));
      setBlocksWithAlbopictus(createChunks(comAlbopictus));
    }
    else{
      const trabalhados = mapQuarteiraoList(totalBlocksWorked)
      const concluidos = mapQuarteiraoList(totalBlocksFinished)
      const concluidosComPendencia = mapQuarteiraoList(totalBlocksFinishedWithPendency)
      const comAegypti = mapQuarteiraoList(totalBlocksWithAegypti)
      const comAlbopictus = mapQuarteiraoList(totalBlocksWithAlbopictus)

      setBlocksWorked(createChunks(trabalhados));
      setBlocksFinished(createChunks(concluidos));
      setBlocksFinishedWithPendency(concluidosComPendencia)
      setBlocksWithAegypti(createChunks(comAegypti));
      setBlocksWithAlbopictus(createChunks(comAlbopictus));
    }

    setIsFilterQuarteiroes(false)
  }, [localidade]);

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
        <SectionContainer>
          <Small>Localidade</Small>
          <Dropdown
            itens={optionsLocalidade}
            placeholder="Todas"
            selectedValue={localidade}
            onValueChange={value => {
              if(localidade != value){
                setIsFilterQuarteiroes(true)
                setLocalidade(value)
              }
            }}
          />
        </SectionContainer>
        <View>
          {
            isFilterQuarteiroes ? (
              <LoadingPage />
            ) : (
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
            )
          }
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
          O boletim geral da atividade não está disponível
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
          {report?.situacao_quarteirao ? (
            <>
              <Card>
                <Header>
                  <PropertyTitle>Nº imóveis trabalhados por tipo</PropertyTitle>
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
                    <Title>Depósito(s)</Title>
                    <MiniText>Nº depositos</MiniText>
                  </InfoContainer>
                  <NumberText>{totalRecipients}</NumberText>
                </CardPair>
                <CardPair>
                  <InfoContainer>
                    <Title>Amostra(s)</Title>
                    <MiniText>Nº amostras</MiniText>
                  </InfoContainer>
                  <NumberText>{sampleNumber}</NumberText>
                </CardPair>
              </RowContainer>
              <RowContainer>
                <CardPair>
                  <InfoContainer>
                    <Title>Eliminado(s</Title>
                    <MiniText>Qtd. Depósito(s)</MiniText>
                  </InfoContainer>
                  <NumberText>
                    {report.recipientDestination[0].value}
                  </NumberText>
                </CardPair>
                <CardPair>
                  <InfoContainer>
                    <Title>Tratado(s)</Title>
                    <MiniText>Qtd. Depósito(s)</MiniText>
                  </InfoContainer>
                  <NumberText>
                    {report.recipientDestination[1].value}
                  </NumberText>
                </CardPair>
              </RowContainer>
              <RowContainer>
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
                  <PropertyTitle>Nº de espécimes por depósito - Tipo A1</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[0].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo A2</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[1].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo B</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[2].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo C</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[3].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo D1</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[4].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo D2</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[4].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por depósito - Tipo E</PropertyTitle>
                </Header>
                {Bar(report.sampleByDeposit[4].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>
                    Nº de espécimes por tipo de imóvel - Residência
                  </PropertyTitle>
                </Header>
                {Bar(report.sampleByProperty[0].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>
                    Nº de espécimes por tipo de imóvel - Comércio
                  </PropertyTitle>
                </Header>
                {Bar(report.sampleByProperty[1].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>
                    Nº de espécimes por tipo de imóvel - Terreno Baldio
                  </PropertyTitle>
                </Header>
                {Bar(report.sampleByProperty[2].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>
                    Nº de espécimes por tipo de imóvel - Ponto Estratégico
                  </PropertyTitle>
                </Header>
                {Bar(report.sampleByProperty[3].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por estágio - Pupa</PropertyTitle>
                </Header>
                {Bar(report.sampleExemplary[0].value)}
              </Card>
              <Card>
                <Header>
                  <PropertyTitle>Nº de espécimes por estágio - Larvas</PropertyTitle>
                </Header>
                {Bar(report.sampleExemplary[1].value)}
              </Card>
              <TableComponent
                title="Nº/Seq. dos quarteirões para serem trabalhados"
                headerData={blocksWorkedOptions}
                contentData={blocksWorked}
              />
              <TableComponent
                title="Nº/Seq. dos quarteirões concluidos"
                headerData={blocksWorkedOptions}
                contentData={blocksFinished}
              />
              <TableComponent
                title="Nº/Seq. dos quarteirões concluidos com pendência"
                headerData={blocksWorkedOptions}
                contentData={blocksFinishedWithPendency}
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

export default ActivityGeneralReport;
