import { getDictionary } from "@/utils/dictionaries";
import { AlteraSenha } from "@/components/alterar-senha/alterar-senha"

export default async function RetornoAlteraSenha({ params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.pagina_alterar_senha;

  return<AlteraSenha dict = {dict.alterar_senha}/>
}
