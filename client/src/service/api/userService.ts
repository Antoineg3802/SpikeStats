import { User } from '../../data/User';

const baseUrl = '/api';

export const fetchUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/users`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                resolve(data.data as User[])
            }else{
                reject(data as Error)
            }
        })
    })
};

export const logIn = (email: string, password: string): Promise<string> => {
    return new Promise((resolve) => {
        fetch(`${baseUrl}/users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(async res => {
                let responseConverted = res.json();
                const data = await responseConverted;
                data.status = res.status;
                return data;
            })
            .then(data => {
                if (data.status === 200) {
                    resolve(data.message)
                }else{
                    switch(data.status){
                        case 404:
                            resolve("L'email renseigné n'existe pas");
                            break;
                        case 400:
                            resolve("Le mot de passe est incorrect");
                            break;
                        default:
                            resolve("Une erreur est survenue")
                    }
                }
            })
    })
};