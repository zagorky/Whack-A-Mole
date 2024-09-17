const url = `https://api.unsplash.com/photos/random?query=${searchingFor}&client_id=`;

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
getData();
