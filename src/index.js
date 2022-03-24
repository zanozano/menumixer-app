// dependencies
const express = require('express');
const app = express();

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// token cofig
const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey';

//* import
const admin = require('./clients/config.json');
const { validateUsers } = require('./services/validateUsers');
const { getSchools } = require('./services/getSchools');
const { createUser } = require('./services/createUser');
const { addOrder } = require('./services/addOrder');
const { getOrders } = require('./services/getOrders');
const { searchSchools } = require('./services/searchSchools');
const { updateOrder } = require('./services/updateOrder');

// enviroment
require('dotenv').config();
app.set('port', process.env.PORT || 3000);

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT} and PID: ${process.pid}`);
});

//--------------------------------------

// public
app.use(express.static('public'));

// bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'));

// moment js
app.use('/moment', express.static('node_modules/moment/'));

// sweetalert2
app.use('/sweetalert2', express.static('node_modules/sweetalert2/dist/'));

// set views
app.set('views', `${__dirname}/views`);

// set handlebars
app.set('view engine', '.hbs');

// handlebars config
const { engine } = require('express-handlebars');

app.engine(
	'hbs',
	engine({
		defaultLayout: 'main',
		layoutsDir: `${__dirname}/views/layouts`,
		partialsDir: `${__dirname}/views/components`,
		extname: '.hbs',
	})
);

//--------------------------------------

//validate user
let validateAccount = {
	isLogined: false,
	isAdmin: false,
	isUser: false,
	username: '',
	id: '',
};

//token global
let token = '';

// verify token
const verifyToken = (req, res, next) => {
	// const token = req.body.token || req.query.token || req.token;
	if (token === '') {
		return res.status(403).render('Auth', { layout: 'verify' });
	}
	try {
		const decoded = jwt.verify(token, secretKey);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('Error');
	}
	return next();
};

//* VIEWS

// root home
app.get('/', (req, res) => {
	res.render('Home', validateAccount);
});

// login
app.get('/login', (req, res) => {
	res.render('Login', { layout: 'verify' });
});

// signin
app.get('/signup', (req, res) => {
	res.render('Signup', { layout: 'verify' });
});

// new order
app.get('/orders/new', verifyToken, (req, res) => {
	res.render('NewOrder', validateAccount);
});

// orders
app.get('/orders/:id', verifyToken, (req, res) => {
	res.render('Orders', validateAccount);
});

// rectify
app.get('/orders/rectify/:id', verifyToken, (req, res) => {
	res.render('Rectify', validateAccount);
});

// rectify
app.put('/orders/rectify/:id', verifyToken, async (req, res) => {
	const { schoolId, vegetarian, celiac, standard, caloric, ethnic, commets } = req.body;
	const id = req.params.id;
	try {
		const result = await updateOrder(
			id,
			schoolId,
			vegetarian,
			celiac,
			standard,
			caloric,
			ethnic,
			commets
		);
		res.status(201).send(result);
	} catch (e) {
		res.status(500).send({
			error: `No se pudo actualizar el pedido... ${e}`,
			code: 500,
		});
	}
});

// detail
app.get('/orders/detail', (req, res) => {
	res.render('Detail', validateAccount);
});

//* VIEWS

//--------------------------------------

// get users
app.get('/schools', verifyToken, async (req, res) => {
	const result = await getSchools();
	res.send(result);
});

// get orders
app.get('/orders', verifyToken, async (req, res) => {
	const result = await getOrders();
	res.send(result);
});

// signin verify
app.post('/register', async (req, res) => {
	const { nombre, email, password } = req.body;

	if (nombre === '' || email === '' || password === '') {
		res.status(401).send({
			error: 'Debe llenar todos los campos',
			code: 401,
		});
	} else {
		try {
			const response = await createUser(nombre, email, password);
			res.status(201).send(response);
		} catch (e) {
			res.status(500).send({
				error: `Algo salió mal... ${e}`,
				code: 500,
			});
		}
	}
});

// search orders
app.post('/orders/search', verifyToken, async (req, res) => {
	const result = await searchSchools({ ...req.body });
	res.send(result);
});

// login verify
app.post('/verify', async (req, res) => {
	const { email, password } = req.body;

	if (email === '' || password === '') {
		res.status(401).send({
			error: 'Debe llenar todos los campos',
			code: 401,
		});
	} else {
		if (admin[0].email === email && admin[0].password === password) {
			validateAccount = {
				isLogined: true,
				isAdmin: true,
				isUser: false,
				username: 'ADMIN',
				id: 0,
			};
			token = jwt.sign(
				{
					data: admin,
				},
				secretKey,
				{
					expiresIn: '2h',
				}
			);
			console.log(token);
			const validate = {
				token: token,
				user: admin,
			};
			res.send(validate);
		} else {
			// pool
			const user = await validateUsers(email, password);
			if (user.length != 0) {
				token = jwt.sign(
					{
						data: user,
					},
					secretKey,
					{
						expiresIn: '2h',
					}
				);
				console.log(token);
				const validate = {
					token: token,
					user: user,
				};
				validateAccount = {
					isLogined: true,
					isAdmin: false,
					isUser: true,
					username: validate.user[0].nombre,
					id: validate.user[0].id,
				};
				res.status(200).send(validate);
			} else {
				// not registered
				res.status(404).send({
					error: 'Este usuario no está registrado en la base de datos o la contraseña es incorrecta.',
					code: 404,
				});
			}
		}
	}
});

app.get('/logout', async (req, res) => {
	try {
		validateAccount = {
			isLogined: false,
			isAdmin: false,
			isUser: false,
			username: '',
			id: '',
		};
		// clean token
		token = '';
		res.status(201).send();
	} catch (error) {
		res.status(404).send({
			error: 'Error al cerrar sesión',
			code: 404,
		});
	}
});

// register order
app.post('/orders/new', verifyToken, async (req, res) => {
	const { schoolId, date, vegetarian, celiac, standard, caloric, ethnic } = req.body;

	const orderId = Math.floor(Math.random() * 10000);

	if (
		date === '' ||
		vegetarian === '' ||
		celiac === '' ||
		standard === '' ||
		caloric === '' ||
		ethnic === ''
	) {
		res.status(401).send({
			error: 'Debe llenar todos los campos',
			code: 401,
		});
	} else {
		try {
			const response = await addOrder(
				orderId,
				schoolId,
				date,
				vegetarian,
				celiac,
				standard,
				caloric,
				ethnic
			);
			res.status(201).send(response);
		} catch (e) {
			res.status(500).send({
				error: `Algo salió mal... ${e}`,
				code: 500,
			});
		}
	}
});

// no auth
app.get('/no_auth', (req, res) => {
	res.render('Auth', { layout: 'verify' });
});

// default
app.get('*', (req, res) => {
	res.render('Error', { layout: 'verify' });
});
