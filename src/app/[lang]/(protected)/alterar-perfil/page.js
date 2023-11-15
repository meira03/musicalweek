import { perfilUsuario } from "@/utils/user";
import InputField from "@/components/form/Input";
import Button from "@/components/button/button";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: 'ALTERAR DADOS',
}

export default async function AlterarPerfil({ params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.alterar_perfil;

  const res = await perfilUsuario();
  const initialBirthdayValue = res ? formatDateForState(res.data_nasc) : '';

  function formatDateForState(dateString) {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${day}-${month}`;
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div>
        <h1 className="text-neon-blue-200 neon-text text-center text-3xl font-bold uppercase">
          {dict.alterar_perfil}
        </h1>
        <div className="text-red-500 text-center text-sm font-light h-4 my-2">
        </div>
        <form>
          <InputField
            id="completeName"
            type="text"
            name="completeName"
            value={res.nome}
          />
          <InputField
            id="nickname"
            type="text"
            name="nickname"
            value={res.nick}
          />
          <InputField
            id="birthday"
            type="date"
            name="birthday"
            value={initialBirthdayValue}
          />
          <Button></Button>
        </form>
      </div>
    </main >
  );
}