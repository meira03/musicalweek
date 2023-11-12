import { perfilUsuario } from "@/utils/user";
import InputField from "@/components/form/Input";
import Button from "@/components/button/button"

export const metadata = {
  title: 'Alterar Dados',
}

export default async function AlterarPerfil() {

  const res = await perfilUsuario();
  console.log(res)

  const initialBirthdayValue = res ? formatDateForState(res.data_nasc) : '';

  function formatDateForState(dateString) {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${day}-${month}`;
  }

  return (
    <main className="mx-auto sm:max-w-7xl px-2 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
      <div className="bg-black-100 dark:bg-black-300 max-w-md p-4 sm:p-8 rounded shadow w-full sm:w-4/5 lg:w-1/2">
        <h1 className="text-white dark:text-white text-center text-3xl font-bold uppercase">
          ALTERAR PERFIL
        </h1>
        <div className="text-red-500 text-center text-sm font-light h-4 my-2">
        </div>
        <form>
          <InputField
            id="completeName"
            type="text"
            name="completeName"
            value={res.nome}
            className="border rounded bg-white py-2 px-4 w-full"
          />
          <InputField
            id="nickname"
            type="text"
            name="nickname"
            value={res.nick}
            className="border rounded bg-white py-2 px-4 w-full"
          />
          <InputField
            id="birthday"
            type="date"
            name="birthday"
            value={initialBirthdayValue}
            className="border rounded bg-white py-2 px-4 w-full"
          />
          <Button></Button>
        </form>
      </div>
    </main >
  );
}