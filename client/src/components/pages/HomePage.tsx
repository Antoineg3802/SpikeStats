import { useEffect, useState } from "react";

import { css } from "@emotion/css";

import { User } from "../../data/User";
import { fetchUsers } from "../../service/api/userService";
import Navbar from "../organisms/Navbar";
import HomepageContent from "../organisms/HomepageContent";

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers()
        .then((data) => {
            setUsers(data)
        })
    }, []);

    return (
        <div className={style}>
            <Navbar />
            <HomepageContent>
                <h2>HomePage</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.mail}</li>
                    ))}
                </ul>
            </HomepageContent>
        </div>
    );
}

const style = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas: 
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content"
    "navbar content content content content";
    overflow: hidden;
    height: 100vh;
    font-family: "Nexa"
`

export default HomePage;