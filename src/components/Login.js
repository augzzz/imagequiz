import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import local_temp_store from '../data_access_layer/local_temp_storage';

const Login = () => {
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
        //event.preventDefault();
        let found = local_temp_store.customers.find(x => 
            (x.email.toLowerCase() === email.toLowerCase()) && (x.password === password));
        if (found) {
            navigate('/');
        } else {
            alert('Invalid credentials.')
        }
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