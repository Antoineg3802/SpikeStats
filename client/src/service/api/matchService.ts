import { AllMatches, MatchDetails } from '../../data/Match';
import CustomHTTPError from '../../data/http/CustomHTTPError';

const baseUrl = '/api';

export const getMyMatches = (): Promise<AllMatches | CustomHTTPError> => {
    return new Promise((resolve) => {
        fetch(`${baseUrl}/matches`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "credentials": 'include'
                }
            })
            .then(async res => {
                let responseConverted = res.json();
                const data = await responseConverted;
                data.status = res.status;
                return data;
            })
            .then((data): void => {
                if (data.status === 200) {
                    resolve(data.data as AllMatches)
                }else{
                    switch(data.status){
                        case 404:
                            resolve({
                                success: false, 
                                message:"Vous n'êtes actuellement dans aucune équipe"
                            } as CustomHTTPError);
                            break;
                        case 401:
                            resolve({
                                success: false, 
                                message:"Vous devez etre connecté "
                            } as CustomHTTPError);
                            break;
                        default:
                            console.log(data.status)
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            } as CustomHTTPError)
                    }
                }
            })
    })
}

export const getMatch = (id : number): Promise<MatchDetails | CustomHTTPError> =>{
    return new Promise((resolve) => {
        console.log(`${baseUrl}/matches/one/` + id.toString())
        fetch(`${baseUrl}/matches/one/` + id.toString(),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "credentials": 'include'
                }
            })
            .then(async res => {
                let responseConverted = res.json();
                const data = await responseConverted;
                data.status = res.status;
                return data;
            })
            .then((data): void => {
                console.log(data)
                if (data.status === 200) {
                    resolve(data.data as MatchDetails)
                }else{
                    switch(data.status){
                        case 404:
                            if (data.message === "No sets found for this match"){
                                resolve({
                                    success: false, 
                                    message:"Ce match n'a pas encore été joué, ou n'a pas de statistiques consultables"
                                } as CustomHTTPError)
                            }else{
                                resolve({
                                    success: false, 
                                    message:"Match introuvable"
                                } as CustomHTTPError);
                            }
                            break;
                        case 401:
                            resolve({
                                success: false, 
                                message:"Vous devez etre connecté "
                            } as CustomHTTPError);
                            break;
                        default:
                            console.log(data.status)
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            } as CustomHTTPError)
                    }
                }
            })
    })
}