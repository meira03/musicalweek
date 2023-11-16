import { getDictionary } from "@/utils/dictionaries";
import { Cadastro } from "@/components/cadastro-provider/cadastro-provider"

export default async function Cadastro({ params: { lang } }) {
  let dict = await getDictionary(lang);
  return<Cadastro dict={dict.cadastro_provider}/>
}
