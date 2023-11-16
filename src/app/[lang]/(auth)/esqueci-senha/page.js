import { getDictionary } from "@/utils/dictionaries";
import { EsqueciSenha } from "@/components/esqueci-senha/esqueci-senha"

export default async function EsqueciSenha({ params: { lang } }) {
  let dict = await getDictionary(lang);

  return< EsqueciSenha dict = {dict.esqueci_senha}/>
}

