import {socials} from "../Config.json"

const getFarsiName = (link : string | undefined) => {

    let farsiName: string = "";

    for(let social of socials){
        if(!link?.includes(social.name)){
            continue;
        } else {
            farsiName = social.farsiName
        }
    }

    return farsiName;

}

export default getFarsiName;