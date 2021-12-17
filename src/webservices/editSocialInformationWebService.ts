import axios, { AxiosResponse } from "axios";

const editSocialInformationWebService = async (id: string, params: {social_link: string, social_id: string}) => {

    let result: AxiosResponse = {data: null, statusText: "", config: {}, headers: {}, status: 0};

    await axios.patch("http://localhost:3030/socials/" + id, params, undefined )
        .then(res => {
            result = {
                data: res.data,
                statusText: res.statusText,
                config: res.config,
                headers: res.headers,
                status: res.status
            }

            console.log(res)
        })
        .catch(err => console.log(err))

    return result;
    
}

export default editSocialInformationWebService;