import flowers from "../data";
import Container from 'react-bootstrap/Container';
import Figure from 'react-bootstrap/Figure'

const Home = () => {
    return (
        <Container mt-3='true' style={{textAlign:'center'}}>
            {
                flowers.map( (index) => <Figure>
                                            <Figure.Image fluid src={index.picture} className='p-3'></Figure.Image>
                                            <Figure.Caption>{index.name}</Figure.Caption>
                                        </Figure>)
            }
        </Container>
    );
}

export default Home;