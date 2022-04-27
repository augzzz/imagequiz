let backendAddress = 'https://augzzz-imagequiz-api.herokuapp.com';
//let backendAddress = 'http://localhost:4002';


let apiAccess = {
    addCustomer: (name, email, password) => {
        return fetch(`${backendAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },

    login: (email, password) => {
        return fetch(`${backendAddress}/login`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },

    getFlowers: () => {
        return fetch(`${backendAddress}/flowers`, {
            method: 'Get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x.result;
            });
    },

    getQuiz: (name) => {
        return fetch(`${backendAddress}/quiz/${name}`, {
            method: 'Get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x.result;
            });
    },

    addScore: (quiz_id, customer_id, score) => {
        return fetch(`${backendAddress}/score`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quiz_id, customer_id, score })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },
    
}

export default apiAccess;