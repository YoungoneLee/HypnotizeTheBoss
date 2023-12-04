import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { AppBar, Toolbar, Box} from '@mui/material';
import Logo from '../images/transparentwaddledee.png'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
            <Toolbar>
                <Box display="flex" justifyContent="center" >
                    <Stack direction="row" spacing={2}> 
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
                            <Link to="/home">
                                <Stack direction="column" > 
                                    <img src={Logo} alt="logo" className="logo" />
                                    <p1> Submit a Category </p1>
                                </Stack>
                            </Link> 
                        </Item>
                        <Item>
                            <Link to="/home">
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