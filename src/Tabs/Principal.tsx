import { VStack, Image, Box, ScrollView, Text, Divider } from "native-base";
import Logo from '../assets/Logo.png';
import { Botao } from "../componentes/Botao";
import { EntradaTexto } from "../componentes/EntradaTexto";
import { Titulo } from "../componentes/Titulo";
import { depoimentos } from "../utils/mock";
import { View } from "react-native";


export default function Principal(){

  return (
    <ScrollView flex={1} bgColor="white">
      
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Logo} style={{  width: 60, height: 60, marginTop: 20}} resizeMode='contain' />
        <Titulo style={{marginTop: 10}} color="blue.500">Boas-vindas!</Titulo>
      </View>
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>

        <Box style={{marginTop: 20}} w="100%" borderRadius="lg" p={3} mt={10} shadow="1" borderRightRadius="md">
          <EntradaTexto
            placeholder="Digite a especialidade"
          />
          <EntradaTexto
            placeholder="Digite sua localização"
          />
          <Botao mt={3} mb={3}>
            Buscar
          </Botao>
        </Box>

        <Titulo color="blue.800" alignSelf="center">Depoimentos</Titulo>
        <VStack space={3} divider={<Divider />} w="100%">
          {
            depoimentos.map(depoimento => (
              <Box key={depoimento.id} w="100%" borderRadius="lg" p={3}>
                <Text color="gray.300" fontSize="md" textAlign="justify">
                  {depoimento.text}
                </Text>
                <Text color="gray.500" fontSize="lg" fontWeight="bold" alignSelf="center" mt="2">{depoimento.titulo}</Text>
              </Box>
            ))
          }
        </VStack>
      </VStack>
    </ScrollView>
  );
}