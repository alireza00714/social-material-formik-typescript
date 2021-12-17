import axios, { AxiosResponse } from "axios";

const deleteSocialInformationWebService = async (id: string) => {

    let result: AxiosResponse = {data: null, statusText: "", config: {}, headers: {}, status: 0};

    await axios.delete("http://localhost:3030/socials/" + id)
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

export default deleteSocialInformationWebService;