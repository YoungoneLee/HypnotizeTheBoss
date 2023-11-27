import Header from '../components/Header'
import ListTodos from '../components/ListData';

export default function Home(){
    return(
        <>
            <Header title="HomePage!"/>
            <h1> Random Run(s) of the Day! </h1>
            <ListTodos/>
        </>
    )
}