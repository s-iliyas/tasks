const getAddress = async (lat, lng) => {
  const apiUrl = `http://localhost:8000/address?latitude=${lat}&longitude=${lng}`;
  const address = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.address)
    .catch((error) => {
      console.error("Error:", error.message);
    });
  return address;
};

export default getAddress;
