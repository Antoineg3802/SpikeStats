import { Team } from '../../data/Team';
import CustomHTTPError from '../../data/http/CustomHTTPError';

const baseUrl = '/api';

export const getMyTeam = (): Promise<Team | CustomHTTPError> => {
    return new Promise((resolve) => {
        fetch(`${baseUrl}/teams/mine`,
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
                    resolve(data.data as Team)
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
                            resolve({
                                success: false, 
                                message:"Une erreur est survenue"
                            } as CustomHTTPError)
                    }
                }
            })
    })
};