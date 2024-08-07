"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { cleanUser } from "@/libs/cleanUser";


export default function RandomUserPage() {
  // annotate type for users state variable

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [isFirst, setIsFirst] = useState(true);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    const CleanedUser = users.map((User:number) => cleanUser(User));
    setUsers(CleanedUser);
    };

    useEffect(() => {
      if (isFirst) {
        setIsFirst(false);
        return;
      }
      const STRAmount = JSON.stringify(genAmount);
      localStorage.setItem("Amount", STRAmount);
    }, [genAmount]);
  
    useEffect(() => {
      const GetStringAmount = localStorage.getItem("Amount");
      if (GetStringAmount === null) {
        setGenAmount(1);
        return;
      }
      const loadAmount = JSON.parse(GetStringAmount);
      setGenAmount(loadAmount);
    }, []);
  
    return (
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        <p className="display-4 text-center fst-italic m-4">Users Generator</p>
        <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
          Number of User(s)
          <input
            className="form-control text-center"
            style={{ maxWidth: "100px" }}
            type="Number"
            onChange={(e) => setGenAmount(Number(e.target.value))}
            value={genAmount}
          />
          <button className="btn btn-dark" onClick={generateBtnOnClick}>
            Generate
          </button>
        </div>
        {isLoading && (
          <p className="display-6 text-center fst-italic my-4">Loading ...</p>
        )}
        {users && !isLoading && users.map((user:any) => (
          <UserCard key={user.email} name={user.name} imgUrl={user.imgUrl} address={user.address} email={user.email}/>
        ))}
      </div>
    );
  }