async function callApi(id) {
  const res = await fetch(
    "http://localhost:8082/api/v1/identity/users/registration",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "string2",
        email: `phuc${id}@gmail.com`,
        password: "stringstring",
        confirmPassword: "stringstring",
        city: "stringstringstringstringstringst",
        address: "string",
        role: "TENANT",
      }),
    }
  );
  console.log(res.json());
}
let id = 1;

// Gọi API mỗi 0.05 giây
setInterval(async () => {
  await callApi(id);
  id++;
  console.log(id);
}, 50);
