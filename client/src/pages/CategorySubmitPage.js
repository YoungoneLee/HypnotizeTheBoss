import WaddleDeeHeader from '../components/WaddleDeeBar';
import CategorySubmitForm from '../components/CategorySubmitForm';
import PageTextField from '../components/PageTextField';

export default function CategorySubmitPage(){
    return(
        <>
            <WaddleDeeHeader/>
            <PageTextField 
                title={"Submit a Category"}
                body={"This will add a new speedrun category to our database. Checking the extension checkbox will flag the inserted category as out of the norm"}
            />
            <CategorySubmitForm/>

        </>
    )
}