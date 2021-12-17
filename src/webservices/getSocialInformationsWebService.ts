import axios,{ AxiosResponse }  from "axios";

const getSocialInformationsWebService = async () => {

    let result: AxiosResponse = {data: [], statusText: "", config: {}, headers: {}, status: 0};

    await axios.get("http://localhost:3030/socials")
        .then(res => {
            result = {
                data: res.data,
                statusText: res.statusText,
                config: res.config,
                headers: res.headers,
                status: res.status
            }

            console.log(result.data);
        })
        .catch(err => console.log(err))

    return result;
    
}

export default getSocialInformationsWebService;