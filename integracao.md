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

Feito essas alterações, agora é hora de ir lá no insomnia e colorar o token para as rotas de <u>Delete, index e show</u>.

Na nossa rota de tag, eu estou passando também o 'id' do usuário. Por isso eu vou no meu arquivo de <u>tags.routes.js</u> e vou importar meu middleware, e vou passar ele para a minha rota de tag.

```javascript
const { Router } = require("express");
const TagsController = require("../controller/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
```

E agora no index da minha rota, eu vou fazer a alteração padrão. E adiciono nosso token lá no insomnia.

# Configurando o Upload de Imagem

Vou fazer agora a funcionalidade de upload de imagem, para que o usuário consiga enviar uma foto dele para o nosso backend. Vou começar criando um novo arquivo na nossa pasta de <u>configs</u>, que vou chamar de <u>upload</u>.

Vou começar importando o `path`, e vou criar uma constante que vou chamar de <u>TMP_FOLDER</u>, e vou usar a funcionalidade do path chamada <u>resolve()</u> para que eu possa navegar entre as pastas, e vou apontar ele para uma pasta na raíz do projeto, que vou criar nomeando de <u>tmp</u>

```javascript
const path = require("path");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
```

Como eu estou usando o github para versionar o meu código, no momento que eu mandar meu projeto, o github vai ignorar a minha pasta, por ela ser vazia, então para resolver esse problema, eu crio um arquivo que vou chamar de <u>.gitkeep</u>, feito isso meu github não vai ignorar a pasta.

Agora vou criar uma nova constante que de fato vai armazenar os uploads, vou chamar a constante de <u>UPLOADS_FOLDER</u>, e vou apontar ela para uma pasta chamada <u>uploads</u>.

```javascript
const path = require("path");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");
```

Para fazer uploads eu vou utilizar uma biblioteca chamada <u>multer</u>, para instalar eu uso os seguintes comandos: `npm i multer`, e já vou importar no meu arquivo.

```javascript
const path = require("path");
const multer = require("multer"); //Aqui eu criei

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");
```

Vou agora criar uma constante que vou chamar de <u>MULTER</u>, que vai receber como valor um objeto, que vai conter uma propriedade já própria do multer, chamada `storage`.

```javascript
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");

const MULTER = {
  destination: TMP_FOLDER, //Aqui eu disse qual vai ser o destino do meu arquivo
  storage: multer.diskStorage({
    filename(request, file, callback) {
      //Criei um função que vai me retornar o nome do meu arquivo
      const fileHash = crypto.randomBytes(10).toString("hex"); // O que eu fiz foi criar um identificador único, para evitar que tenha arquivos iguais.
      const fileName = `${fileHash}-${file.originalname}`; // Criei um nome único para que evite nomes de arquivos iguais.

      return callback(null, fileName); //Por fim retornei uma callback com o nome do arquivo
    },
  }),
};
```

Agora vou exportar a minha pasta temporária, a minha pasta de upload e meu multer:

```javascript
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");

const MULTER = {
  destination: TMP_FOLDER,
  storage: multer.diskStorage({
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
```

E pronto temos nosso upload configurado.

# DiskStorage

Agora que já temos nosso arquivo de upload configurado, eu vou criar agora um arquivo que vai ter duas funções. Uma função que vai salvar os arquivos e outra que vai deletar os arquivos.

Precisamos dessas funções, para que possamos verificar na hora que o usuário mandar a foto, se ele já tiver uma foto, precisamos deletar a antiga e colocar a nova no lugar. Vamos criar arquivos diferentes para cada funcionalidade.

Primeiro vou começar criando uma pasta chamada <u>providers</u>, e vou criar um arquivo que vou chamar de <u>DiskStorage.js</u>.

Vou começar importando a funcionalidade `fs` que já é própria do node para podermos lidar com a manipulação de arquivos. Vou importar também o `path` para lidarmos com os diretórios. E vou importar o <u>uploadConfig</u> que está dentro da minha pasta de configurações.

```javascript
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");
```

Agora vou criar uma classe com o mesmo nome do arquivo, que vai ter a função de <u>salvar o arquivo</u>, então vou fazer que no momento que a imagem chegar no meu backend, ela fique na minha pasta temporária <u>TMP_FOLDER</u> e no momento em que o usuário salvar, ela seja colocada na minha pasta de upload <u>UPLOADS_FOLDER<u>.

```javascript
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename( // A função 'rename' faz com que o arquivo seja movido de uma pasta a outra.
      path.resolve(uploadConfig.TMP_FOLDER, file) // Então primeiro eu movi a imagem para a minha pasta temporária.
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) // E depois movi ela para a pasta de 'uploads'.
    )

    return file; //E aqui retornei todos os dados desse arquivo.
  }
}
```

