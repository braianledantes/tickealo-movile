import api from "./axiosConfig";

//Consulta un país específico por su código ISO
export const getCountryByIso = async (iso: string) => {
  const res = await api.get(`/countries/${iso}`);
  return res.data;
};

//Devuelve la lista de todos los países disponibles en el SOAP
export const getCountries = async () => {
  const res = await api.get(`/countries`);
  return res.data;
};
