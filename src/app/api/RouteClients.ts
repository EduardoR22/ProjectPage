import axios from "axios";

export async function getClients() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clients`;

  try {
    const res = await axios.get(url);
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un error al consultar clientes!!';
  }
}

export async function getTestimonios() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews`;

  try {
    const res = await axios.get(url);
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    return 'Ocurrio un error al consultar testimonios!!';
  }
}