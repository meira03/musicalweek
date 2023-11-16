import { getDictionary } from "@/utils/dictionaries";
import { AlteraSenha } from "@/components/alterar-senha/alterar-senha"

export default async function AlteraSenha({ params: { lang } }) {
  let dict = await getDictionary(lang);

  return<AlteraSenha dict = {dict.alterar_senha}/>
}
