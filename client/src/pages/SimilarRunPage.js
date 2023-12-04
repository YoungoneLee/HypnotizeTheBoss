import { useLocation } from 'react-router-dom';
import Header from '../components/Header'

const SimilarRunPage = () => {
    const location = useLocation(); 
    const row = location.state ? location.state.row : null; 

    return(
        <>
        <Header title="similar run page"/>
        <h1> huh</h1>
        {row && Object.entries(row).map(([key, value], index) => (
            <h1 key={index}>{key}: {value}</h1>
        ))}
        </>
    );
}

export default SimilarRunPage;
