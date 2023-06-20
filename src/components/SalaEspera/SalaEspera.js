import Image from "next/image";

function msToMinutesSeconds(ms) {
  var totalSeconds = Math.floor(ms / 1000);

  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  var formattedTime =
    ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

  return formattedTime;
}

const SalaEspera = ({ musica }) => {
  return (
    <div className="flex justify-center items-center py-10 relative min-h-[80vh] overflow-hidden w-full">
      <div className="bg-gray-100 dark:bg-zinc-800 p-8 rounded shadow w-4/5 flex flex-col justify-center items-center">
        <h2 className="text-3xl py-10 dark:text-white">
          Aguardando outros usuários...
        </h2>
        <div className="w-64">
          <Image
            src={musica.album.images[0].url}
            alt={musica.name}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full rounded-sm"
            placeholder="blur"
            blurDataURL="/darkmusicalweek.webp"
          />
          <div className="flex justify-between">
            <div>
              <span className="font-semibold dark:text-white truncate text-elipsis block">
                {musica.name}
              </span>
              <span className="font-semibold text-sm dark:text-zinc-300 truncate text-elipsis block">
                {musica.artists[0].name}
              </span>
            </div>
            <span className="font-semibold dark:text-zinc-300 truncate text-elipsis block">
              {msToMinutesSeconds(musica.duration_ms)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaEspera;
