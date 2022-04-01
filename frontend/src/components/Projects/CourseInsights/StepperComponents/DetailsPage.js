import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Wordcloud from "./Wordcloud";


export default function Popup(props) {
    return (
        <Dialog open={props.openPopup}
                onClose={props.closePopup}
                maxWidth={"lg"}
                fullWidth={true}
                >
            <MuiDialogTitle>
                {props.popupLecture.name}
            </MuiDialogTitle>
            <MuiDialogContent>
                <div>
                    <Wordcloud keywords={props.popupLecture.keywords}/>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}
