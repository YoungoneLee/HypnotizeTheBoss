import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { AppBar, Toolbar, Box} from '@mui/material';
import Logo from '../images/transparentwaddledee.png'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


export default function WaddleDeeHeader(){
    return(
        <AppBar position="flex" sx={{ backgroundColor: '#8db594' }}>
            <Toolbar sx={{m: 3}}>
                <Box display="flex" flexDirection="column" alignItems="center" style={{ height: '100%', width: '100%' }}>
                    <Stack direction="row"
                        divider={
                            <Divider 
                            orientation="vertical" 
                            flexItem />}
                        spacing={2}
                        justifyContent="center"
                        > 
                        <Item>
                            <Link to="/searchResult">
                                <Stack direction="column" > 
                                    <img src={Logo} alt="logo" className="logo" />
                                    <p1> Search for Speedruns</p1>
                                </Stack>
                            </Link> 
                        </Item>
                        <Item>
                            <Link to="/submit">
                                <Stack direction="column" > 
                                    <img src={Logo} alt="logo" className="logo" />
                                    <p1> Submit a Run</p1>
                                </Stack>
                            </Link> 
                        </Item>
                        <Item>
                            <Link to="/submitCategory">
                                <Stack direction="column" > 
                                    <img src={Logo} alt="logo" className="logo" />
                                    <p1> Submit a Category </p1>
                                </Stack>
                            </Link> 
                        </Item>
                        <Item>
                            <Link to="/submitGame">
                                <Stack direction="column" > 
                                    <img src={Logo} alt="logo" className="logo" />
                                    <p1> Submit a Game </p1>
                                </Stack>
                            </Link> 
                        </Item>
                    </Stack>
                </Box>            
            </Toolbar>
        </AppBar>
    );
}