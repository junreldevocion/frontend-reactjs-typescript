import { useEffect, useState } from "react";
import { SquareBox } from "../components/SquareBox";

export default function Test() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
     // @ts-ignore
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
    setUsers(filteredUsers);
  } 

  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  },[search])
  
  return <div className="">
    <input type="text" name="search" onChange={handleChange} />
    <button onClick={handleSearch}>Search</button>
   {users.map((user, index) => {
    console.log(user);
    // @ts-ignore
    return <SquareBox key={index} name={user.name} id={user.id} username={user.username} />
   })}
  </div>;
}