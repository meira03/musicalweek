import { getDictionary } from "@/utils/dictionaries";
import { perfilUsuario } from "@/utils/user";

import ImageFila from "@/components/salas/ImageFila";
import ImageSala from "@/components/salas/ImageSala";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const usuario = await perfilUsuario();
  console.log(usuario)
  return (
    <>
      {usuario.fila.length > 0 && (
        <div className="mt-8">
          <h1 className="text-center text-xl uppercase my-2">
            Procurando Usuários...
          </h1>
          <div className="flex flex-row flex-wrap justify-center mx-10 gap-3 sm:max-w-lg sm:mx-auto">
            {usuario.fila.map((i) => {
              return (
                <ImageFila
                  id_musica={i.id_musica}
                  id_musica_sala={i.id_musicasala}
                  width={"basis-[calc(33%-0.75rem)]"}
                />
              );
            })}
          </div>
        </div>
      )}
      {usuario.salas.length > 0 && (
        <div className="mt-8">
          <h1 className="text-center text-xl uppercase my-2">Salas ativas</h1>
          <div className="flex flex-row flex-wrap justify-center mx-10 gap-3 sm:max-w-lg sm:mx-auto">
            {usuario.salas.map((i) => {
              return (
                <>
                  <ImageSala
                    id_musica={i.id_musica}
                    id_sala={i.id_sala}
                    nome_sala={i.nome_sala}
                    width={"basis-[calc(50%-0.75rem)]"}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
      {usuario.historico.length > 0 && (
        <div className="mt-8">
          <h1 className="text-center text-xl uppercase my-2">Salas Encerradas</h1>
          <div className="flex flex-row flex-wrap justify-center mx-10 gap-3 sm:max-w-lg sm:mx-auto">
            {usuario.historico.salas.map((i) => {
              return (
                <>
                  <ImageSala
                    id_musica={i.id_musica}
                    id_sala={i.id_sala}
                    nome_sala={i.nome}
                    width={"basis-[calc(50%-0.75rem)]"}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
