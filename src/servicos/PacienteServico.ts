import { Paciente } from "../interfaces/paciente";
import api from "./api";

export async function cadastrarPaciente(paciente: Paciente) {
  if (!paciente) return null;

  try {
    const resultado = await api.post("/paciente", paciente);
    console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
