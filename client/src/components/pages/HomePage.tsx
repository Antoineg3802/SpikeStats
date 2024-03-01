import { useEffect, useState } from "react";

import LoginModale from "../organisms/LoginModale";

import { User } from "../../data/User";
import { fetchUsers } from "../../service/api/userService";
import { isAuthenticated } from "../../service/global/verifications";

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers()
        .then((data) => {
            setUsers(data)
        })
    }, []);

    return (
        <div className="homepage">
            <LoginModale visible={!isAuthenticated()}/>
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