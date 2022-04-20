import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";

import apiAccess from '../communication/APIAccess';

const Quiz = () => {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [quiz, setQuiz] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        if (!quiz) {
            let x = apiAccess.getQuiz(id);
            setQuiz(x);
        }
    });

    return (
        <Container>
            <Row xs={1} md={3} className="g-4 text-center">
                <Col>
                    {quiz ?
                        <Card className="h-100">
                            <Card.Img variant="top" src={quiz.questions[currentQuestionNumber].picture} />
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    Which word matches the image?
                                </Card.Text>
                            </Card.Body>
                            <ListGroup>
                                {
                                    quiz.questions[currentQuestionNumber].choices.map(x =>
                                        <ListGroup.Item>{x}</ListGroup.Item>)
                                }
                            </ListGroup>
                        </Card>
                        :
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                </Col>
            </Row>
        </Container>
    );
}

export default Quiz;