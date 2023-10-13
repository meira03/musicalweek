"use server";

export const deleteAccount = async (token) => {
    try {
      const response = await fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
      });
  
      if (response.ok) {
        console.log('Conta deletada com sucesso');
      } else {
        console.error('Erro ao deletar a conta');
      }
    } catch (error) {
      console.error('Erro ao deletar a conta', error);
    }
  };