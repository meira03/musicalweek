import { RecuperaSenha } from "@/components/esqueci-senha-token/esqueci-senha-token";
import { getDictionary } from "@/utils/dictionaries";

export default async function RecuperaSenha({ params, params: { lang } }) {
  let dict = await getDictionary(lang);
  return< RecuperaSenha dict={dict = dict.esqueci_senha_token}/>
}