Agora vou criar a minha função de deletar:

```javascript
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); //Aqui eu peguei o arquivo que estava dentro da minha pasta de uploads

    try {
      //Fiz um tratamento de erro
      await fs.promises.stat(filePath); //Se não tiver nenhum problema eu pego o arquivo
    } catch {
      return; //Se tiver algum erro, eu paro a aplicação
    }

    await fs.promises.unlink(filePath); //E por fim eu deleto o meu arquivo
  }
}

module.exports = DiskStorage;
```

# Manipulando arquivos no NodeJs

Para manipularmos aquivos no node podemos usar o módulo `fs` do node, esse módulo ele permite que a gente manipule os arquivos. Umas das funções que utilizei foi a de renomear ou mover o arquivo `rename()`. Esse processo pode levar algum tempo, ainda mais dependendo do tamanho do arquivo, por isso é muito importante que seja feito em uma função assíncrona. Por isso eu usei a `promises`: `await fs.promises.rename()`, para que o js entenda que ele tem que esperar esse resultado para seguir adiante.

Para a função 'rename' eu paço dois parâmetros, que são:

- Aonde o arquivo está
- Aonde eu quero levar o arquivo

Eu usei uma outra função chamada `path`, ele tem uma função que se chama `resolve()`, que tem como objetivo, resolver uma sequencia de segmentos de caminho para um caminho absoluto. Porque dependendo do sistemas operacional, os caminhos eles podem mudar, e o 'path' ele consegue automaticamente resolver essas mudanças para mim.

Usei também uma outra função chamada `stat()`, que tem como funcionalidade, mostrar o status do arquivo. E por isso coloquei ele dentro de um `try()`, porque se o arquivo ele não esteja disponível para ser mudado de lugar, eu já capturo esse erro, e já paro a aplicação.

E por fim eu tenho uma função chamada `unlink()`, e ela basicamente remove o arquivo.

# Carregando imagens

Vou adicionar agora a função de carregar a imagem. Para isso lá no meu arquivo de rotas, na rota de usuário, eu vou colocar um `patch`, que é usado para quando eu quiser atualizar um campo específico. Diferente do método `put`, que é usado para atualizar todos os campos.

A estratégia que vou usar vai ser não colocar o arquivo dentro do banco de dados, porque o arquivo é muito pesado, por isso eu vou colocar ela em uma pasta específica, e dentro do banco eu vou adicionar somente a referência.

```javascript
const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated); //No momento passei a rota que vai se chamar 'avatar', e passei o meu 'middleware de autenticação'

module.exports = usersRoutes;
```

Agora vou importar o meu `multer` para que eu possa carregar a imagem. Vou importar também meu <u>uploadConfig</u>, e vou criar uma constante chamada <u>upload</u> passando para ela a função `multer(uploadConfig.MULTER)`, que é as configurações do meu 'multer'.

```javascript
const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER); // Aqui eu inicializei o MULTER dentro da minha constante 'upload'.

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated);

module.exports = usersRoutes;
```

Agora para a minha rota, após passar pelo meu middleware, eu vou adicionar a minha constante utilizando uma função chamada `single()` porque eu quero carregar um arquivo somente, e passo para ele o nome do campo, que vou nomear de 'avatar' mesmo, e na frente eu vou colocar um controller que vai buscar por esse arquivo. Só que por enquanto eu vou colocar uma função que vai me retornar o nome do arquivo.

```javascript
const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);

module.exports = usersRoutes;
```

Agora lá no insomnia eu vou criar uma nova request para a rota <u>User</u> que vou chamar de <u>Avatar</u> mesmo. Só que dessa vez eu não quero enviar propriedades no corpo da minha requisição, eu vou querer enviar um arquivo, e para isso eu escolho a opção <u>Multipart<u>.

Com isso eu coloco o nome do arquivo e no próximo campo, eu clico na seta e escolho a opção <u>file</u>, e envio uma foto do meu computador mesmo. E no meu terminal eu espero aparecer uma mensagem com o hash que criamos e o nome do meu arquivo.

E agora se eu for na pasta <u>tmp</u>, eu vou ver a minha imagem salva lá. Agora preciso fazer alguns ajustes que passaram despercebidos, no meu arquivo <u>upload.js</u>, eu vou corrigir o seguinte código `const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");`, e dentro da minha pasta <u>tmp</u> eu vou criar a pasta chamada <u>uploads</u>. Porque vai ser nessa pasta que vai ficar armazenado a imagem.

