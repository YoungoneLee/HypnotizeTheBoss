import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function PageTextField({title, body}){
    return(
        <>
            <Typography gutterBottom variant="h4" component="div" sx={{ m: 2}}>
                {title}
            </Typography>
            <Divider  variant="middle"/>
            <Typography color="text.secondary" variant="body1" sx={{ m: 2}}>
                {body}
            </Typography>
        </>
    )
}