import { useEffect, useState } from "react";
import { fetchUsers } from "../../service/userService";
import { User } from "../../data/Users";

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
        fetchUsers()
        .then((data) => {
            setUsers(data)
        })
    }, []);
    
    return (
        <div className="App">
            {users.map((user) => (
                <div key={user.id}>
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