const request = (url: string) => (
  fetch(url)
  .then(res => res.json())
);

export const getUsers = () => (
  request("https://reqres.in/api/users?page=2")
    .then(data => data.data)
);

export const getPicture = (page: number) => (
  request(`https://picsum.photos/v2/list?page=${page}&limit=100`)
);
