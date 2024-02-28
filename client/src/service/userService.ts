import { User } from '../data/Users';

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

export const logIn = (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/users/login`,
        {
            method: 'POST',
            credentials: 'include',
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
            console.log(data.status)
            switch(data.status){
                case 200:
                    resolve(data.data as User);
                    break;
                case 401:
                    resolve(data.message as Error);
                    break;
                case 400:
                    resolve("L'email renseigné n'existe pas");
            }
        })
    })
};