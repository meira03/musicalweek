import { getDictionary } from "@/utils/dictionaries";
import { Cadastro } from "@/components/cadastro/cadastro"

export default async function Cadastro({ params: { lang } }) {
  let dict = await getDictionary(lang);
  
    return<Cadastro dict = {dict.alterar_perfil}/>
}