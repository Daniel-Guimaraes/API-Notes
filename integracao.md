# Token no insomnia

Agora que temos um token sendo retornado, uma coisa muito legal no insomnia, é que podemos guardar o token. Porque eu vou inserir esse token em vários lugares. Mas eu preciso também deixar isso de forma dinâmica, para isso eu vou usar as seguintes configurações.

Para isso eu vou na opção <u>Dev</u> e vou clicar no atributo <u>manage enviroments</u>, e dentro desse atributo eu vou clicar na opção de <u>Base environment</u>, e vou adicionar o seguinte JSON:

```JSON
{
	"USER_TOKEN":"{% response 'body', '', '', 'never', 60 %}"
  // Para colocar essa opção eu uso um atalho no teclado "Ctrl+espaço", e seleciono a opção 'response = body attribute'
}
```

Feito isso eu clico nela, e configuro. Na opção de <u>request</u> eu escolho a opção <u>[Sessions]POST Create</u>. Logo em seguida, na opção <u>Filter</u>, eu coloco o seguinte conteúdo: <u>$.token</u>. E na ultima opção <u>Trigger behavior</u> eu escolho a opção <u>Always - resend request when needed</u>.

E pronto nosso token está configurado.

# Middleware de autenticação

Vamos criar agora um middleware para podermos verificar quem é o usuário que está fazendo a requisição, pegando o 'id' que está dentro desse token. Dentro da nossa pasta 'src' eu vou criar uma pasta chamada <u>middlewares</u>. Vou criar um arquivo, que vai se chamar <u>ensureAuthenticated.js</u>, e dentro desse arquivo já vou começar importando o `verify`, que é uma função do nosso `jsonwebtoken`. Vou importar também o nosso 'AppError' e o 'authConfig' também.

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../Utils/AppError");
const authConfig = require("../Config/authConfig");
```

Agora vou criar uma função que vai ter o mesmo nome da pasta, e vou pegar a <u>request, response, next</u>, o 'next' é uma função do próprio middleware para chamar a próxima requisição. Agora vou criar uma variável, na onde eu vou buscar na minha requisição o <u>headers</u> e dentro dele eu vou pegar o <u>authorization</u> que é onde vai estar o meu token.

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  // Dentro da minha requisição, eu estou pegando o cabeçalho, e dentro do cabeçalho estou pegando o token de autorização.
}
```

Agora vou criar uma verificação, para saber se o token ele existe ou não. Se ele não existir eu vou lançar uma mensagem, dizendo que o "JWT Token inválido" e vou adicionar um "401".

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }
}
```

Logo em seguida eu vou criar um array que vai receber o meu <u>authHeader</u> e vou aplicar uma funcionalidade chamada `split(" ")`, essa funcionalidade vai quebrar a minha string, transformando cada quebra em uma posição do array, nesse cado eu vou passar para o split somente um 'espaço' para que ele quebre sempre que tiver um espaço na minha string.

Como o que me importa é somente o token, eu vou criar uma variável chamada <u>token</u>, e vou coloca-la dentro do array após uma vírgula, para que o javascript desconsidere o que vem antes da vírgula e leve a sério somente o meu TOKEN.

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
  //Então eu estou quebrando o conteúdo que vai para dentro do meu array no momento que tiver um espaço entre os caracteres, e estou pegando somente a segunda posição do meu array, que vai estar o meu TOKEN.
}
```

Vou agora criar um tratamento de erros na onde eu vou usar o `try{}catch{}`. Para qeu eu possa verificar se esse token ele realmente é válido.

