import WaddleDeeHeader from '../components/WaddleDeeBar';
import GameSubmitForm from '../components/GameSubmitForm';
import PageTextField from '../components/PageTextField';

export default function GameSubmitPage(){
    return(
        <>
            <WaddleDeeHeader/>
            <PageTextField
                title={"Submit a Game"}
                body={"This will add a Game to our database and we will be able to accept runs associated with that game."}
            />
            <GameSubmitForm/>

        </>
    )
}