import UserForm from '../components/RunSubmitForm';
import WaddleDeeHeader from '../components/WaddleDeeBar';
import PageTextField from '../components/PageTextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function RunSubmitPage(){
    return(
        <>
            <WaddleDeeHeader/>
            <PageTextField 
                title={"Submit a run"} 
                body={"Submitting a run will automatically generate a submission table with the submission time and date of when you put your run into our database."}/>
            <UserForm/>
        </>
    )
}