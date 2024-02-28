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
