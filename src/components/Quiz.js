import { useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";

import apiAccess from '../communication/APIAccess';

const Quiz = (props) => {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [quiz, setQuiz] = useState(undefined);
    const [score, setScore] = useState(0);
    const [complete, setComplete] = useState(undefined);

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        if (!quiz) {
            apiAccess.getQuiz(id)
                .then(x => setQuiz(x))
                .catch(e => console.log(e));
        }
    });

    let validateSelection = (selection) => {
        console.log(quiz.questions.length);

        if (!complete) {
            if (selection === quiz.questions[currentQuestionNumber].answer) {
                setScore(score + 1);
            }

            if (currentQuestionNumber >= quiz.questions.length - 1) {
                apiAccess.addScore(id, props.customer, score)
                    .then(x => console.log(x))
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong...')
                    })
                setComplete(true);
            } else {
                setCurrentQuestionNumber(currentQuestionNumber + 1);
            }
        }

    };

    let restartQuiz = () => {
        setComplete(undefined);
        setCurrentQuestionNumber(0);
        setScore(0);
    };

    let goHome = () => {
        navigate('/');
    }

    return (
        <Container>

            <Row>Score: {score}</Row>

            <Row>{currentQuestionNumber} / 6</Row>

            <Row xs={1} md={3} className="g-4 text-center">
                <Col>
                    {quiz ?
                        <Card className="h-100">
                            <Card.Img variant="top" src={quiz.questions[currentQuestionNumber].picture} />
                            <Card.Body>
                                <Card.Title>{quiz.name}</Card.Title>
                                <Card.Text>
                                    Which word matches the image?
                                </Card.Text>
                            </Card.Body>
                            <ListGroup>
                                {quiz.questions[currentQuestionNumber].choices.split(',').map(x =>
                                        <ListGroup.Item key={x} onClick={() => validateSelection(x)}>{x}</ListGroup.Item>)
                                }

                                {complete ?
                                    <Container>
                                        <Button onClick={restartQuiz}>Restart Quiz</Button>
                                        <Button onClick={goHome}>Go Home</Button>
                                    </Container>
                                    :
                                    <div></div>
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