import { User } from '../../data/User';
import CustomHttpError from '../../data/http/CustomHTTPError';
import {CustomHTTPResponse} from '../../data/http/CustomHTTPResponse';

const baseUrl = '/api';

export const logIn = (email: string, password: string): Promise<CustomHTTPResponse | CustomHttpError> => {
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
                    resolve(data as CustomHTTPResponse)
                }else{
                    switch(data.status){
                        case 404:
                            resolve({
                                success: false, 
                                message:"L'email renseigné n'existe pas"
                            });
                            break;
                        case 400:
                            resolve({
                                success: false, 
                                message:"Le mot de passe est incorrect"
                            });
                            break;
                        default:
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            })
                    }
                }
            })
    })
};

export const signUpPlayer = (firstname: string, lastname: string, email: string, password: string): Promise<CustomHTTPResponse | CustomHttpError> => {
    return new Promise((resolve) => {
        fetch(`${baseUrl}/users/register/player`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password
                })
            })
            .then(async res => {
                let responseConverted = res.json();
                const data = await responseConverted;
                data.status = res.status;
                return data;
            })
            .then(data => {
                if (data.status === 201) {
                    resolve(data as CustomHTTPResponse)
                }else{
                    switch(data.status){
                        case 409:
                            resolve({
                                success: false, 
                                message:"L'email renseigné existe déjà"
                            });
                            break;
                        default:
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            })
                    }
                }
            })
    })
};

export function signUpCoach(firstname: string, lastname: string, email: string, password: string): Promise<CustomHTTPResponse | CustomHttpError> {
    return new Promise((resolve) => {
        fetch(`${baseUrl}/users/register/manager`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password
                })
            })
            .then(async res => {
                let responseConverted = res.json();
                const data = await responseConverted;
                data.status = res.status;
                return data;
            })
            .then(data => {
                if (data.status === 201) {
                    resolve(data)
                }else{
                    switch(data.status){
                        case 409:
                            resolve({
                                success: false, 
                                message:"L'email renseigné existe déjà"
                            });
                            break;
                        default:
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            })
                    }
                }
            })
    })
}