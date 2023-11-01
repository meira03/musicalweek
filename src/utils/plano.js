"use server";

export const updatePlano = async (token, planoIndex) => {
    try {
      const data = { "plano": planoIndex };
      console.log(data);
      console.log(token);
      const response = await fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Plano atualizado com sucesso');
        return true; // Indica sucesso
      } else {
        console.error('Erro ao atualizar o plano');
        return false; // Indica erro
      }
    } catch (error) {
      console.error('Erro ao atualizar o plano', error);
      return false; // Indica erro
    }
  };