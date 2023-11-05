export const Pontuacao = ({ pontuacao }) => {
  return <span style={{
    textShadow: `
    hsla(173, 33%, 84%, 0.92) 0px 0px 6px, 
    hsla(173, 33%, 84%, 0.34) 0px 0px 30px, 
    hsla(${pontuacao * 1.8}, 100%, 54.7%, 0.92) 0px 0px 12px, 
    hsla(${pontuacao * 1.8}, 100%, 54.7%, 0.92) 0px 0px 21px, 
    hsla(${pontuacao * 1.8}, 100%, 54.7%, 0.92) 0px 0px 34px
    `
  }}>{pontuacao}</span>
};
