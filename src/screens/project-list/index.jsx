import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "高修文",
    },
    {
      id: 2,
      name: "熊天成",
    },
    {
      id: 3,
      name: "郑华",
    },
    {
      id: 4,
      name: "王文静",
    },
  ]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [param]);
  //   useEffect(() => {
  //     fetch(`${apiUrl}/users`).then(async (res) => {
  //       if (res.ok) {
  //         setUsers(await res.json());
  //       }
  //     });
  //   }, []);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
