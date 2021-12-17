import {socials} from "../Config.json"

const getSocialTypeValue = (link : string) => {
    let typeValue: number = 0;

    for(let social of socials){
        if(!link.includes(social.name)){
            continue;
        } else {
            typeValue = social.id
        }
    }

    return typeValue;
}

export default getSocialTypeValue;