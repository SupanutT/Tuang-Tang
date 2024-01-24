export default async function getToken(){
    try {
        const response = await fetch('/api/gettoken',{
          method: 'GET'
        });
        const data = await response.json();
        return data.token
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }
}
