const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { verifyToken, secretKey } = require('./auth');
const admin = require('./src/clients/config.json');
const routes = require('./src/routes/index');
const { validateUsers } = require('./src/services/validateUsers');
const { getSchools } = require('./src/services/getSchools');
const { createUser } = require('./src/services/createUser');
const { addOrder, getOrders, searchSchools, updateOrder } = require('./src/services');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'));
app.use('/moment', express.static('node_modules/moment/'));
app.use('/sweetalert2', express.static('node_modules/sweetalert2/dist/'));

app.set('views', `${__dirname}/src/views`);
app.set('view engine', '.hbs');

const { engine } = require('express-handlebars');
app.engine(
	'hbs',
	engine({
		defaultLayout: 'main',
		layoutsDir: `${__dirname}/src/views/layouts`,
		partialsDir: `${__dirname}/src/views/partials`,
		extname: '.hbs',
	})
);

let token = '';

app.use('/', routes);

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
			const userId = Math.floor(Math.random() * 10000);
			const response = await createUser(userId, nombre, email, password);
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

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT} and PID: ${process.pid}`);
});
