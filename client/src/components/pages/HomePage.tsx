import { useEffect, useState } from "react";

import LoginModale from "../organisms/LoginModale";

import { User } from "../../data/Users";
import { fetchUsers } from "../../service/userService";

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
        fetchUsers()
        .then((data) => {
            setUsers(data)
        })
    }, []);
    
    return (
        <div className="">
            <LoginModale />
            {users.map((user) => (
                <div key={user.id}>
                    <p>{user.id}</p>
                    <p>{user.firstname}</p>
                    <p>{user.lastname}</p>
                    <p>{user.mail}</p>
                    <p>{user.role}</p>
                </div>
            ))}
        </div>
    );
}

export default HomePage;