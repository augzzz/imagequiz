import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));

  let customerLoggedInHandler = (customerEmail) => {
    localStorage.setItem('customer', customerEmail);
    setCustomer(customerEmail);
  };

  let customerLoggedOutHandler = () => {
    localStorage.removeItem('customer');
    setCustomer(undefined);
  }

  return (
    <HashRouter>
      <Container fluid>

        <Row>
          <Col>
            <Header />
          </Col>
        </Row>

        <Row>
          <Col>
            <Menu customer={customer} customerLoggedOut={customerLoggedOutHandler} />
          </Col>
        </Row>

        <Routes>
          <Route exact path='/' element={<Home />}>
          </Route>

          <Route exact path='/register' element={<Register />}>
          </Route>

          <Route exact path='/login/:from?' element={<Login customerLoggedIn={customerLoggedInHandler} />}>
          </Route>

          <Route exact path='/login' element={<Login customerLoggedIn={customerLoggedInHandler} />}>
          </Route>

          <Route exact path='/quiz/:id' element={
            <ProtectedRoute customer={customer}> <Quiz /></ProtectedRoute>
          } >

          </Route>

        </Routes>

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>

      </Container>
    </HashRouter>
  );
}

const ProtectedRoute = ({ customer, children }) => {
  const { id } = useParams();

  if (customer) {
    return children;
  } else {
    return <Navigate to={`/login/${id}`} />;
  }
}

export default App;