# Salvando imagem no banco de dados

Eu vou fazer uma funcionalidade, na onde eu vou pegar a imagem que está na pasta temporária, e vou levar para a pasta de <u>uploads</u>, e vou fazer com que o endereço da imagem fique salva no campo de <u>avatar</u> do usuário.

Para isso eu vou criar um controller, que vou chamar de <u>UserAvatarController.js</u>. Já vou começar criando a minha classe, que vai ter o mesmo nome da pasta e já vou criar a exportação.

```javascript
class UserAvatarController {}

module.exports = UserAvatarController;
```

Vou criar também a função de <u>update</u> lembrando que é uma função assíncrona, e agora começo a criar a minha lógica:

```javascript
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id; //Peguei o id do usuário
    const avatarFileName = request.file.filename; //Peguei o arquivo que o usuário mandou

    const diskStorage = new DiskStorage(); //Instanciei meu arquivo que está as funções de salvar e deletar uploads

    const user = await knex("users").where({ id: user_id }).first(); // Peguei a tabela de usuário filtrando o usuário pelo id

    if (!user) {
      throw new AppError("Somente usuários autenticados podem mudar o avatar"); //Criei uma condição na onde verifica se o usuário existe ou não
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar); //Criei outra condição para verificar se o usuário já tinha foto, se ele tiver então eu pedi para deletar
    }

    const fileName = await diskStorage.saveFile(avatarFileName); //Salvei o novo arquivo que o usuário mandou.
    user.avatar = fileName; //Atualizei o campo de 'avatar' do usuário.

    await knex("users").update(user).where({ id: user_id }); //Atualizei na tabela de usuários o campo avatar, filtrando o usuário pelo id, para que não atualize todos os registros

    return response.json(user); //retornei um json com os dados do usuário atualizado.
  }
}

module.exports = UserAvatarController;
```

Agora vamos importar o nosso controller de avatar, instancia-lo e usar ele na nossa rota.

```javascript
const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controller/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserAvatarController = require("../controller/UserAvatarController"); //Importei meu controller

const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController(); //Instanciei ele, por ser uma classe

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update //Coloquei ele na minha rota
);

module.exports = usersRoutes;
```

Pronto agora nosso back está armazenando a imagem do usuário.

# Servindo Arquivos

Agora vamos criar uma rota para buscar a imagem no back-end. Para ficar mais organizado, vou criar uma pasta dentro do insomnia chamada <u>Files</u>, e dentro vou criar uma rota do tipo <u>GET</u> que vou chamar de <u>Avatar</u>.

Como padrão vou criar um novo environment, na onde vou criar meu <u>"RESOURCE": "files".</u> e na frente vou colocar o endereço da imagem que eu quero buscar.

No meu back end no meu arquivo raiz <u>server.js</u>, eu vou importar de dentro da minha pasta de configurações o <u>upload</u>, e vou usar ele no meu endereço de files, para buscar pela imagem.

```javascript
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload"); //Importe minha pasta.
const express = require("express");
const PORT = 3333;
const app = express();
const routes = require("./routes");

migrationsRun();

app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //Usei uma função própria do express que me permite mexer com arquivos estáticos.

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

# O que é API ResTful

As siglas <u>REST (Representational State Transfer)</u> Transferência Representacional de Estado. É um modelo de arquitetura e não é uma linguagem ou tecnologia de programação, que fornece diretrizes para que os sistemas distribuídos se comuniquem usando os princípios e protocolos WEB, como por exemplo, o protocol <u>HTTP</u>.

API RESTful quer dizer quando a API cumpre as diretrizes RESTFUL, algumas dessas diretrizes são:

- Client - Server = O cliente e o servidor deve estar separados.
- Stateless = cada requisição deve ter o necessário para o servidor entender e responder a requisição. O servidor não deve lembrar/armazenar estados.
- Layered System = O cliente acessa um endpoint sem precisar saber como é implementada.

# Cors

Vou agora instalar uma biblioteca importante para podermos conectar nosso backend com o nosso frontend, <u>CORS - Compartilhamento de recursos com origem diferentes</u> esse é o nome da biblioteca. Ele vai habilitar para que o nosso backend consiga entender as requisições do nosso frontend. Para instalar essa biblioteca eu utilizo o seguinte comando: `npm i cors`

E agora no meu arquivo de <u>server.js</u>, eu importo a instalação dele: `const cors = require('cors');`, e feito isso eu faço meu servidor usar o 'cors': `app.use(cors());`. E pronto, agora nosso backend consegue atender as requisições do nosso backend.
