import { VStack, Divider, ScrollView, useToast } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardConsulta } from '../componentes/CardConsulta'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarConsultasPaciente } from '../servicos/PacienteServico'
import { useIsFocused } from '@react-navigation/native'
import { cancelarConsulta } from '../servicos/ConsultaServico'
import { converterDataParaString } from '../utils/conversoes'

interface Especialista {
  id: string;
  nome: string;
  imagem: string;
  especialidade: string
}
interface Consulta {
  id: string;
  data: string;
  especialista: Especialista
}

export default function Consultas({navigation}: any){
  const [consultasProximas, setConsultasProximas] = useState<Consulta[]>([])
  const [consultasPassadas, setConsultasPassadas] = useState<Consulta[]>([])
  const [recarregar, setRecarregar] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    async function carregarConsultas(){
      const pacienteId = await AsyncStorage.getItem('pacienteId')
      if(!pacienteId) return null
      const consultas: Consulta[] = await pegarConsultasPaciente(pacienteId)

      const agora = new Date();
      const proximas = consultas.filter((consulta) => new Date(consulta.data) > agora)

      const passadas = consultas.filter((consulta) => new Date(consulta.data) <= agora)

      setConsultasProximas(proximas)
      setConsultasPassadas(passadas)
    }
    carregarConsultas()
  }, [isFocused, recarregar])

  async function cancelar(consultaId: string) {
    const resultado = await cancelarConsulta(consultaId);
    if (resultado) {
      toast.show({
        title: 'Consulta cancelada com sucesso',
        backgroundColor: 'green.500',
      });
      setRecarregar(!recarregar);
    } else {
      toast.show({
        title: 'Erro ao cancelar consulta',
        backgroundColor: 'red.500',
      });
    }
  }

  return(
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas consultas</Titulo>
      <Botao mt={5} mb={5} onPress={() => navigation.navigate('Explorar')}>Agendar nova consulta</Botao>

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas consultas</Titulo>
      {consultasProximas?.map((consulta) => (
        <CardConsulta
          key={consulta?.id}
          nome={consulta?.especialista?.nome}
          especialidade={consulta?.especialista?.especialidade}
          foto={consulta?.especialista?.imagem}
          data={converterDataParaString(consulta?.data)}
          foiAgendado
          onPress={() => cancelar(consulta.id)}
        />
      ))}

      {!consultasPassadas && 
      <>
      <Divider mt={5} />
        <Titulo style={{marginBottom: 50}} color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Consultas passadas</Titulo>
      {consultasPassadas?.map((consulta) => (
        <CardConsulta
          key={consulta?.id}
          nome={consulta?.especialista?.nome}
          especialidade={consulta?.especialista?.especialidade}
          foto={consulta?.especialista?.imagem}
          data={consulta?.data}
          foiAtendido
          onPress={() => navigation.navigate('Agendamento', { especialistaId: consulta.especialista.id })}
        />
        
      ))}</>}
    </ScrollView>
  )
}