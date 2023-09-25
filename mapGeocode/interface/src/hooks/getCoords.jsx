const getCoords = async (address) => {
  const apiUrl = `http://localhost:8000/coords?address=${address}`;
  const coords = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error:", error);
    });
  return coords;
};

export default getCoords;
