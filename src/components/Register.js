import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import local_temp_store from '../data_access_layer/local_temp_storage';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    let onNameChange = (event) => {
        setName(event.target.value);
    }

    let onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    let onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    let onSubmitHandler = (event) => {
        event.preventDefault();
        local_temp_store.customers.push({name: name, email: email, password: password});
        navigate('/login');
    }

    return (
        <Form onSubmit={onSubmitHandler}>

            <Form.Group className="mb-3" controlId='formBasicEmail'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={onNameChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    );
}

export default Register;