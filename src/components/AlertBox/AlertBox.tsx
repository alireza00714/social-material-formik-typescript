import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material"
import { IAlertBoxProps } from "../../types"

const AlertBox:React.FC<IAlertBoxProps> = (props) => {

    const {handleClose, open, handleDelete, targetId, socialInformations} = props

    const [inputValue, setInputValue] = useState<string>("");

    const socialId = socialInformations.find(socialInformation => socialInformation.id === targetId)?.socialId

    return(
        <div>
            <Dialog open={open} onClose={() => handleClose()}>
              <DialogTitle>آیا از تصمیم خود مطمئن هستید؟</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  برای حذف مسیر ارتباطی {socialId} لطفا تایید را بنویسید
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="confirm"
                  placeholder="تایید"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.target.value)
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={() => handleClose()}>انصراف</Button>
                <Button color="error" onClick={() => {
                    if(inputValue === "تایید")
                        handleDelete(targetId)
                }}>حذف</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertBox;