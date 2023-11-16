import { LoginTela } from "@/components/login/paginaLogin";
import { getDictionary } from "@/utils/dictionaries";

export default async function Login({params: { lang }}) {
  let dict = await getDictionary(lang);

  return<LoginTela dict = {dict.login}/>
}
