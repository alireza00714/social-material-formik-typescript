import { Paper, Grid, FormControl, InputLabel, Select, TextField, Button, MenuItem, FormHelperText } from "@mui/material"
import { IFormProps } from "../../types"
import { socials } from "../../Config.json"
import getFarsiName from "../../functions/getFarsiName"


const Form:React.FC<IFormProps> = (props) => {

    const { closeCollapse, formik, isEditMode, setIsEditMode, targetId, socialInformations } = props

    const socialLink = socialInformations.find(socialInformation => socialInformation.id === targetId)?.socialLink

    const cancelHandler = () => {

        closeCollapse();

        if(isEditMode){
            setIsEditMode(() => false)
        }

    }
    
    return(
        <Paper variant="elevation" style={{padding: "1rem"}}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth >
                    <Grid container direction="column" gap="10px">
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <InputLabel id="social-type-label">نوع</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="social-type-label"
                                    id="social-type-select"
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    label="نوع"
                                >
                                    <MenuItem value={0}>
                                        لطفا یک مسیر ارتباطی را انتخاب کنید
                                    </MenuItem>
                                    {socials.map(item => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.farsiName}
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                                <FormHelperText error>
                                    {formik.touched.type && formik.errors.type}
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth name="link" id="social-link-text" label="لینک" variant="outlined" value={formik.values.link} onChange={formik.handleChange} error={formik.touched.link && Boolean(formik.errors.link)} helperText={formik.touched.link && formik.errors.link}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth name="id" id="social-id-text" label="آی دی (ID)" variant="outlined" value={formik.values.id} onChange={formik.handleChange} error={formik.touched.id && Boolean(formik.errors.id)} helperText={formik.touched.id && formik.errors.id}/>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end" gap="10px">
                            <Grid item>
                                <Button variant="outlined" size="small" onClick={cancelHandler}>انصراف</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="small" type="submit">{isEditMode ? `ویرایش مسیر ارتباطی ${getFarsiName(socialLink)}` : "ثبت مسیر ارتباطی"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </Paper>
    )
}

export default Form;