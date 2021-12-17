import { FormikProps } from "formik";
import { PaletteMode } from "@mui/material";

export type socialInformaionType = {
    id: string,
    socialId: string,
    socialLink: string
};

export type socialInformationWebType = { 
    social_id: string, 
    social_link: string, 
    id: string 
}

export interface IFormProps {
    closeCollapse: Function,
    formik: FormikProps<IFormValues>,
    isEditMode: boolean,
    setIsEditMode: Function,
    targetId: string,
    socialInformations: socialInformaionType[],
}

export interface IFormValues {
    type: number,
    id: string,
    link: string,
}

export interface IFormError {
    type?: string | undefined,
    id?: string | undefined,
    link?: string | undefined
}

export interface ISocialItemProps extends socialInformaionType {
    handleEdit: Function,
    openAlertBox: Function,
    setTargetId: Function
}

export interface IAlertBoxProps {
    handleClose: Function,
    open: boolean,
    handleDelete: Function,
    targetId: string,
    socialInformations: socialInformaionType[]
}

export interface IThemeSwitchContextState {
    mode: PaletteMode | undefined,
    handleDarkMode: Function,
    handleLightMode: Function
}