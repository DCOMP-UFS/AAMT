import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import { View, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

import api from '../../../services/api';

import {
  Container,
  Card,
  Header,
  PropertyTitle,
  RowContainer,
  CardPair,
  InfoContainer,
  Title,
  MiniText,
  NumberText,
} from './styles';

import {LoadingContainer, LoadingComponent} from '../styles'

const TeamActivityReport = () => {

  const route = useRoute();
  const { equipe_id } = route.params;

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [boletimDiarioEquipe, setBoletimDiarioEquipe] = useState(null)
  const [membrosEquipe, setMembrosEquipe] = useState([])

  const [imoveisPorTipo, setImoveisPorTipo] = useState({
    residencial:[],
    comercial:[],
    terreno_baldio:[],
    ponto_estrategico:[]
  });

  const [imoveisPorStatus, setImoveisPorStatus] = useState({
    trabalhado:[],
    pesquisado:[],
    foco:[],
    tratado:[],
    pendente:[],
    recuperado:[]
  })

  const [amostras, setAmostras] = useState([])
  const [larvicidas, setLarvicidas] = useState([])

  const [tipoDeposito, setTipoDeposito] = useState([
    { label: 'A1', value: 0 },
    { label: 'A2', value: 0 },
    { label: 'B', value: 0 },
    { label: 'C', value: 0 },
    { label: 'D1', value: 0 },
    { label: 'D2', value: 0 },
    { label: 'E', value: 0 },
  ]);

  useEffect(() => {
    async function loadActivity() {
      try {
        setLoading(true)
        
        let url1 = `/equipes/membros/${ equipe_id }`
        let url2 = `/relatorios/equipe/${equipe_id}`;

        const response1 = await api.get(url1);
        const response2 = await api.get(url2);

        //console.log(JSON.stringify(response2.data))

        if(response1.data.length > 0)
          setMembrosEquipe(response1.data)

        if(response2.data.equipe) 
          setBoletimDiarioEquipe(response2.data);

      } catch (err) {
        setLoading(false)
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar o boletim diário da equipe. Verifique se é um problema com conexão de internet. '+ 
          'Não sendo o caso, por favor contate o suporte técnico'
        );
      }
    }

    loadActivity();
  }, []);

  useEffect(() => {
    if (membrosEquipe.length > 0 && boletimDiarioEquipe != null) {

      let membrosContribuicoes = membrosEquipe.map( member =>{
        return {label: member.usuario.nome, id: member.usuario.id, value: 0}
      })
      membrosContribuicoes.push({label: "Total", id: -1, value: 0})

      const imoveisPorTipo = constribuicaoPorTipoImovel(membrosContribuicoes.map( m => {return {...m}}));
      const imoveisPorStatus = constribuicaoPorStatusImovel(membrosContribuicoes.map( m => {return {...m}}));
      const amostras = constribuicaoAmostras(membrosContribuicoes.map( m => {return {...m}}))
      const larvicidas = constribuicaoLarvicidas(membrosContribuicoes.map( m => {return {...m}}))

      let tipoDep = tipoDeposito
      boletimDiarioEquipe.depositosPorTipo.forEach( dep => {
        const index = tipoDep.findIndex( d => d.label == dep.label)
        if( index != -1 )
          tipoDep[index].value = dep.value
      })

      setImoveisPorTipo(imoveisPorTipo)
      setImoveisPorStatus(imoveisPorStatus)
      setAmostras(amostras)
      setLarvicidas(larvicidas)
      setTipoDeposito(tipoDep)

      setLoading(false)
    }
  }, [membrosEquipe, boletimDiarioEquipe]);

  function defineMembersContributions( membrosContribuicoes, membrosBoletim, totalValue ){
    const length = membrosContribuicoes.length

    membrosBoletim.forEach(user => {
      const index = membrosContribuicoes.findIndex( m => m.id == user.usuario.id)
      if(index != -1)
        membrosContribuicoes[index].value = user.valor
    });

    //O ultimo elemento da lista é 'Total', que guardar a contribuição
    //total feita por todos os membros da equipe
    membrosContribuicoes[length-1].value =  totalValue

    return membrosContribuicoes
  }

  function constribuicaoPorTipoImovel(membrosContribuicoes){

    const imovelResidencial = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorTipo.residencial.agentes,
      boletimDiarioEquipe.imoveisPorTipo.residencial.total
    )

    const imovelComercial = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorTipo.comercial.agentes,
      boletimDiarioEquipe.imoveisPorTipo.comercial.total
    )

    const imovelTerrenoBaldio = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorTipo.terreno_baldio.agentes,
      boletimDiarioEquipe.imoveisPorTipo.terreno_baldio.total
    )

    const imovelPontoEstrategico = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorTipo.ponto_estrategico.agentes,
      boletimDiarioEquipe.imoveisPorTipo.ponto_estrategico.total
    )

    const imoveisPorTipo = {
      residencial:imovelResidencial,
      comercial:imovelComercial,
      terreno_baldio:imovelTerrenoBaldio,
      ponto_estrategico:imovelPontoEstrategico
    }

    return imoveisPorTipo
  }

  function constribuicaoPorStatusImovel(membrosContribuicoes){

    const imovelTrabalhados = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.trabalhado.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.trabalhado.total
    )

    const imovelPesquisados = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.pesquisado.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.pesquisado.total
    )

    const imovelFoco = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.foco.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.foco.total
    )

    const imovelTratado = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.tratado.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.tratado.total
    )

    const imovelPendente = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.pendencia.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.pendencia.total
    )

    const imovelRecuperado = defineMembersContributions(
      membrosContribuicoes.map( m => {return {...m}}),
      boletimDiarioEquipe.imoveisPorSituacao.recuperado.agentes,
      boletimDiarioEquipe.imoveisPorSituacao.recuperado.total
    )

    const imoveisPorSituacao = {
      trabalhado:imovelTrabalhados,
      pesquisado:imovelPesquisados,
      foco:imovelFoco,
      tratado:imovelTratado,
      pendente:imovelPendente,
      recuperado:imovelRecuperado
    }

    return imoveisPorSituacao
  }

  function constribuicaoAmostras(membrosContribuicoes){
    const membrosBoletim = boletimDiarioEquipe.amostrasPorAgente
    let total = 0

    membrosBoletim.forEach(user => {
      const index = membrosContribuicoes.findIndex( m => m.id == user.usuario.id)
      if(index != -1){
        total = total + user.value
        membrosContribuicoes[index].value = user.value
      }
    });

    const length = membrosContribuicoes.length
    membrosContribuicoes[length-1].value =  total

    return membrosContribuicoes
  }

  function constribuicaoLarvicidas(membrosContribuicoes){
    const membrosBoletim = boletimDiarioEquipe.larvicidaPorAgente
    let total = 0

    membrosBoletim.forEach(user => {
      const index = membrosContribuicoes.findIndex( m => m.id == user.usuario.id)
      if(index != -1){
        total = total + user.value
        membrosContribuicoes[index].value = user.value
      }
    });

    const length = membrosContribuicoes.length
    membrosContribuicoes[length-1].value =  total

    return membrosContribuicoes
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

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por tipo - Residencial</PropertyTitle>
            </Header>
            {Bar(imoveisPorTipo.residencial)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por tipo - Comercial</PropertyTitle>
            </Header>
            {Bar(imoveisPorTipo.comercial)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por tipo - Terreno Baldio</PropertyTitle>
            </Header>
            {Bar(imoveisPorTipo.terreno_baldio)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por tipo - Ponto Estratégico</PropertyTitle>
            </Header>
            {Bar(imoveisPorTipo.ponto_estrategico)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Trabalhado</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.trabalhado)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Pesquisado</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.pesquisado)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Com Foco</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.foco)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Tratado</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.tratado)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Fechado/Recusado</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.pendente)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status - Recuperado</PropertyTitle>
            </Header>
            {Bar(imoveisPorStatus.recuperado)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Nº de amostras coletadas</PropertyTitle>
            </Header>
            {Bar(amostras)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Larvicida utilizado(g)</PropertyTitle>
            </Header>
            {Bar(larvicidas)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Depósitos inspecionados</PropertyTitle>
            </Header>
            {Bar(tipoDeposito)}
          </Card>
        </Container>
      )}
    </>
  );
};

export default TeamActivityReport;
