import { Grid, Stack, Paper, Button, Box } from "@mui/material"
import React from "react";
import { ISocialItemProps } from "../../types";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import getFarsiName from "../../functions/getFarsiName";

const SocialItem: React.FC<ISocialItemProps> = (props) => {

    const {id, socialId, socialLink, handleEdit, setTargetId, openAlertBox} = props;


    return(
        <Grid item xs={12}>
            <Paper variant="elevation" style={{padding: "1rem"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={4}>
                        <Box>
                            {getFarsiName(socialLink)}
                        </Box>
                        <Box>
                            <span>آیدی: </span>
                            <Box sx={{fontSize:".8rem"}} component="span">{socialId}</Box>
                        </Box>
                        <Box>
                            <span>لینک: </span>
                            <Box sx={{color: "primary.main", fontSize:".8rem"}} component="span">{socialLink}</Box>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="text" size="small" startIcon={<AiFillEdit/>} onClick={() => {
                            setTargetId(id);
                            handleEdit(id);
                        }}>ویرایش</Button>
                        <Button variant="text" size="small" startIcon={<AiFillDelete/>} color="error" onClick={() =>{
                            openAlertBox()
                            setTargetId(id)
                        }}>حذف</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default SocialItem;