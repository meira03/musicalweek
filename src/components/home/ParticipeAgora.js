"use client";

import { useRouter } from "next/navigation";

const ParticipeAgora = ({dict}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleClick} className="border border-neon-blue-200 bg-neon-blue-200 text-white px-5 py-3 rounded">
        <p className="neon-text uppercase">{dict}</p>
      </button>
    </div>
  );

};

export default ParticipeAgora;
