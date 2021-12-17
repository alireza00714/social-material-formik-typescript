import { useCallback, useEffect, useState } from "react";
import { Paper, Button, Grid, Collapse } from "@mui/material"
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai"
import Form from "../Form/Form";
import SocialItem from "../SocialItem/SocialItem";
import { IFormError, IFormValues, socialInformaionType, socialInformationWebType } from "../../types";
import { FormikErrors, FormikHelpers, FormikProps, useFormik } from "formik";
import { socials } from "../../Config.json"
import getSocialTypeValue from "../../functions/getSocialTypeValue";
import AlertBox from "../AlertBox/AlertBox";
import getSocialInformationsWebService from "../../webservices/getSocialInformationsWebService";
import editSocialInformationWebService from "../../webservices/editSocialInformationWebService";
import deleteSocialInformationWebService from "../../webservices/deleteSocialInformationWebService";
import createSocialInformationWebService from "../../webservices/createSocialInformationWebService";

const MainContainer = () => {

    const [isAlertBoxOpen, setIsAlertBoxOpen] = useState<boolean>(false);
    const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [targetId, setTargetId] = useState<string>("0");
    const [socialInformations, setSocialInformations] = useState<socialInformaionType[]>([
        // {
        //     id: "1",
        //     socialId: "@alireza00714",
        //     socialLink: "https://twitter.com/alireza00714"
        // }
    ]);

    /*-------------------------------------------------*/

    const formik: FormikProps<IFormValues> = useFormik({
        initialValues: {
            type: 0,
            id: "",
            link: ""
        },
        validate: (values:IFormValues) => {

            const errors: FormikErrors<IFormError> = {}

            if(values.type === 0){
                errors.type = "وارد کردن نوع مسیر ارتباطی الزامیست";
            }

            if(!values.id){
                errors.id = "وارد کردن آیدی الزامیست";
            } else if (values.id.length < 4){
                errors.id = "آیدی باید بیشتر از 4 کاراکتر باشد";
            }

            if(!values.link){
                errors.link = "وارد کردن لینک الزامیست";
            } else if (socialInformations.map(socialInformation => socialInformation.socialLink).includes(values.link) && !isEditMode){
                errors.link = "مسیر ارتباطی نباید تکراری باشد"
            }

            return errors;

        },
        onSubmit: (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
            if(isEditMode){

                let response;
                const sendData = async () => {
                   response = await editSocialInformationWebService(targetId, {social_id: values.id, social_link: values.link});
                   
                   if(response.status === 200)
                        setSocialInformations(socialInformations.map(socialInformation => socialInformation.id === targetId ? {id: socialInformation.id, socialLink: values.link, socialId: values.id} : socialInformation));
                }

                sendData();
                closeCollapse();
                setIsEditMode(false)

                actions.setValues({id: "", type: 0, link: ""}, false);

            } else {

                let response;
                const sendData = async () => {
                    response = await createSocialInformationWebService({social_link: values.link, social_id: values.id});
                    if(response.status === 201){
                        const getResponse = await getSocialInformationsWebService();
                        if(getResponse.status === 200){
                            const transformedGetResponse = getResponse.data.map((res: socialInformationWebType) => ({id: res.id, socialId: res.social_id, socialLink: res.social_link}))
                            setSocialInformations(transformedGetResponse);
                        }
                    }
                }

                sendData();

                

                actions.setValues({id: "", type: 0, link: ""}, false);

            }
        },
    })

    /*-------------------------------------------------*/

    const closeCollapse = () : void => {
        setIsCollapseOpen(false)
        formik.setErrors({});
    }


    const closeAlertBox = () : void => {
        setIsAlertBoxOpen(false)
    }

    const handleDelete = (id: string) => {

        closeAlertBox();

        let response;

        const deleteData = async () => {
            response = await deleteSocialInformationWebService(id);

            if (response.status === 200)
                setSocialInformations(prevState => prevState.filter(socialInformation => socialInformation.id !== id))
        }

        deleteData();

        setIsEditMode(false)

    }

    /*-------------------------------------------------*/

    const openCollapse = useCallback(() => {
        setIsCollapseOpen(true);
        formik.setErrors({});
    }, [formik])

    const handleEdit = useCallback((id: string) => {

        setTargetId(id);
        setIsEditMode(true);

        openCollapse();

        const targetSocialInformation = socialInformations.find(socialInformation => socialInformation.id === id)!;
        const socialInformationType = socials.find(social => social.id === getSocialTypeValue(targetSocialInformation.socialLink))!.id;
        
        formik.setValues({type: socialInformationType, id: targetSocialInformation.socialId, link: targetSocialInformation.socialLink});

    },[socialInformations, formik, openCollapse]);

    const openAlertBox = useCallback(() => {
        setIsAlertBoxOpen(true);
    }, []);

    /*-------------------------------------------------*/

    useEffect(() => {

        const fetchData = async () => {
            const response = await getSocialInformationsWebService();
            const transformedResponse = response.data.map((res: socialInformationWebType) => ({id: res.id, socialId: res.social_id, socialLink: res.social_link}))

            setSocialInformations(transformedResponse)
        } 

        fetchData();

    }, [])

    /*-------------------------------------------------*/

    return(
        <>
            <Paper variant="elevation" elevation={24} style={{padding: "1.5rem"}}>
                <Grid container flexDirection="column" gap="20px">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <span>مسیر های ارتباطی</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size="small" startIcon={isEditMode ? <AiFillEdit/> : <AiOutlinePlus />} onClick={() => {
                                if(isEditMode){
                                    closeCollapse();
                                    setIsEditMode(false)
                                } else {
                                    openCollapse();
                                    formik.setValues({type: 0, link: "", id: ""}, false)
                                }
                            }}>
                                {isEditMode ? "ویرایش مسیر ارتباطی" : "افزودن مسیر ارتباطی"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Collapse in={isCollapseOpen} unmountOnExit style={{width: "100%"}}>
                        <Form closeCollapse={closeCollapse} isEditMode={isEditMode} setIsEditMode={setIsEditMode} formik={formik} targetId={targetId} socialInformations={socialInformations}/>
                    </Collapse>
                    {socialInformations.length !== 0 && (
                        <Grid container spacing={0.5}>
                            {
                                socialInformations.map((information) => (
                                    <SocialItem key={information.id} id={information.id} socialId={information.socialId} socialLink={information.socialLink} handleEdit={handleEdit} openAlertBox={openAlertBox} setTargetId={setTargetId}/>
                                ))
                            }
                        </Grid>
                    )}
                </Grid>
            </Paper>
            <AlertBox open={isAlertBoxOpen} handleClose={closeAlertBox} handleDelete={handleDelete} targetId={targetId} socialInformations={socialInformations}/>
        </>
    )

}

export default MainContainer;