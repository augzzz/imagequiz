import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import apiAccess from '../communication/APIAccess';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    let onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    let onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    let onSubmitHandler = (event) => {
        event.preventDefault();
        apiAccess.login(email, password)
            .then(x => {
                if (x.done) {
                    props.customerLoggedIn(email);
                    navigate('/');
                } else {
                    alert('Invalid credentials.');
                }
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong...');
            });
    }

    return (
        <Form onSubmit={onSubmitHandler}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign in
            </Button>

        </Form>
    );
}

export default Login;