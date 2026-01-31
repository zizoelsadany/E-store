import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Auth endpoints
server.post('/auth/login', (req, res) => {
  console.log('Login request:', req.body);
  const { email, password } = req.body;
  
  const mockUsers = [
    { 
      id: '1', 
      email: 'admin@example.com', 
      password: 'admin123', 
      name: 'Admin User', 
      role: 'admin' 
    },
    { 
      id: '2', 
      email: 'user@example.com', 
      password: 'user123', 
      name: 'John Doe', 
      role: 'user' 
    }
  ];

  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid email or password' 
    });
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');

  res.json({
    token,
    user: { ...userWithoutPassword, createdAt: new Date().toISOString() }
  });
});

server.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  const token = Buffer.from(JSON.stringify({ userId: newUser.id, role: newUser.role })).toString('base64');

  res.json({
    token,
    user: newUser
  });
});

server.get('/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const user = {
      id: decoded.userId,
      email: decoded.userId === '1' ? 'admin@example.com' : 'user@example.com',
      name: decoded.userId === '1' ? 'Admin User' : 'John Doe',
      role: decoded.role,
      createdAt: new Date().toISOString()
    };
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server with auth is running on port 3001');
});