Dentro do `try{}`, eu vou colocar a função `verify`, na onde eu verificar se o meu token ele bate com um JWT válido. E o resultado dessa função vai me retornar um `sub`, na onde eu já vou desestruturar, pegando ele e já convertendo ele em um `user_id`.

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    // Eu verifiquei se meu token ele bate com um token válido, e se bater vai ser retornado uma resposta que vai ser chamar 'sub', então eu peguei esse sub e transformei ele em um 'user_id' para ficar mais semântico.
  } catch {}
}
```

Agora vou pegar a minha requisição, vou transformar ela em uma propriedade que vou chamar de <u>user</u> e vou passar um objeto que vai conter um 'id' que vai receber o meu <u>user_id</u>, e vou transformar ele em um número usando a propriedade `Number()`. E se tudo tiver dado certo eu vou retornar o `next()`, para que ele chame a próxima função. Adiciono também uma mensagem caso de algo errado, e por fim eu exporto nosso <u>ensureAuthenticated</u>.

```javascript
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };
    // Peguei a requisição, criei uma propriedade que nomeei como 'user', e atribui um objeto para ele , que vai ter uma propriedade que nomeei de 'id' e que vai receber o conteúdo do meu 'token', que vai ser justamente o 'id do usuário'
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
  // E se por acaso der alguma coisa errado nesse, eu vou apresentar uma mensagem de erro dizendo que o <u>token é invalido</u>.
}

module.exports = ensureAuthenticated;
```

Agora meu middleware já está prontinho para ser usado na aplicação.

# Utilizando middlewares.

No meu arquivo <u>users.routes.js</u> eu vou importar o meu 'middleware'. Agora eu preciso colocar o mid na rota em que o usuário vai fazer uma requisição, em que ele já esteja autenticado, que nesse caso acontece quando ele quiser atualizar os dados dele, nesse caso eu uso na na rota de <u>update</u>, colocando o meu 'mid', antes do meu controller de atualização.

```javascript
const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated"); // importei o meu middleware
const usersRoutes = Router();

function myMiddleware(request, response, next) {
  console.log("você passou pelo middleware");

  next();
}

const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update); //Coloquei ele na minha rota de atualização, interceptando a minha requisição e atribuindo o id do usuário nela. Por esse motivo eu removi o ':id' que eu tinha colocado na minha rota.

module.exports = usersRoutes;
```

Agora vamos entrar na nossa rota de atualização, e vamos alterar alguns dados, porque agora não vamos mais precisar pegar do parâmetro da requisição o id = `const { id } = request.params`, porque a requisição já vai vir com o id incorporado nela, por isso eu vou alterar para o seguinte formato = `const user_id = request.user.id`, porque vale lembrar que no meu middleware de autenticação eu, inseri dentro da requisição o <u>user</u>, e passei para ele um objeto que possui uma propriedade chamada <u>id</u>, que é justamente o id do usuário que pegamos do conteúdo do nosso token.

```javascript
async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id; // Fiz a mudança.

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id, //Adicionei a constante aqui
    ]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir uma nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha não confere com a sua senha antiga");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id] // E adicionei aqui.
    );

    return response.json();
  }
```

Agora se eu der um send no insomnia, na rota de atualização, vai aparecer para mim uma mensagem informando = <u>JWT Token não informado</u>, para isso eu preciso agora clicar na opção <u>Auth</u>, e escolher o <u>Bearer Token</u>, e no campo <u>TOKEN</u> eu vou adicionar o <u>USER_TOKEN</u>,

Agora eu preciso refatorar as outras rotas. A próxima rota que precisa do token, é justamente a de criar uma nota, então para ela eu executo o mesmo processo de passar um token para ela. E agora precisamos ajustar no código também.

Então no meu arquivo de rota das notas <u>notes.routes.js</u>, eu vou importar o meu middleware de autenticação, e vou passar para praticamente todas as rotas, e para não ter que colocar em rota por rota eu simplesmente uso os seguinte comando: `notesRoutes.use(ensureAuthenticated)`, agora antes de acessar qualquer rota, ele primeiro precisa passar ser aprovado no meu middleware de autenticação.

```javascript
const { Router } = require("express");
const NotesController = require("../controller/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated); //Aqui eu apliquei o middleware para todas as rotas

notesRoutes.post("/", notesController.create); //Aqui eu tirei o 'user_id' após a barra
notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
```

Agora para as rotas de <u>index e create</u> eu vou fazer as mesma alterações que fiz para a rota de atualização do usuário.
