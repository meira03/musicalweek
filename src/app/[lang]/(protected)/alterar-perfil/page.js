import { AlterarPerfil } from "@/components/alterar-perfil/alterar-perfil"
import { getDictionary } from "@/utils/dictionaries";

export default async function AlterarPerfil({ params: { lang } }) {
  let dict = await getDictionary(lang);

  return<AlterarPerfil dict = {dict.alterar_perfil}/>
}