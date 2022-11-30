## FRASES PARA ADICIONAR NO ANKIWEB

- package.json - pacote json
- framework - estrutura
- listen - ouço

# Node.js

## Iniciando um projeto com node.js

Para iniciarmos um projeto com o nodejs abrimos o terminal e digitamos o comando

```
cd <nome da pasta>
```

Isso vai criar uma pasta para mim, e depois dessa pasta criada, nós iniciamos o npm nessa pasta que vai trazer um arquivo para a nossa pasta chamada **package.json**

```
npm init -y
```

O package é um arquivo que traz informações do nosso projeto node.

```JSON
{
  "name": "api", //O nome do nosso projeto
  "version": "1.0.0", // Qual a versão
  "description": "", // Descrição do projeto
  "main": "index.js", // Qual o arquivo principal
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }, // Aqui podemos colocar scripts para automatizar alguma coisa.
  "keywords": [], //Podemos colocar palavras chaves
  "author": "", // Aqui o autor do projeto, nesse caso posso colocar meu nome
  "license": "ISC" // Aqui qual o tipo de license que vou usar para meu projeto
}
```

# EXPRESS

## Adicionando o Express

Agora que criamos nosso projeto, temos que fazer com que ele seja capaz de lidar com requisições, ou seja, ser capaz de receber e processar essas requisições e então devolver essas respostas para o usuário.

E para poder trabalharmos com isso, iremos usar o **framework Express**. Ele é um framework muito rápido e flexível. Para lidar com requisições web feitas pelo protocolo HTTP.

E para instalar ele, eu uso o npm direto pelo terminal do vscode, usando o comando:

```
npm install express --save
```

A partir daí eu tenho ele salvo como uma dependência no meu projeto.

> Essa é uma característica muito boa do node, que nos permite ir acrescentando os módulos que precisamos ao decorrer do projeto, diferente de outras tecnologias que já trazem muitas coisas, e que as vezes nem usamos.

## node_modules

Quando instalamos o express, um arquivo chamado node_modules, foi criado. Ela não existia antes, porque não tínhamos nenhum módulo instalado.

Nessa pasta vai ficar armazenado todos os módulos e bibliotecas que nossa aplicação está utilizando.

Ao acessar a pasta eu posso me perguntar o porque de tantas outras pastas. Essas pastas existem porque o express também depende de outras bibliotecas para existir, e ele traz todas as suas dependências para essa pasta.

Essa pasta acaba sendo muito pesada para a nossa aplicação, então podemos apagá-la e se por acaso precisarmos dela futuramente, é só instalarmos novamente, usando o comando:

```
npm install
```

E geralmente criamos uma pasta chamada `.gitignore` e adicionamos o **node_modules** dentro.

## Utilizando o Express

Uma boa prática é criarmos uma pasta chamada `src` e incluir dentro os arquivos, que eu quero manter separado dos outros arquivos de configurações do node como o .gitignore e os packages.

Feito isso eu crio um arquivo .js chamado `server.js` e dentro desse arquivo eu vou importar o express

```javascript
const express = require("express");
```

O que eu fiz foi puxar toda o pacote express que está dentro da pasta node_modules, e joguei para dentro da constante "express"

Depois de feito isso eu preciso inicializar o express:

```javascript
const app = express();
```

Agora eu preciso dizer para o express qual a porta, o endereço que ele vai atender as requisições, para isso o recomendado é criar uma variável informando a porta, para que caso eu tenha que mudar a porta eu mude somente na variável, e logo abaixo eu coloco um uma propriedade `listen`, para que meu expresse fique escutando tudo que está rolando na PORTA, para que ela receba as requisições.

```javascript
const PORT = 3333;
app.listen(PORT, () => {});
```

Pronto agora temos a base criada do nosso express, que ao todo fica:

```javascript
const express = require("express"); //Importamos o express

const app = express(); // inicializamos o express

const PORT = 3333; // Criamos uma porta de entrada para ele
app.listen(PORT, () => {}); // E colocamos uma escuta na porta que criamos para capturar as requisições.
```

## Executando o express

Para executarmos a nossa aplicações abrimos o terminal, e rodamos o seguinte comando:

```
node src/server.js
```

Nós podemos deixar a experiência de execução mais simples, criando um script de inicialização dentro do nosso package.json:

```JSON
"scripts": {
  "start": "node ./src/server.js
}
```

Agora toda vez que quisermos executar a nossa aplicação, basta escrever `npm start` no terminal

## Rotas e Métodos HTTP

A rota nada mais é do que o caminho entre o ponto A e o ponto B.

O meu ponto A pode ser o meu site, e meu ponto B é o servidor, e a rota que conecta os dois é a URL.

Existem padrões que nos permitem comunicar com a API do nosso site, para que ela possa saber o que ela tem que fazer e como tem que se comportar.

E é ai que entra os **Métodos de requisições**, também chamados como verbos HTTP, que são eles:

- GET = lEITURA - Quando queremos alguma informação do produto
- POST = CRIAÇÃO - Quando eu quero criar um novo produto
- PUT = ATUALIZAÇÃO - Para atualizar o valor de um produto
- DELETE = DELEÇÃO - Para deletar alguma informação do produto
- PATCH = ATUALIZAÇÃO PARCIAL - Quando eu quero fazer uma atualização específica, como por exemplo a foto do produto.

## Método GET

Para usarmos o método GET, usamos:

```javascript
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello word!");
});
// "/" é o endereço da rota, que nesse caso é o / a raiz da nossa API

const PORT = 3333;
app.listen(PORT, () => {});
```

A partir dessa função eu posso extrair duas informações muito importante:

- `request` = A requisição que foi feita, é através do request que conseguimos obter informações que estão sendo enviadas para a nossa API.
- `response` = O recurso que eu posso utilizar para fazer a resposta, naquele caso eu usei o `responde.send("hello word!")`, que vai enviar uma mensagem de resposta para a pessoa que fez a requisição.

> A função `.send()` ela envia para a resposta HTTP algo que você desejar, no caso do exemplo acima eu enviei um "hello word!", então toda vez que o usuário fizer a requisição da rota, eu vou mostrar a mensagem para ele.

## Route Params

É uma estratégia na onde conseguimos passar alguma informação como parâmetro para nossa rota.

Vou pegar como exemplo a rota que já estou usando:

```javascript
const express = require("express");

const app = express();

app.get("/message/:id", (request, response) => {
  response.send("Hello word!");
});
// Eu adicionei os : para ele entender que o que vem em seguida é um parâmetro, e eu dou um nome que eu quiser.

const PORT = 3333;
app.listen(PORT, () => {});
```

Caso eu queira recuperar a informação passada como parâmetro eu uso o `request.params.id`.

```javascript
app.get("/message/:id", (request, response) => {
  response.send(`Id da mensagem: ${request.params.id}`);
});
```

Eu posso colocar quantos parâmetros eu quiser deis de que seja separados por / e tenha os :

```javascript
app.get("/message/:id/:user", (request, response) => {
  response.send(
    `Id da mensagem: ${request.params.id}. Para o usuário: ${request.params.user}`
  );
});
```

Note que o `request.params` está se repetindo, e isso não é uma boa prática, o que podemos fazer para refatorar esse código é usar a **desestruturação de objeto**:

```javascript
app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`Id da mensagem: ${id}. Para o usuário: ${user}`);
});
```

Os params são usados para dados simples, não utilizamos ele para passar dados muito complexos.

O mais comumente usado é por exemplo, quando eu quero passar os dados de um produto. Então vamos supor que eu tenha uma rota para o produto `app.get("/product")`, eu eu queira passar o id do produto `app.get("/product/:id")`. Para assuntos mais complexos temos uma outra estratégia.

## Query params

Essa é uma outra estratégia, que também nos permite capturar valores e utilizar na lógica da nossa aplicação.

Diferente do route params que eu passamos ":", o query params nós passamos uma interrogação "?" e logo em seguida nos passamos o parâmetros, e atribuímos valores para ele com uma igualdade =.
Ex: https://enderecoservidor.com.br/users?page=2.

E se por acaso eu queira adicionar outro parâmetro, eu uso o &.
Ex: https://enderecoservidor.com.br/users?page=2&limit=10.

E qual a diferença entre o **route params** e o **query params**. É que quando passamos o valores pelo parâmetro de rota, os valores devem ser obrigatórios, então se na url não estiver os parâmetros todos certinhos, da um erro, e o navegador não encontra a rota, diferente dos query params, que deixamos esses valores vagos, não necessariamente eles precisam ser informados, então mesmo que na url não tenha aos parâmetros informados, a minha rota não é travada.

```javascript
app.get("/users", (request, response) => {
  const { page, limit } = request.query;

  response.send(`Page: ${page}. Limit: ${limit}`);
});
```

Note que agora eu não precisei colocar os parâmetros na frente da rota, eu simplesmente puxei de dentro da minha `request.query` o page e o limit.

## Nodemon

Toda hora que fazemos alguma alteração no código temos que fechar o servidor e abrir de novo para dar certo, e isso fica muito chato.

Para isso podemos adicionar um recurso que fica monitorando o nosso código, e quando acontece alguma alteração, ele automaticamente atualiza o nosso servidor. E para isso vamos instalar uma biblioteca chamada **nodemon**.

Para instalar usamos o comando:

```
npm install nodemon --save-dev
```

E talvez eu me pergunte o porque do `--save-dev`, é porque eu quero usar o meu nodemon somente para desenvolvimento, eu só quero usar o nodemon enquanto eu estiver desenvolvendo a minha aplicação, porque quando eu tiver com minha aplicação rodando online, eu não vou mais precisar do nodemon, pois ela vai ficar rodando direto.

É por isso que eu uso essa flag, para que o node, entenda que eu preciso do nodemon, enquanto eu somente estiver desenvolvendo.

Agora se eu entrar no package.json, eu vou notar que criou uma nova dependência, chamada `devDependencies`.

```JSON
{
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

Ela é chamada assim, porque ela vai nos ajudar no desenvolvimento da aplicação.

Depois de instalado, eu agora vou criar um script para ele, que eu chamar de "dev", só que dessa vez ao invés de colocar para iniciar com o node `node ./src/server.js`, eu coloco para iniciar com o nodemon:

```javascript
{
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js"
  },
}
```

E agora para iniciar, eu não uso mais o comando `npm install`, eu uso:

```
npm run dev
```

Dessa vez eu usei o `run` porque o start ele está como padrão, então os scripts seguidos precisam ter esse run antes.

## Insomnia

Ate agora só vimos o método GET, e sabemos que existem outros métodos, mas o que acontece é que o navegador por padrão, só aceita o método GET. Então para podermos usar os outros métodos, temos que usar uma ferramenta chamada **insomnia**

Para usar eu preciso acessar, o insomnia no computador.

## Método POST

O método POST é para criação de rotas. Então caso eu queira criar um rota de usuários eu utilizo o POST.

Quando usamos esse método, nós enviamos informações para ele, através do corpo da requisição. E podemos enviar de várias formas, e uma delas é através do objeto tipo JSON.

Então vamos supor que eu queira enviar informações básicas do meu usuário, como: nome, email e senha. Eu envio essas informações através de um JSON usando o insomnia.

```JSON
{
  "name": "Daniel Guimarães",
	"email": "daniel@gmail.com",
	"password": "123"
}
```

No momento nada acontece, porque eu somente enviei essa informações, agora eu preciso resgatar elas, através do código. E no código eu consigo pegar essas informações através do corpo (body) da requisição, usando um `request.body`, fazendo um requisição no corpo da minha API.

```javascript
app.post("/users", (request, response) => {
  const { name, email, password } = request.body;
  //Note que eu peguei de dentro do body da minha API, as informações que eu enviei como JSON.

  response.send(`Nome: ${name}. Email: ${email}. Senha: ${password} `);
});
```

Só que temos um problema, se formos no insomnia e darmos um send, provavelmente vai dar ERROR, isso acontece porque não informamos para o EXPRESS, que tipo de dados estamos usando como padrão, no momento estamos usando o JSON, e para isso precisamos informar que é esse tipo de dado que vai vim do nosso body da requisição.

Para isso, criamos uma linha, que vai informar isso:

```javascript
const express = require("express");

const app = express();
app.use(express.json());
//Note que aqui eu criei um comando informando que o nosso padrão de dados vai ser em JSON;

app.post("/users", (request, response) => {
  const { name, email, password } = request.body;

  response.send(`Nome: ${name}. Email: ${email}. Senha: ${password} `);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

Quando usamos o `send()` ele retorna um HTML, caso eu queira visualizar no insomnia, o dado em formato de JSON, eu mudo o sendo para `json()`;

```javascript
app.post("/users", (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
  //Com isso vai me retornar um formato visual em JSON.
});
```

E esse é o formato padrão enviado para uma API.

## Organizando a estrutura do projeto.

É normal que com o passar do tempo, o projeto que estamos codando, comece a crescer, e para que nada fique desorganizado, usamos um padrão de organização, para que possamos ter uma melhor produtividade e que não fiquemos perdidos, sem saber o que fazer.

Para começar criamos uma pasta dentro da pasta src, e dentro dessa pasta criamos uma pasta com a rota de usuário que criei, ex: **(./src/routes/users.routes.js)**. Com isso eu isolo a responsabilidade da minha aplicação.

Só que quando eu jogo meu arquivo para dentro da nova pasta, eu tenho que criar uma constante extraindo do express o routes;

```javascript
const { Router } = require("express");
//Extrai de dentro do express o routes.

const usersRoutes = Router();
//E criei uma constante inicializando o Routers.

usersRoutes.post("/users", (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});
```

Só que agora eu preciso expor essa rota para meu arquivo server.js, porque eu tirei a rota de usuário de lá, e com isso meu servidor não consegue chegar nele. Para isso eu crio uma linha de comando (`module.exports = userRoutes`), com isso eu estou falando que estou exportando o arquivo para quem quiser usar:

```javascript
const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post("/users", (request, response) => {
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});

module.exports = usersRoutes;
//Aqui estou exportando o arquivo para quem quiser usar na minha aplicação
```

O que podemos fazer para melhorar ainda mais nosso código, é criar um arquivo chamado **index.js**, para que dentro desse arquivo, esteja todas as rotas da nossa aplicação, fazendo com que nosso arquivo não fique tão poluído com tantas importações.

Dentro do arquivo eu importo novamente o Router:

```javascript
const { Router } = require("express");

const route = Router();
```

Depois de feito isso eu importo o a minha rota de usuário que eu chamei de **usersRouter**:

```javascript
const { Router } = require("express");

const usersRouter = require("./users.routes");

const routes = Router();
```

E agora eu coloco uma ultima linha de comando: `routes.use("/users", usersRouter)`,
ou seja, toda vez que o usuário requisitar a rota `/users`, ele será redirecionado para a roda do meu `usersRouter`.

```javascript
const { Router } = require("express");

const usersRouter = require("./users.routes");

const routes = Router();

routes.use("/users", usersRouter);
```

Com isso, no meu arquivo `users.routes.js`, eu posso deixar somente a "/" na minha requisição:

```javascript
usersRoutes.post("/", (request, response) => {
  //note que agora deixei somente a "/"
  const { name, email, password } = request.body;

  response.json({ name, email, password });
});
```

Depois de feito tudo isso eu preciso exportar, e para isso eu uso `module.exports = routes`, ou seja, toda vez que quero exportar alguma coisa, eu uso esse comando.

```javascript
const { Router } = require("express");

const usersRouter = require("./users.routes");

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;
```

E agora para importarmos a nossa rota no arquivo `server.js`, utilizamos:

```javascript
const express = require("express");
const PORT = 3333;
const app = express();
const routes = require("./routes");
//Aqui eu importei a rota.

app.use(express.json());
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

Note que eu disse apenas `"./routes"`, isso porque quando não passo mais nenhum parâmetro, ele automaticamente busca o arquivo chamado `index.js`.

E para que minha rota fique acessível, eu uso: `app.use(routes)`

## Controllers

Essa vai ser a parte que vai ficar responsável por processar as requisições da nossa aplicação, podemos dizer que é a parte inteligente da aplicação, o que de fato vai executar o que o usuário solicitou.

O primeiro passo é criar uma pasta chamada **controller**, dentro dela ao invés deu criar uma função, eu vou criar uma classe (`class`), com o mesmo nome da pasta e juntamente, para não esquecer eu já exporto essa classe.

```javascript
class UsersController {}

module.exports = UsersController;
```

Dessa vez eu optei por usar uma classe, porque dentro de uma classe, eu posso criar ou acessar diversas funções diferentes.

Mas não vamos colocar todas as funções no controller, porque uma boa prática nos diz que um controller deve ter no máximo cinco métodos.

Um dos métodos que ele pode ter é o **index** que utiliza o método GET, como por exemplo para listar vários registros, ou seja, listar todos os usuários cadastrados.

Outro método é o **show**, que também utiliza o método GET, só que dessa vez para exibir um registro específico, ou seja, um usuário específico.

Temos o método **create**, que vai utilizar o método POST, para criar um registro, ou seja, criar um novo usuário.

Temos também o método **update**, que usa o método PUT, para atualizar um registro.

E por ultimo o método **delete**, que usa o método DELETE, para deletar algum registro.

Esses são os cinco métodos, e se em algum projeto, precisar usar mais do que esses cinco, é recomendado criar um controller separado. E necessariamente não é necessário que ele tenha obrigatoriamente todos os cinco, ele pode ter somente 1 deles, e é normal isso acontecer.

## Utilizando o método create no controller.

Para começarmos, vamos utilizar o método **create**, para poder criar um registro, e para isso usamos:

```javascript
class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;
    //Então estou pegando informações do meu body;

    response.json({ name, email, password });
    //E estou repassando essas informações como JSON;
  }
}

module.exports = UsersController;
```

Agora eu preciso fazer com que toda vez que o usuário chamar pela a rota, ela chamar também esse controller, para isso eu preciso importar ele no meu arquivo **/users.routes.js**.

```javascript
const { Router } = require("express");
const UsersController = require("../controller/UsersController");
//Aqui eu importei ele.
const usersRoutes = Router();

const usersController = new UsersController();
//E como ele é uma classe, eu precisei criar uma nova estância para ele, na minha memória

usersRoutes.post("/", usersController.create);
//E agora no lugar da função, eu chamo a constante e atribuo a ela o método 'create'

module.exports = usersRoutes;
```

## HTTP Codes

A nossa aplicação está o tempo todo recebendo requisições e devolvendo respostas, e junto com as resposta podemos anexar o **HTTP codes** ou também conhecido como **status code**, isso faz com que ele adicione uma numeração na resposta, e isso representa o estado da resposta, e esses estados estão agrupados por faixas numéricas.

Quando temos a faixa de status code como 100, isso quer dizer que ele tem um estado **informativo**, ou seja, a solicitação foi aceita ou o processamento continua em andamento. por exemplo se o status code está em **102** quer dizer que está processando.

Temos também o status code de **200**, o que quer dizer **sucesso**, ou seja, a requisição foi bem sucedida. Quando temos o status code em **201**, significa, que foi **criado** com sucesso, geralmente utilizando o método POST após uma inserção.

Temos os status code na faixa do **300**, que são os de redirecionamento, quando está em **301** quer dizer que foi **movido permanentemente**, e o **302** quer dizer que apenas foi **movido**, ou seja, que não está disponível naquele endereço.

Temos os status **400**, que geralmente é **erro do cliente**, o que chamamos de **bad request**, ou seja, quando o cliente faz a requisição e esquece de fornecer algum dado importante. Temos a de **401**, que significa a de não autorizado, quando o cliente não tem autorização para acessar tal conteúdo. E temos o famoso **404**, que chamamos de **not found**, ou seja, quando o usuário quer entrar em uma rota que já não existe mais.

E temos o status **500** que é quando acontece algum erro no servidor, ele falhou ao concluir a solicitação.

Para eu utilizar ele na minha aplicação eu uso o comando de `status(número do status)`:

```javascript
class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    response.status(201).json({ name, email, password });
    //Como eu estou criando um usuário, eu usei o '201', que vai me retornar um 'criado com sucesso'
  }
}

module.exports = UsersController;
```

> Colocar o status é opcional, por padrão ele já vem com um status code de '200', o que significa 'Ok, está tudo certo!', e se for usar, sempre colocar o status que seja mais coerente com o contexto da requisição.

## Middleware

Para exemplificar bem o middleware, vamos supor que eu tenha um site, que possui várias funcionalidades, e uma dessas funcionalidades é a de cadastrar novos produtos. E no momento que o usuário, clica no botão de cadastrar o produto, a nossa aplicação manda uma requisição (**request**) para o back-end, na onde essa requisição é como um pacote, que contém as informações do produto que vai ser cadastrado.

Quando esse pacote chega no nosso back-end, ele é redirecionado para uma função que é responsável por pegar os dados de dentro do pacote, e cadastrar na base de dados. Mas suponhamos que temos um segurança que irá interceptar o pacote e verificar o que tem ali dentro, e isso na aplicação é o que chamamos de middleware, ele é uma função que irá **interceptar** a requisição, e ele tem acesso ao objeto de solicitação (**requisição**), o objeto de resposta (**resposta**), e ao destino dessa solicitação, com isso a próxima função middleware é comumente denotada de **next**.

Middleware podem:

- Executar qualquer código;
- Fazer mudanças nos objetos de solicitação e resposta;
- Encerrar um clico de solicitação-resposta;
- Chamar o próximo middleware na pilha;
- Entre outros...

### Utilizando os middleware

Como o middleware é uma função, o primeiro passo é cria-la:

```javascript
//Pasta './users.routes.js'

const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const usersRoutes = Router();

function myMiddleware() {}
//Aqui está a função criada.

const usersController = new UsersController();

usersRoutes.post("/", (request, response) => {});

module.exports = usersRoutes;
```

Dentro da função nós podemos extrair o `(request, response, next)`, o next sendo o destino, para onde o middleware deve seguir o fluxo:

```javascript
// pasta ./users.routes.js

function myMiddleware(request, response, next) {}
```

Existem duas formas de usarmos o middleware, a primeira é colocar ele antes do destino da rota:

```javascript
const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const usersRoutes = Router();

function myMiddleware(request, response, next) {}

const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create);
//Note que eu coloquei ele antes do destino da rota.

module.exports = usersRoutes;
```

Então agora a nossa requisição vai passar primeiro pelo middleware, antes de acessar o destino da rota. Mas tem um problema, porque se no nosso middleware não colocar uma função `next()`, ela vai fazer com que nossa aplicação nunca passe para a próxima etapa, que é o destino.

```javascript
function myMiddleware(request, response, next) {
  console.log("você passou pelo middleware");
  //Primeiro vai aparecer essa mensagem indicando que a requisição passou pelo middleware.

  next();
  //E depois a aplicação vai seguir seu fluxo normal;
}
```

## App ERROR

Uma coisa muito importante na nossa aplicação, é lidarmos com o tratamento de exceções, temos que usar uma estratégia que mesmo que nossa aplicação tenha erros, ela não pare por conta disso. E para fazer isso, vamos continuar mantendo a nossa arquitetura padrão, e para isso vamos criar uma pasta chamada **utils**, que vai conter nosso tratamento padrão. Então dentro da pasta 'src' vamos criar a pasta 'utils' e dentro dela um arquivo chamado **AppError.js**.

Ali dentro eu vou padronizar uma mensagem, que vai aparecer quando eu tiver algum tipo de erro.

Dentro do arquivo eu vou criar uma 'class', com duas variáveis, como o 'message' e 'statusCode':

```javascript
class AppError {
  message;
  statusCode;
}
```

E toda classe tem um construtor (`constructor`), que é carregada automaticamente quando a classe é estanciada, e como parâmetro pra ela, eu vou passar as duas variáveis que eu criei:

```javascript
class AppError {
  message;
  statusCode;

  constructor(message, statusCode) {}
}
```

Só que lembrando que eu já tenho por padrão um statusCode, que é o **200**, e para essa função, eu quero tratar o erro, e para o erro temos o status code **400**, **401** e **402**, então de começo vou tratar o de 400 que é **bad request**, e para isso eu digo para meu parâmetro que o status code vai ser = 400:

```javascript
class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {}
}
```

E agora eu preciso passar para minhas variáveis a mensagem e o status code, para isso eu uso o `this`, que vai referenciar as variáveis globais que eu criei, atribuindo a elas o valor que vier da função:

```javascript
class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
```

E agora por ultimo é só exportar:

```javascript
class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
```

E pronto, nosso primeiro tratamento de erro está pronto, agora é só importar, e vou importar para a pasta **UsersController.js**:

```javascript
const AppError = require("../utils/AppError");
//Aqui está o import.

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    response.json({ name, email, password });
  }
}

module.exports = UsersController;
```

E agora para tratarmos esse erro, nós vamos usar uma biblioteca chamada de **express async errors**, e para instalar essa biblioteca usamos os seguintes comandos no terminal:

```
npm install express-async-errors --save

```

E agora depois de instalada, eu vou no meu arquivo **server.js**, que vai ser o arquivo responsável por lidar com essas exceções, e no começo do arquivo, acima de tudo, eu vou importar o 'express async errors', e vou criar uma função para capturar o (error, response, request, next), e vamos precisar também importar o nosso "AppError", porque vamos precisar dele:

```javascript
require("express-async-errors");
//Aqui está o import.

const AppError = require("./utils/AppError");
const { response } = require("express");
const express = require("express");
const PORT = 3333;
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use((error, response, request, next) => {});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

E feito isso agora eu para a função eu faço uma condição na onde eu vou verificar se o erro foi do lado do cliente ou do servidor:

```javascript
app.use((error, response, request, next) => {
  if (error instanceof AppError) {
    //instanceof quer dizer a instância dele, ou seja, 'se' a estância dele for do lado do usuário então faz..
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);
  //Caso eu queira debugar o meu erro

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
  //Então caso o meu erro ocorra do lado do servidor, eu utilizo essa mensagem.
});
```

# SQL - Banco de dados

Um banco de dados nada mais é do que uma **coleção de dados**, como por exemplo, a lista telefônica do meu celular, é um banco de dados, na onde ela contem os meus contatos salvos no meu celular, na onde vai conter o nome e o contato da pessoa.

Para exemplificar como funciona a estrutura de um banco de dados, vamos imaginar como exemplo uma loja de roupas, essa loja essa possui um banco de dados, dentro desse banco de dados temos **tabelas**, e o objetivo das tabelas, é organizar nosso banco de dados.

Cada tabela vai armazenar um assunto, então vamos ter uma **tabela de clientes, de produtos e de vendas**, então as tabelas existem dentro do banco de dados, para organizar os dados por diferentes assuntos, e dentro de cada tabela dessa, podemos ter vários registros.

As tabelas, elas tem que possuir um nome, bem específico, para nomear a tabela com sua respectiva responsabilidade. Dentro da tabela temos linhas, e nas linhas vamos ter o **nome da coluna** e o **tipo de dado** que pode ser um número, um texto, uma data, etc..

Esse banco de dados composto por tabelas, colunas e linhas, tem um nome e se chama **banco de dados relacional**. Ele se chama assim, porque dentro do banco de dados, criamos **relações**, ou sejam, se um usuário quer cadastrar um a nota, isso faz com a nota seja criada por um usuário, e dentro do banco de dados eu vou fazer essa relação acontecer.

Cada tabela ela possui um **id**, o que faz com que ela tenha um registro único, o que nos permite sempre que quisermos excluir ou atualizar um registro específico, isso facilita nossa vida. E do lado do id temos uma **chave primária**, que vai fazer com que nosso banco de dados tome o cuidado de nunca repetir o mesmo id, então se eu tento cadastrar o mesmo id eu vou ser barrado pelo banco de dados.

Quando queremos armazenar um tipo de dado em texto, usamos o **varchar**, isso indica que o tipo de dado daquele registro vai ser um texto, e se na frente do varchar possuir uma interrogação (**varchar?**) , isso quer dizer que aquele campo vai ser **opcional**.

Quando queremos armazenar um tipo de dado em data, usamos o **date**, isso vai indicar que o tipo de dado quele registro vai ser uma data.

## Conectando com o banco de dados

Nesse projeto eu vou utilizar o banco de dados relacional chamado **SQLite**, e tudo que vamos aplicar nesse banco de dados, serve também para qualquer outro tipo de banco de dados relacional.

Para começarmos a usar, primeiro devemos fazer a instalação do sqlite, usando o comando:

```
npm install sqlite3 sqlite --save
```

Feito isso agora dentro da minha pasta **/src**, eu vou criar uma pasta chamada **database**, e dentro vou criar outra pasta chamada **sqlite**, e dentro dessa pasta vou criar um arquivo chamado **index.js**, para que sempre que eu queira chamar pelo arquivo eu não precise colocar o nome do arquivo, porque automaticamente já busca por um arquivo chamada index.

E agora eu vou importar o sqlite dentro do meu arquivo:

```javascript
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
```

Depois de importado eu vou criar uma função assíncrona, porque quando carregarmos a nossa página, a api vai fazer a conexão com o banco de dados, e isso leva um certo tempo, por isso utilizamos o assíncronismo:

```javascript
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function sqliteConnection() {
  const database = await sqlite.open({});
  //O open() é para abrir uma conexão,
}
```

dentro da propriedade `open()`, cou colocar primeiro aonde eu quero salvar o meu banco de dados, e para isso eu uso a propriedade `filename:`, e dentro dessa propriedade eu coloco onde meu banco vai ser salvo, e eu quero que ele seja salvo direto na raiz da minha pasta (/database), e para isso eu poderia usar:

```javascript
async function sqliteConnection() {
  const database = await sqlite.open({
    filename: "../../database";
  });
}
```

Mas fazendo dessa forma eu teria um problema, porque dependendo do meu ambiente, essa navegação por pasta é diferente como por exemplo no windows, e isso pode quebrar minha aplicação, e por isso eu uso uma biblioteca que ja é própria do node, que é o **path**. O path ele vai resolver os endereços de acordo com o ambiente, e para isso eu primeiro importo a biblioteca e utilizo ele:

```javascript
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    //aqui eu usei uma propriedade que vai resolver pra mim a questão dos endereços (resolve()).
    //Depois eu adicionei uma propriedade (__dirname), que vai fazer com que ele identifique automaticamente aonde eu estou dentro do meu projeto.
    //Com isso eu voltei uma pasta "..", e agora estou dentro da pasta raiz (database) e adicionei o arquivo "database.db".
  });
}
```

Agora eu preciso dizer qual vai ser o drive de conexão que eu vou utilizar, e o drive que eu vou utilizar é o que eu baixei junto com o 'sqlite', chamado 'sqlite3', ele vai ser o drive de conexão com meu banco de dados e depois de feito isso eu exporto a minha função.

```javascript
async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
    //Aqui eu informei qual vai ser meu driver.
  });

  return database;
}

module.exports = sqliteConnection;
```

E agora eu vou usar essa conexão, la minha pasta '/server.js', primeiro eu importo e depois eu uso:

```javascript
require("express-async-errors");

const database = require("./database/sqlite");
//Aqui eu importei.
const AppError = require("./utils/AppError");
const express = require("express");
const PORT = 3333;
const app = express();
const routes = require("./routes");

database();
//Aqui eu estou executando meu banco de dados.

app.use(express.json());

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

## SGBD

Quando clicamos no nosso arquivo do banco de dados, pelo vscode não conseguimos visualizar nada, e para podermos visualizar, temos que usar um sistema **SGBD - Sistema gerenciador de banco de dados**, nada mais é do que uma ferramenta que nos ajuda a visualizar o que tem dentro do banco, incluir registro, deletar, ver a estrutura, e ferramenta que vamos usar é o **beekeeper**.

Depois de acessar o beekeeper, vamos criar nossa primeira tabela de usuário, para criar uma tabela usamos: `CREATE TABLE users ()`, pronto a tabela de usuário está criada, agora dentro do parênteses colocamos, o que vai dentro da tabela.

Um padrão que devemos seguir para criar nome de tables é sempre criar em **letras minúsculas** e sempre no **plural** porque vamos lidar com muitos registros.

E agora vamos criar a primeira coluna, que vou chamar de id, ela vai ser do tipo `INTEGER` e vai ter uma chave primária `PRIMARY KEY`.

```SQL
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT
)
```

Agora tenho a primeira coluna, e como essa coluna possui uma chave primária, isso vai fazer com que esse id seja único e impeça de se repetir dentro do banco de dados. e o AUTOINCREMENT vai fazer com que gere um id automaticamente, sem que eu tenha que me preocupar com de ficar adicionando um id manualmente para cada usuário.

Agora eu preciso criar as colunas de (nome, email, senha, avatar, data de criação, e data de atualização), para o nome, o email, a senha, e o avatar eu vou criar um campo do tipo `VARCHAR` que é um campo que vai receber um texto, já para a criação e a atualização, eu vou criar um campo de `TIMESTAMP`, que vai receber uma data:

```SQL
CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR,
	email VARCHAR,
	password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)
```

Note que na coluna de 'avatar', ela possui um `NULL`, isso quer dizer que o campo vai começar com um valor nulo, isso porque nem todos os usuários vão optar por um avatar, e temos que colocar essa propriedade porque por padrão o banco precisa de um registro.

Já nas colunas de 'created_at' e 'update_at' temos um `DEFAULT CURRENT_TIMESTAMP`, isso quer dizer que por padrão (default) vamos ter uma data corrente, que vai ser inserida automaticamente nessas colunas, para que não nos preocupemos em adicionar uma data manualmente.

## SQL - Structured Query Language

> SQL não é um banco de dados, por mais que eu veja alguns bancos de dados com esse nome, como por exemplo: MySQL..

Traduzida para o português podemos dizer que SQL é uma _linguagem de consulta estruturada_, ou seja, é a linguagem padrão para banco de dados relacionais.

Dentro da linguagem SQL temos um _grupo de comandos DDL - Data Definition Language_ que possui comandos que vai definir a estrutura que vai armazenar nossos dados, como por exemplo:

- CREATE: Para criar nossa tabela
- DROP: Para deletar uma tabela
- ALTER: Para atualizar nossa tabela

> E o SQL por ser uma linguagem padrão, eu posso utilizar os mesmos conhecimentos em qualquer outro banco de dados. Sendo ele relacional, ele vai usar a mesma base que é o SQL.

## Alter

Com o comando `ALTER` eu consigo alterar uma tabela, caso eu queira alterar o nome da tabela, que no momento se chama _users_, e eu quero alterar para _clients_, para isso eu uso:

```SQL
ALTER TABLE users
RENAME TO clients
```

Agora vamos supor que eu queira adicionar uma coluna de _status_ na minha tabela, para isso eu uso o comando `ADD`:

```SQL
ALTER TABLE users
ADD status VARCHAR
```

E agora vamos supor que eu queira renomear o nome dessa coluna para _active_, para isso eu uso `RENAME COLUMN`:

```SQL
ALTER TABLE users
RENAME COLUMN status TO active
```

E se eu quiser deletar uma coluna, eu uso o comando `DROP`:

```SQL
ALTER TABLE users
DROP COLUMN status
```

## Comandos DML

Uma sigla muito famosa na área da programação é chamada _CRUD_

- C - Create
- R - Read
- U - Update
- D - Delete

> O CRUD é tão importante, porque qualquer aplicação possui essas quatro operações, e lembrando que eles não são comandos, eles são os pilares.

Os comandos respectivos de cada um é:

- C - Create -> INSERT
- R - Read -> SELECT
- U - Update -> UPDATE
- D - Delete -> DELETE

## Manipulando dados

Se eu quero inserir algo na tabela, eu uso `INSERT` e o nome da tabela:

```SQL
INSERT INTO users
()
```

Dentro do parênteses eu coloco as colunas que eu quero inserir valores dentro dela, que nesse caso eu tenho as colunas _name, email e password_, então eu coloco em ordem nos parênteses

```SQL
INSERT INTO users
(name, email, password)
```

Agora para que eu possa inserir valores dentro de cada coluna, eu coloco o comando `VALUES`:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')
```

> Lembrando que tem que ser sempre na mesma ordem, que foi passado as colunas.

E agora vamos supor que eu queira listar o conteúdo de uma tabela, e para isso eu uso o comando `SELECT`:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT * FROM users
```

Com isso ele vai me listar todos os usuários existentes na tabela 'users', que nesse momento vai ter somente 1 que é o que eu mesmo criei.

Agora vamos supor que o eu queira adicionar uma imagem de avatar para o usuário que eu criei, para isso eu uso o comando `UPDATE` e em seguida eu uso o `SET` para dizer qual a coluna que eu queira adicionar a imagem:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT * FROM users

UPDATE users SET
avatar = 'Daniel.png'
```

Mas ai temos um grande problema, porque eu não informei qual o usuário específico eu quero adicionar essa imagem, então por padrão ele vai adicionar para todos os registros.

Para que eu dia qual o usuário específico, eu uso o comando `WHERE` e passo o 'id' do registro:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT * FROM users

UPDATE users SET
avatar = 'Daniel.png'
WHERE id = 1
```

E se por acaso eu queira atualizar outras colunas, é só eu separar por vírgula, então se eu quero mudar o name:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT * FROM users

UPDATE users SET
avatar = 'Daniel.png',
name = 'Daniel Guimarães'
WHERE id = 1
```

No meu SELECT eu usei o asterisco que é para indicar que eu quero mostrar todas as colunas, mas caso eu queira mostrar alguma coluna específica, eu coloco o nome dela no lugar do \*:

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT id, name, email FROM users

UPDATE users SET
avatar = 'Daniel.png'
WHERE id = 1
```

E se eu quiser _deletar_ um registro, eu uso o comando `DELETE`, e uso o `FROM`, para dizer qual tabela eu quero usar como referência.

> E agora muito importante lembrar de especificar o registro com o comando WHERE para não correr o risco de deletar toda os registros da tabela.

```SQL
INSERT INTO users
(name, email, password)
VALUES
('Daniel', 'daniel@gmail.com', '123')

SELECT * FROM users

UPDATE users SET
avatar = 'Daniel.png'
WHERE id = 1

DELETE FROM users
WHERE id = 3
```

## Migrations

Imagina que eu queira usar minha tabela em outro servidor, imagina eu ter que fazer ela tudo de novo manualmente, isso é uma puta dor de cabeça. Para resolver esse tipo de problema temos uma estratégia chamada de _migrations_ para que eu possa _automatizar a criação de tabelas no meu projeto_

O primeiro passo é dentro da nossa pasta **./sqlite**, vamos criar outra pasta chamada de **migrations**, e dentro dessa pasta criamos um arquivo chamado **createUsers.js**.

Agora dentro dessa pasta eu crio uma constante chamada _createUsers_, e dentro dela eu coloco toda a estrutura da minha tabela de usuários e exporto:

```javascript
const createUsers = `
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  )
`;

module.exports = createUsers;
```

Depois de feito isso eu vou criar um arquivo na pasta '/migrations' chamado **index.js**, na onde eu vou importar o meu _createUsers_, e o meu _sqliteConnection_:

```javascript
const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");
```

E agora depois de importadas, eu vou criar uma função assíncrona que vai rodar as migrations:

```javascript
const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {}
```

Dentro do função eu vou criar um objeto que eu vou chamar de _schemas_, na onde vai conter as minhas tabelas, que no momento eu só tenho uma tabela.

```javascript
const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [createUsers].join("");
}
```

E agora eu executar minha função `sqliteConnection()` e vou usar um `then` para extrair meus schemas e vou tratar o erro com um `catch`.

```javascript
const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [createUsers].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationsRun();
```

E agora um detalhe muito importante é que quando, na hora que eu executar a migration, ela vai criar outra tabela pra mim, e no meu beekeeper eu já tenho essa tabela criada. Para resolver esse problema, eu coloco um comando `IF NOT` antes do nome da tabela, e com isso a tabela só vai ser criada se não existir nenhuma outra com o mesmo nome.

```javascript
const createUsers = `
  CREATE TABLE IF NOT users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  )
`;

module.exports = createUsers;
```

E agora lá na minha pasta '/server.js', eu importar a minha migrations no lugar da importação que eu já tinha feito do database.

```javascript
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
// Aqui eu importei a minha migrations
const AppError = require("./utils/AppError");
const express = require("express");
const PORT = 3333;
const app = express();
const routes = require("./routes");

migrationsRun();
//Note que eu também mudei o nome da minha função que está iniciando

app.use(express.json());

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

## SELECT

Agora que já temos nossa aplicação conectada com o banco de dados e temos uma tabela de usuários, já podemos começar a fazer uma funcionalidade de cadastrar um novo usuário.

Na pasta '/usersController.js' vamos importar nosso nossa conexão com o banco de dados, e logo em sequência eu vou pegar meu database, e vou me conectar com ele, e lembrando que nem sempre isso acontece no mesmo momento, por isso é importante usar o assincronismo:

```javascript
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
//Aqui eu importei minha conexão com o banco de dados

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    //E aqui eu criei a conexão da minha função com o banco de dados
  }
}

module.exports = UsersController;
```

Agora precisamos criar uma funcionalidade que vai verificar se os dados que ele passou realmente existe, então eu vou usar o método _GET_ para buscar dentro do meu banco de dados os usuários, e para isso eu vou usar o `SELECT`, para listar pra mim o usuário no bando de dados, e vou usar o `WHERE`, para verificar se o email do usuário é o mesmo do que foi passado para nós:

```javascript
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkerUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
      //Eu usei a interrogação, para que o a variável 'email', quando for passado um valor para ela, isso vai fazer com que substitua a interrogação.
    );
  }
}
```

Agora eu preciso criar uma condição que vai verificar pra mim _se_ o email já existe, se não existir _então_, eu vou retornar um json com status code de _201_, indicando que foi criado:

```javascript
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkerUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkerUserExists) {
      throw new AppError("Este email já está em uso.");
    }
    //Se o meu 'checkerUserExists' retornar verdadeiro, então eu vou disparar um erro, informando o usuário que o email dele já existe no nosso banco de dados.

    return response.status(201).json();
    //Se não eu retorno um json com as informações dele, juntamente com um status code de 201 informando ao servidor que foi de criação.
  }
}
```

## Cadastrando o Usuário

Agora precisamos inserir os dados dos usuários. Para isso eu vou pegar meu database e vou executar (`run`) uma inserção, usando o comando `INSERT INTO users () VALUE ()`, esse comando vai fazer uma inserção na tabela users, e nos parênteses eu vou colocar em quais colunas eu quero fazer a inserção, e no value eu coloco quais os valores que eu quero adicionar em cada coluna:

```javascript
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkerUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkerUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    //Note que eu usei uma propriedade 'run', que vai executar o que está dentro do parêntese, e dentro do parênteses, eu inseri nas colunas (name, email, password), um valor que vai ser passado pelo o usuário na requisição.

    return response.status(201).json();
  }
}
```

## Criptografando a senha do usuário

Nossa aplicação já está cadastrando novos usuários, mesmo temos um grande problema, porquê a senha está visível, e isso não pode acontecer. Para isso vamos instalar um programa, chamado _bcrypt_, e para instalar usamos os seguintes comandos:

```
npm install bcryptjs
```

E agora eu importo dentro da pasta _/UsersController.js_:

```javascript
const { hash } = require("bcrypt.js");
```

Agora eu vou criar uma variável que vai ter como valor a funcionalidade `hash()`, e para ela eu passo dois valores, a _senha_ e o _nível de complexidade_:

```javascript
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkerUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    const hashedPassword = await hash(password, 8);
    //Aqui eu criei a variável que vai fazer com que minha senha seja criptografada com um nível de complexidade 8, que já está de bom tamanho

    if (checkerUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
      //E aqui ao invés de passar a senha direta, eu usei a senha criptografada.
    );

    return response.status(201).json();
  }
}
```

## Atualizando usuário

Agora vamos criar uma rota para atualizar os dados do usuário. E para isso vamos criar uma nova requisição mas dessa vez com o método _PUT_ que é para atualizar, e como um parâmetro para a rota vamos passar o id do usuário. Ex: \_BASE_URL/\_RESOURCE/2 -> id do usuário.

> Lembrando que esse URL eu peguei exatamente igual a que está no insomnia, o que seria a mesma coisa de eu dizer 'http://localhost:3333/users/2', mas no insomnia transformei isso em variáveis.

E agora vamos criar a nova funcionalidade de _atualização de usuário_, criando uma nova função assíncrona:

```javascript
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkerUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    const hashedPassword = await hash(password, 8);

    if (checkerUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {}
  //Aqui está a nova função criada.
}
```

Agora dentro da função eu vou desestruturar pegando o nome e o email do corpo da requisição, e vou pegar também o id do usuário:

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;
  }
}
```

Agora eu vou estabelecer a conexão com meu banco de dados, e dentro do banco de dados eu vou buscar pelo usuário através do _id_:

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    //Estabeleci a conexão
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    //Busquei pelo usuário de acordo com o id
  }
}
```

Agora vou criar uma condição na onde vou verificar se o usuário já existe, se existir vou disparar um erro informando que o usuário já existe:

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }
  }
}
```

Agora vou criar uma outra condição para verificar se o email que o usuário está tentando atualizar, já existe no nosso banco de dados.

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("Este email já está em uso");
    }
  }
}
```

Se os dados do usuário passou por todas as condições, então eu vou atualizar o nome e o email, para os novos dados que ele passou:

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name;
    user.email = email;
  }
}
```

E agora eu vou atualizar esses dados lá no meu banco de dados, e vou retornar uma resposta em formato JSON:

```javascript
class usersController {
  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name;
    user.email = email;

    await database.run(
      `
    UPDATE users SET
    name = ?
    email = ?
    update_at = ?
    WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );
    //Tem que seguir a mesma sequência.
    //E o valor para o 'update_at' eu passei uma funcionalidade que vai passar a data e hora atuais.

    return response.json();
  }
}
```

Agora precisamos criar uma rota para essa atualização, para isso vamos na pasta '/users.routes.js', e vamos criar uma nova rota, com o método _PUT_ passando como parâmetro para a rota o _id_ do usuário:

```javascript
usersRoutes.put("/:id", usersController.update);
```

## Atualizando a senha

Quando vamos lidar com a atualização da senha, uma das estratégias mais utilizadas, é perguntar qual a senha atual primeiro, o que faz com que comprove que realmente é o dono que está trocando a senha.

Então o primeiro passo é criarmos uma condição que vai verificar se o usuário digitou a senha antiga, se ele não digitou então disparamos um erro informando ele que a senha antiga é obrigatória para mudar a senha:

```javascript
class usersController {
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    //Aqui eu adicionei o 'password' e 'old_password' que vai ser a antiga senha do usuário

    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        "você precisa informar a senha antiga para definir uma senha nova"
      );
    }
    //Aqui eu criei a condição na onde eu verifico se o usuário passou a senha antiga e a atual, caso ele não tenha passado a senha antiga, dispara o erro

    await database.run(
      `
    UPDATE users SET
    name = ?
    email = ?
    update_at = ?
    WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.json();
  }
}
```

Agora eu preciso criar outra condição que dessa vez vai verificar pra mim se o usuário passou a senha antiga e a atual, e se a senha antiga dele é realmente igual a que estava salva no banco de dados, se de tudo ocorrer bem eu atualizo a senha do usuário, e a passo para o banco de dados:

```javascript
const { hash, compare } = require("bcryptjs");
//Note que eu importei a funcionalidade 'compare', que vai comparar as senhas pra gente, mesmo ela estando criptografada.

class usersController {
  async update(request, response) {
    const { name, email, password, old_password } = request.body;

    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        "você precisa informar a senha antiga para definir uma senha nova"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      //Aqui eu fiz a comparação 'compare()' da senha antiga passa pelo usuário com a senha que já estava cadastrada no banco de dados do usuário.

      if (!checkOldPassword) {
        throw new AppError("A senha não confere com a senha antiga");
      }
      //Com isso eu criei uma condição na onde se a senha não fosse a mesma, seria disparado um erro dizendo para o usuário que a senha não confere

      user.password = await hash(password, 8);
      //E se de todas as condições deu verdadeiras, então eu atualizei a senha do usuário já criptografando.
    }

    await database.run(
      `
    UPDATE users SET
    name = ?
    email = ?
    password = ?
    update_at = ?
    WHERE id = ?`,
      [user.name, user.email, user.password, new Date(), id]
    );
    //Aqui eu passei a senha atualizada para o banco de dados.

    return response.json();
  }
}
```

## Datetime do banco de dados

Estávamos passando uma função do javascript `new Date()`, para a coluna _update_at_, mas o que estava acontecendo é que a forma como estava aparecendo estava zoada (1668538148325), não estava formatada como deveria estar (2022-11-15 19:25:06).

Então para resolver esse problema, eu vou fazer com que o próprio banco de dados, passe a data. Então no lugar da interrogação eu vou passar uma função chamada `DATETIME('now')`, então eu estou falando para o próprio banco de dados pegar a data de agora e passar para o 'update_at'.

```javascript
await database.run(
  `
    UPDATE users SET
    name = ?
    email = ?
    password = ?
    update_at = DATETIME('now')
    WHERE id = ?`,
  [user.name, user.email, user.password, id]
);
```

## Validando nome e email

Quando tentamos atualizar somente a senha, nós acabamos perdendo o nome e o email, que ficam com o valor de _NULL_ no banco de dados, isso porque na nossa função _usersController_ estamos atualizando o nome e o email, com os novos nome e email fornecidos pelo usuário, só que se o usuário não atualiza junto da senha o seu novo nome e email, isso faz com que retorne um valor vazio para as duas variáveis e isso faz com que no banco de dados apareça o NULL.

Para resolvermos isso é bem simples, vamos usar o operador `??`, que vai fazer com que se na hora que o `user.name` for atualizado, ele vai checar se tem algum valor ali dentro, se tiver ele vai atualizar para o novo nome, mas se não tiver nenhum valor, ele vai manter o nome que já estava na coluna _name_:

```javascript
user.name = name ?? user.name;
//Se o 'name' vier com algum valor, então atualiza, se ele não vier com nenhum valor (NULL), então mantém o mesmo nome
user.email = email ?? user.email;
//O mesmo se aplica ao email.
```

## SQL Query Builder

Query builder é um construtor de consulta. Ele permite que você construa instruções SQL independente do banco de dados utilizado. Os bancos de dados relacionais utiliza os mesmo padrões de linguagem que é o SQL, mas é natural que de um banco de dados para outro, existam algumas diferenças. Por isso que futuramente se eu precisar trocar de banco de dados, alguns códigos SQL não vão funcionar em outros bancos, e por isso precisamos criar os código de maneira independente do banco de dados, e é ai que entra a _Query Builder_.

O que ela faz é gerar códigos SQL para o banco utilizado. Então ao invés de escrever um código SQL específico para o banco de dados, eu vou escrever usando a sintaxe do query builder, e daí ele vai gerar o código de acordo com o banco que eu pedir para ele gerar. E com isso se futuramente eu mudo para outro banco de dados, é só eu dizer para o query o banco que eu estou usando atualmente, e ele vai gerar o código para o banco de dados que eu estou trabalhando no momento.

O query também possui uma outra vantagem, que é a de gerar um código bastante performático e bem estruturados e traz uma sintaxe mais resumida e enxuta.

## Instalando o Knex.js

O _knex_ é a query builder que vamos utilizar no nosso projeto, e para isso eu uso o comando:

```
npm install knex --save
```

## Configurando o Knex

Vamos agora configurar o knex, para que ele possa se conectar com nosso banco de dados. Para começarmos precisamos instalar os arquivos de configurações do knex. Para isso devemos usar o seguinte comando

```
npx knex init
```

Com isso o vai ser criado uma pasta (_knexfile.js_) contendo todas as configurações do knex, mas vamos fazer um limpa nessa pasta deixando somente o que vamos de fato usar, que vai ser o campo abaixo:

```javascript
module.exports = {
  //Note que aqui temos um objeto chamado 'development'
  development: {
    client: "sqlite3",
    //Temos o 'client' que vai nos informar a conexão com o nosso banco de dados, isso está acontecendo por meio do 'sqlite3'
    connection: {
      filename: "./dev.sqlite3",
      //Aqui temos onde o nosso arquivo está localizado no nosso banco de dados;
    },
  },
};
```

Mas seria muito legal ao invés de usarmos o local cravado de onde a pasta está, vamos usar o _path_, para que ele gerencie esse caminho pra gente, para que não ocorra nenhum erro com outros servidores, como windows, mac...

Então é só eu importar o path e usar ele na propriedade _filename_, e no final eu vou adicionar uma propriedade _useNullAsDefault:true_, que é uma propriedade padrão para trabalharmos com o sqlite:

```javascript
const path = require("path");
//Aqui eu importei o path;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
      //Aqui eu usei uma propriedade do path 'resolve', e como valor eu passei um '__dirname', que faz com que ele parta da pasta em que estamos, e daí eu falei pra ele acessar a pasta 'src', dentro dela a pasta 'database', e dentro dessa pasta o arquivo 'database.db'
    },

    useNullAsDefault: true,
    //Propriedade padrão para trabalharmos com Sqlite,
  },
};
```

Agora dentro da pasta _/database_, eu vou criar uma pasta chamada _knex_, e dentro dela um arquivo chamado _index.js_. E agora a primeira coisa que eu vou trazer para dentro desse arquivo, são as configurações que eu acabei de fazer no knex.

```javascript
const config = require("../../../knexfile");
//Aqui eu importei as configurações
const knex = require("knex");
//Aqui eu importei o knex
```

Agora eu vou criar a conexão, e por fim vamos exportar a nossa conexão:

```javascript
const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development);
//Aqui está a conexão.

module.exports = connection;
```

Pronto a nossa conexão com o banco de dados está feita.

## Migrations

É uma forma de _versionar a base de dados_, migrations trabalha na manipulação da base de dados: criando, alterando ou removendo. É a mesma coisa do GIT que usamos para versionar o nosso código, com commits, alterações e atualizações.

A vantagem disso é que vamos ter todo um histórico de alterações do nosso banco, ao invés de criarmos manualmente uma tabela ou alterar, a migration faz isso automaticamente pra gente. A migration ela cria uma tabela dentro do banco de dados, na onde vai ser armazenado toda as alterações de toda a nossa estrutura.

Uma migration, ela sempre vai possuir dois métodos o _UP_ e o _DOWN_:

- UP -> método responsável por criar ou alterar algo no banco de dados.

- DOWN -> responsável pelo rollback, ou seja, desfazer as alterações realizadas pela migrations.

## Migrations para notes

Com o knex nós também conseguimos implementar a ideia de migrations, para otimizar a criação de tabelas. Para isso primeiro eu preciso ir no arquivo _/knexfile.js_, e dizer aonde o knex vai armazenar essas informações.

Com isso eu crio um objeto chamado _migration_, e dentro dele coloco o diretório, que vai ser uma pasta que eu vou criar dentro da pasta _/knex_, chamada de _migrations_:

```javascript
const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },

    useNullAsDefault: true,
  },
};
```

E agora eu não preciso mais criar minha migration manualmente, porque o próprio knex cria ela pra mim automaticamente, isso acontece porque é o knex que está gerenciando a migration.

Eu só preciso executar no terminal, e vamos dar o nome de _createNotes_, porque vamos criar agora a tabela de notas:

```
npx knex migrate:make createNotes
```

Com isso foi criado um arquivo:

```javascript
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
```

Mas vamos fazer algumas alterações, e vamos deixar ela da seguinte forma:

```javascript
exports.up = (knex) => knex.schema.createTable("notes", (table) => {});
//Aqui é onde vamos fazer a criação da tabela.

exports.down = (knex) => knex.schema.dropTable("notes");
//Aqui deletamos a tabela, caso queira.
```

Agora vamos fazer a criação da nossa tabela:

```javascript
exports.up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    table.increments("id");
    //Aqui eu criei o 'id' da tabela
    table.text("title");
    //Aqui eu criei o titulo da tabela
    table.text("description");
    //Aqui eu criei uma descrição para a tabela
    table.integer("user_id").references("id").inTable("users");
    //Aqui eu criei o 'id do usuário' que vai ser no formato 'integer', que significa que vai ser números, com isso eu também criei uma referência ('reference()') ao 'id' da tabela ('inTable()') de 'usuário'.

    table.timestamp("create_at").default(knex.fn.now());
    //Aqui eu adicionei um 'timestamp', o que significa que essa coluna vai receber uma data e hora, e eu disse que o padrão ('default()'), vai ter uma função que vai fornecer a hora e a data atual ('knex.fn.now()')
    table.timestamp("update_at").default(knex.fn.now());
    //O mesmo se aplica a essa coluna.
  });

exports.down = (knex) => knex.schema.dropTable("notes");
```

Pronto agora criamos uma estrutura de tabela que diferente da migrations que criamos para a table a de users, na onde usamos o SQL puro, essa foi criado com o knex de maneira independente do banco.

Mas agora eu preciso executar essa migrations, para ela criar essa coluna lá no meu banco de dados, para isso eu rodo esse comando no terminal.

```
npx knex migrate:latest
```

E para ficar melhor ainda, vamos transformar esse comando em um _script_, nomeando de _migrate_:

```JSON
"scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js",
    "migrate": "knex migrate:latest"
  },
```

Agora toda as vezes que eu quiser adicionar uma tabela, eu uso comando `npm run migrate`

## NPX vs NPM

_Node Package Manager - NPM_ é o gerenciador de pacotes padrão para o Node.js, até porque assim que instalamos o node na nossa maquina, automaticamente ele também faz a instalação do npm. Também utilizamos o npm para _executar scripts_ e _bibliotecas instaladas_.

_Node Package Execute - NPX_ vem com o npm acima da versão **5.2.**. Ele nada mais é do que um executor de pacotes npm que pode executar qualquer pacote qe você quiser do registro npm sem sequer instalar esse pacote.

O npx ele é mais para executar pacotes e não usamos ele para instalar pacotes. Então, por exemplo, eu queira executar uma versão atualizada de uma biblioteca, o npx ele busca lá no registro do npm e executa ela no nosso projeto. Já o npm é mais para a instalação de pacotes e com ele também conseguimos executar pacotes, mas desde que esteja instalado no nosso projeto.

## Primary Key e Foreign Key

No nosso projeto nós usamos o knex para montar a tabela de notas, e alí vimos dois conceitos o de _chave primária_ e o de _chave estrangeira_.

A chave primária é o identificador único da tabela, o principal objetivo dele, é identificar o registro, para que cada um tenha seu próprio valor. E quando falamos de primary key, o _id_, é a estratégia mais utilizada para ela.

A chave estrangeira, é uma chave que é gerada em uma outra tabela. Quando temos uma chave, que não é gerada dentro da tabela, isso quer dizer que ela está vindo de fora, o principal objetivo da foreign key é _conectar tabelas_, no caso do nosso projeto, que queremos vincular uma tabela de notas a um usuário, então usamos a chave estrangeira para fazer essa vinculação.

## Cardinalidade

Uma coisa que o banco de dados relacional tem é o conceito de cardinalidade, que é a frequência que uma entidade se relaciona com a outra, ou a frequência que uma tabela se relaciona com a outra. Ela pode ser representada por letras e números, como um _M, _, 1\*,

## Migrations para links e tags

Dessa vez vamos criar agora as tabelas de links e tags, para isso eu vou criar primeiro uma migration para as tags, com isso eu rodo novamente o comando pra criar uma migration

```
npx knex migrate:make createTags
```

Pra isso como a estrutura vai ser bem idêntica a da tabela de notas, então eu copio a estrutura dela e colo na que vou criar de tags, e faço algumas mudanças.

```javascript
exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    //Aqui eu adicionei a funcionalidade 'notNullable()', que faz com que não aceite um valor de nulo 'NULL'
    table.integer("user_id").references("id").inTable("users");
    table
      .integer("note_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    //Essa funcionalidade faz com que ao o usuário deletar a tabela, ele delete junto com ela as tags, para que não fique tags flutuantes no nosso projeto;
  });

exports.down = (knex) => knex.schema.dropTable("tags");
```

Nossa tabela de tags está criada, agora vamos criar a tabela de links:

```javascript
exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("url").notNullable();
    table.timestamp("create_at").default(knex.fn.now());
    table
      .integer("note_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("links");
```

Agora eu executo minhas migrations com o comando que criamos o script `npm run migrate` e pronto, minhas tabelas vão ser criadas.

Temos um único problema, na onde a função `onDelete('CASCADE')`, por padrão ela vem desabilitada, para resolver isso, temos que ir no nosso arquivo raiz _knexfile.js_, e criar um objeto antes do _migrate_, chamado de _pool_.

O pool ele vai receber valores, e esses valores vão ser executado no momento que for feita a conexão com o banco de dados. Com isso vamos adicionar uma função chamada `afterCreate`, então logo após criar, eu consigo recuperar a minha conexão, e nessa conexão eu vou executar uma propriedade e uma callback function:

```javascript
const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
      //Aqui eu executei uma função na onde passei como parâmetro a minha conexão (conn) e uma callback (cb), a função ela vai executar (run()) na conexão uma linha de comando "PRAGMA foreign_keys = ON", que é para habilitar a funcionalidade 'onDelete('CASCADE')'.
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },

    useNullAsDefault: true,
  },
};
```

## Cadastrando Notas

Então lá no insomnia, vamos criar uma pastinha com o nome de _Notes_, qe vai ter uma requisição com o método _POST_, e o corpo como recebendo formatos em _JSON_ para a criação das notas.

feito isso eu crio um json de exemplo pra a minha rota que ainda não está criada

```JSON
{
	"title": "introdução ao Node.Js",
	"description": "Essa é uma nota de exemplo",
	"tags": ["node", "express"],
	"links": ["link1", "link2"]
}
```

O próximo passo agora é criar a rota, e para isso eu vou criar um novo _controller_, na onde eu vou chamar de _notesController.js_, dentro da pasta _/controller_

Agora dentro do arquivo eu vou importar o knex e vou criar a classe que vou chamar de _NotesController_, e dentro dela uma função assíncrona recebendo como parâmetro a requisição e a resposta, e também já vou exportar a classe:

```javascript
const kenex = require("../database/knex");

class NotesController {
  async create(request, response) {}
}

module.exports = NotesController;
```

Agora eu preciso pegar do corpo da minha requisição o _title, description, tags, links_, e vou usar como parâmetro o _user_id_ do usuário.

```javascript
const kenex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    //Peguei as informações do corpo da requisição
    const { user_id } = request.params;
    //E usei o id do usuário como parâmetro para a url
  }
}

module.exports = NotesController;
```

Agora eu vou cadastrar o id da nota, para que eu posso mais tarde recuperar essa nota para usar como referência para as tabelas de tags e links, e vou cadastrar usando o _knex_.

```javascript
class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });
    //Eu cadastrei a nota para que ela me gere um id da nota.

    const linkInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });
    //E aqui eu usei a funcionalidade 'map()' para percorrer por cada item que eu tenho, e para cada link eu vou retornar o id da nota, e vou mudar de link para url
  }
}
```

E agora eu vou pegar com o knex os links, que eu to pegando do corpo da requisição, e vou inserir o 'linkInsert':

```javascript
class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linkInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);
  }
}
```

E agora eu vou fazer a mesma coisa com as tags:

```javascript
class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = links.map((name) => {
      //Agora ao invés de percorrer pelos links, eu vou buscar pelos nomes
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
    //Aqui eu retorno a resposta em JSON
  }
}

module.exports = NotesController;
```

Agora eu vou lá na minha pasta _/routes_, e vou criar um outro arquivo chamado _notes.routes.js_, e vou copiar tudo que está no _user.routes.js_, e vou fazer apenas algumas modificações:

```javascript
const { Router } = require("express");
const NotesController = require("../controller/NotesController");
const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);

module.exports = notesRoutes;
```

Agora eu preciso ir no arquivo _index.js_, e importar a minha rota

```javascript
const { Router } = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
//importei a rota

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
//Criei a rota 'notes'

module.exports = routes;
```

## Exibindo nota

Agora que minha aplicação já está cadastrando a nota, vamos criar uma rota que exiba os dados das notas. e dentro do insomnia eu vou criar uma outra pasta chamada _show_, com o método _GET_. A na url como parâmetro eu vou passar o id da nota.

E agora eu vou ma minha pasta _NotesController_ e vou criar uma outra função assíncrona que vai se chamar _show_, e o primeiro passo vai ser recuperar o id da nota:

```javascript
class NotesController {
  async show(request, response) {
    const { id } = request.params;
  }
}
```

E agora vamos selecionar a nota baseada no id, com isso eu vou usar o knex, e uso a propriedade _where()_, que vai buscar algum valor específico para mim, que no caso vai ser o id, eu vou também a propriedade _first()_, para que ele pegue sempre a primeira, porque eu quero apenas 1 nota, e retorno a nota em si no formato JSON:

```javascript
class NotesController {
  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    //Busca pra mim na tabela 'notes', a nota com o primeiro id que você encontrar.
    return response.json(note);
    //E retorno a nota em formato json.
  }
}
```

E agora para de fato eu conseguir visualizar a rota, eu tenho que adicionar ela no meu arquivo _notes.routes.js_.

```javascript
const { Router } = require("express");
const NotesController = require("../controller/NotesController");
const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
//Aqui está a rota criada.

module.exports = notesRoutes;
```

Então quando eu der um send no insomnia, com o id da nota como parâmetro na url, vai ser me retornado os dados da nota, em formato json:

```JSON
{
	"id": 1,
	"title": "introdução ao Node.Js",
	"description": "Essa é uma nota de exemplo",
	"user_id": 2,
	"create_at": "2022-11-19 00:47:53",
	"update_at": "2022-11-19 00:47:53"
}
```

Agora eu posso ver com clareza todos os dados da nossa nota, mas eu quero que mostre também os links e as tags que estão vinculadas nessa nota:

```javascript
class NotesController {
  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    //Aqui eu estou pegando as tags relacionadas ao id da nota que ela está vinculada com o comando `where({ note_id: id })`, e estou ordenando elas pelo nome, ou seja, por ordem alfabética com o comando `orderBy('name')`
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");
    //Aqui se encaixa a mesma lógica feita nas tags.

    return response.json({
      ...note,
      //Estou passando 'tudo' referente ao note
      tags,
      links,
    });
  }
}
```

## Deletando uma nota

Agora vamos criar um rota para deletar uma nota, então la no insomnia vou criar uma nova requisição que eu vou chamar de _Delete_ só que dessa vez com o método _DELETE_.

Agora vou criar uma outra função assíncrona que eu vou chamar também de _delete_:

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {}
}
```

Agora pra mim conseguir deletar uma nota eu preciso pegar o id que vai vim como parâmetro da requisição, e com isso eu uso o knex para pegar a nota que está vinculada a esse id, e uso o método `delete()`, e retorno a resposta em JSON.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }
}
```

Agora eu preciso conferir se meu efeito de deletar em cascata está funcionando, então no momento que eu deletar uma nota, as tags e os links também tem que ser deletados.

Mas primeiro precisamos criar a rota, para isso eu vou no meu arquivo _notes.routes.js_, na onde está as rotas das minhas notas, e vou acrescentar a que acabamos de criar.

```javascript
const { Router } = require("express");
const NotesController = require("../controller/NotesController");
const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
```

Pronto agora eu vou lá no insomnia dou um send, e é para ter deletado a nota, e junto com ela as tags e os links.

## Listando notas

Agora vou criar uma rota para listar todas as notas cadastradas, inclusive vai ser a rota para pesquisar sobre uma nota.

No insomnia eu vou criar uma requisição que vou chamar de _index_, e ela vai ser com o método _GET_.

Feito isso eu vou no meu _NotesController.js_ e crio uma nossa função assíncrona, que vou chamar também de index,

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {}
}
```

Agora eu vou pegar as notas, e vou aplicar um filtro nela para que me mostre somente as notas criadas por esse usuário, e para que não apareça as notas de outros usuários, e além de filtrar pelo usuário, eu quero que ele me traga também ordenado por ordem alfabética.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { user_id } = request.query;
    //Aqui eu eu vou usar o 'query', porque dessa vez eu vou usar esse método para passar a requisição lá no insomnia.

    const notes = await knex('notes').where({ user_id }).orderBy('title');
    //Pega a tabela de notas, e me retorne a nota que está vinculada ao id do usuário passado na query, e ordena elas pra mim em ordem alfabética.

    return response.json(notes)
  }
}
```

Agora para eu conseguir acessar essa rota eu vou no meu arquivo _notes.routes.js_, e crio uma rota:

```javascript
const { Router } = require("express");
const NotesController = require("../controller/NotesController");
const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.get("/", notesController.index);
//Aqui como eu passei por uma query, eu uso somente a '/', eu não preciso colocar '/:user_id'.
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
```

## Operador like (filtrando a nota pelo nome)

Vamos implementar agora a funcionalidade de pesquisar pelo nome da nota, para isso vamos usar a funcionalidade `whereLike()`, ele nos ajuda a buscar valores que contenham dentro de uma palavra.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id } = request.query;

    const notes = await knex('notes')
    .where({ user_id })
    .whereLike('title', `%${title}%`)
    //Quando envolvemos um objeto literal dentro de duas porcentagens, isso vai dizer para o banco de dados: "olha eu quero que você verifica pra mim tanto antes e depois, ou seja, se em qualquer parte da palavra existir o que eu to pesquisando, traga pra mim.
    .orderBy('title');

    return response.json(notes)
  }
}
```

Agora se formos no insomnia e fazer uma requisição query com apenas uma frase do titulo, a nota já é mostrada, por exemplo, se eu tenho uma nota chamada 'introdução ao nodejs', se eu pesquisar somente pelo 'nodejs', a nota já vai aparecer

## Filtro whereIn (filtrando pelas tags)

Agora vamos filtrar as notas pelas tags, no código eu vou criar uma condição, _se_ existir tags, filtre pelas tags, ou _então_ filtre pelo nome.

E se de fato existir uma consulta por tags, eu quero enviar ela por lista, separadas por vírgula, e pra isso eu preciso converter ela de um texto simples para um vetor.

Para isso eu vou usar o a funcionalidade `split(',')`, com isso eu consigo transformar a tags em um array e usar um delimitador que é a vírgula. E vou usar um `map()` também para que percorra somente pelas minhas tags.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    return response.json(notes)
  }
}
```

Agora eu atribuo a variável _notes_, uma pesquisa pelas tags dentro da tabela de _tags_, com isso eu seleciono a tabela com o `knex()` e atribuo uma funcionalidade chamada `whereIn()`, e com isso eu eu passo como valor pra ela o nome das tags, e adiciono o filtro que eu acabei de criar para que ele compare se de fato as tags existem ou não;

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags').whereIn('name', filterTags);
      //Então pega pra mim o nome ('name ') das tags existente na tabela de 'tags' e filtra elas trazendo pra mim as tags existente dentro de um array e separadas por vírgula que é o que o 'filterTags' está fazendo.
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    return response.json(notes)
  }
}
```

Agora se eu der um sendo no insomnia com o nome das tags ele vai me trazer os dados da tag.

## Conceito de Inner Join (União de tabelas)

O _Inner join_ serve para unirmos tabelas, mas isso não quer dizer que as tabelas vão se unir fisicamente, mas sim selecionar duas tabelas, e mostrar os resultados de ambas unificadas, ou seja, em uma única consulta.

Digamos que tenhamos duas tabelas, a _tabela A - tags_ e a _tabela B - notes_, e daí eu quero unir essas duas tabelas. Com isso, o inner join vai verificar os registro em comum, entre as duas tabelas, e vai me devolver esses registros.

A conexão vai ser feita, quando temos valores em comuns entre tabelas, então um exemplo simples disso, é o _id_, ou seja, suponhamos que a tabela A tenha uma coluna chamada _note_id_, e nessa coluna vai conter o id da nota que a tag está vinculada, então esse vai ser o valor em comum entre as duas, porque uma nota está se conectando com a outra através do mesmo id.

Então resumindo o inner, ele vai buscar por valores em comuns entre diversas tabelas, e vai nos entregar um único registro com todos os valores unificados, para que possamos exibir ou manipularmos, e para que essa conexão ocorra, a tabela precisa ter colunas em comum, nesse caso pelo id.

E como isso vai ficar no código?. Para podermos unir vamos precisar de três valores, que são: _table, primary_key e foreign_key_. Então precisamos inicialmente do nome da tabela, a sua chave primária e a chave estrangeira.

> Um conceito muito importante, é o conceito de ambiguidade, ou seja, um erro causado por ter colunas com o mesmo nome. Para evitar que isso aconteça, precisamos usar o nome da tabela em que estamos pegando o registro, por exemplo, se eu quero usar o id da tabela de notas eu uso: `notes.id`, ou digamos que eu queira usar o id da nota que a tag está vinculada, pra isso uso: `tags.note_id`. Então note que o nome da tabela sempre vem em primeiro.

## Aplicando Inner Join

Quando fazemos uma consulta, pelo nome das tags, só é mostrado o que está na tabela de tags, e isso acontece porque estamos filtrando pela tabela de tags. Mas o que eu quero, é que no momento que fizermos a consulta filtrado por nome das tags, eu quero que mostre também o conteúdo da nota em que ela está conectada, e para isso precisamos fazer a união das duas tabelas, notes e tags.

Primeiro eu vou usar a propriedade `select([])`, para poder pegar a coluna que está se conectando com a tabela de notas. e dentro do array, eu vou passar os nomes das colunas, e sempre lembrando de passar com o nome da tabela primeiro.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id',
        ])
        //Note que passei o nome das colunas, acompanhada primeiro do nome da tabela.
        .whereIn('name', filterTags);
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    return response.json(notes)
  }
}
```

Agora eu vou usar o `where()` para filtrar as notas que sejam do id do usuário, que estou passando como requisição e também vou filtrar com o `whereLike()`, o título das tags para que seja semelhante ao que o usuário está pesquisando.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id',
        ])
        .where('notes.user_id', user_id)
        //Aqui eu estou buscando na tabela de notas, o id referente ao id que está sendo passado na requisição, então se na requisição eu passei o id 8, ele vai buscar a nota referente ao id 8
        .whereLike('notes.title', `%${title}%`)
        //Aqui eu fiz com que ele busque nos titulo da minha nota, algo semelhante ao que o usuário está pesquisando.
        .whereIn('name', filterTags);
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    return response.json(notes)
  }
}
```

E agora eu uso o `innerJoin()`, para conectar as duas tabelas, passando o nome da tabela, e qual os campos que eu vou usar para conectar elas, e vou ordenar isso pelo titulo em ordem alfabética com o `orderBy()`.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id',
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        //Então aqui eu me conectei com a tabela de notas, e peguei o id da nota, e dentro da tabela de tags, o campo que eu tenho em comum é o 'note_id'.
        .orderBy('notes.title');
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    return response.json(notes)
  }
}
```

## Map e Filter

Para fins de didáticas, vou criar uma constante com alguns objetos que vou denominar de _tags_:

```javascript
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "regex", note_id: 1 },
  { id: 4, name: "react", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 },
];
```

Vamos entender primeiro o `map()` é uma funcionalidade do js para percorrer cada elemento dentro de um array, e o map ele devolve um novo array. então vamos supor que eu queira criar um novo array com novos elementos que eu precise.

Quando eu uso o map, ele vai percorrer cada elemento dentro do array, e cada elemento vai ficar armazenado em uma variável auxiliar, que podemos dar o nome que quisermos, e com isso usamos uma arrow function, para manipular os elementos ali de dentro.

```javascript
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "regex", note_id: 1 },
  { id: 4, name: "react", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 },
];

const newArray = tags.map((tag) => {});
//Note que eu mapiei as tags, e cada elemento eu armazenei na variável 'tag', e agora vou usar uma arrow function para manipular os valores que se encontram dentro do array.
```

E agora eu vou retornar um novo objeto, então para cada elemento vai ser retornado um novo objeto. E eu quero retornar nesse objeto somente o nome da tag:

```javascript
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "regex", note_id: 1 },
  { id: 4, name: "react", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 },
];

const newArray = tags.map((tag) => {
  return {
    name: tags.name,
  };
  //Isso vai me retornar um objeto, com somente os nomes das tags.
});
```

Eu posso também, pegar tudo que tem dentro do array, e adicionar mais alguma coisa:

```javascript
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "regex", note_id: 1 },
  { id: 4, name: "react", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 },
];

const newArray = tags.map((tag) => {
  return {
    ...tag,
    //Chamamos de sprad operator, então ele pega tudo que tem dentro do array.
    Date: new Date(),
    //E agora eu adicionei um nome objeto, dentro do array.
  };
});
```

Então resumindo o map(), ele é para manipularmos um array, retornando outro array.

Vamos falar agora do `filter()`, ele é usado para filtrar algum elemento dentro de um array, ele também vai retornar um novo array, só que dessa vez filtrada. E da mesma forma eu tenho uma variável que vai armazenar cada elemento do array.

Então eu vou filtrar do meu array de tags, somente as tags que possuem o id = 1:

```javascript
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "regex", note_id: 1 },
  { id: 4, name: "react", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 },
];

const newArray = tags.filter((tag) => tag.note_id === 1);
//Filtra pra mim, e me retorne um novo array na onde eu vou ter somente as tags com o note_id seja igual a 1
```

## Obtendo notas das tags

Agora o que eu quero fazer é quando eu der um send eu vincular as tags também. Para isso primeiro eu vou criar uma constante que vai filtrar pra mim as tags que sejam igual ao id do usuário.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id',
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title');
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const userTags =  await knex('tags').where({ user_id });
    //Filtrei as tags pelo id do usuário.

    return response.json(notes)
  }
}
```

Agora eu vou criar uma outra constante que vou chamar de _notesWithTags_, que vai conter a minha nota com as tags. Com isso eu vou usar o `map()` para percorrer por toda a minha nota, e vou filtrar as tags verificando se o id da tag é igual igual ao id da nota, se for eu retorno o registro completo da minha nota e ainda acrescento as tags.

```javascript
class NotesController {
  async create(request, response) {..}

  async show(request, response) {..}

  async delete(request, response) {..}

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.user_id',
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title');
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const userTags =  await knex('tags').where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags)
  }
}
```

## Listando tags

Agora vamos criar uma lista de tags, porque em algum momento vamos ter que listar todas as tags, para servir como filtro de pesquisa.

Lá no insomnia, vamos criar uma pasta que vou nomear de _tags_, e dentro dela vamos criar uma requisição que vai se chamar _index_, e vamos usar o método _GET_.

No insomnia também vamos criar um novo RESOURCE, que vai se chamar de _tags_, e como parâmetro por enquanto eu vou passar o id do usuário.

Agora aqui no vscode eu vou criar um novo _controller_, que eu vou chamar de _TagsController.js_. Primeiramente eu vou importar o _knex_, criar a minha classe que vou chamar de _TagsController_ e já vou exportar ela para que eu não esqueça mais tarde.

```javascript
const knex = require("../database/knex");

class TagsController {}

module.exports = TagsController;
```

Agora vou criar uma função assíncrona que vai ficar responsável por listar todas as tags do usuário, essa função eu vou chamar de _index_.

```javascript
const knex = require("../database/knex");

class TagsController {
  async index(request, response) {}
  //Essa vai ser a função que vai ficar responsável por listar todas as tags do usuário.
}

module.exports = TagsController;
```

Agora eu vou pegar do parâmetro da minha requisição, o id do usuário, e vou pegar com o knex a minha tabela de tags, e vou filtrar as tags onde eu vou pegar somente as tags que tenham o id de usuário igual ao id passado na requisição, e com isso eu vou retornar as tags.

```javascript
const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;
    //Peguei da minha requisição o id do usuário passado como parâmetro

    const tags = await knex("tags").where({ user_id });
    //Eu criei uma constante que vai armazenar as tags filtradas pelo id do usuário, da tabela de 'tags',

    return response.json(tags);
    //Retornei a constante 'tags' que está armazenando as tags filtradas.
  }
}

module.exports = TagsController;
```

Agora precisamos adicionar um novo arquivo de rotas, então lá na nossa pasta _routes_, vamos criar um arquivo chamado _tags.routes.js_, e o arquivo vai ser uma cópia do _tags.routes.js_, na onde eu vou fazer algumas mudanças:

```javascript
const { Router } = require("express");
const TagsController = require("../controller/TagsController");
const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
```

Agora eu preciso ir no meu arquivo _index.js_, e adicionar a minha nova rota:

```javascript
const { Router } = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
//Aqui eu adicionei ao arquivo com a minha rota

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
//E então criei a rota que vai levar para o arquivo

module.exports = routes;
```

Pronto, agora se eu dou um send no insomnia é para me retornar todas as tags cadastrada pelo usuário especificado pelo id.

## Testando a aplicação.

É muito importante testarmos a aplicação do zero, para ver se está tudo dando certo, para isso eu vou excluir o arquivo _database.db_, e vou para a minha aplicação no terminal usando _ctrl+c_.

Depois de feito isso eu vou rodar o comando _npm run dev_ para criar de novo o meu arquivo _database.db_. O arquivo criado eu vou me conectar com o _beekeeper_, e é para ter criado a minha tabela de usuário.

Depois de feito isso eu preciso rodar as minha _migrations_ usando o comando _npm run migrate_, para criar as minhas tabelas de _tags, links e notas_.

Agora com tudo pronto eu vou criar meu primeiro usuário no insomnia, para testar a rota de criação, e se tiver tudo certo o usuário vai ser criado com sucesso.

Agora para testarmos a lógica de que o usuário não pode cadastrar com um email que já está em uso, para isso eu tento criar outro usuário só que com o mesmo email do anterior, na hora que eu der um sendo tem que ter aparecido a mensagem de erro dizendo "este email já está em uso".

Vamos testar agora a rota de atualização. Para isso eu vou tentar mudar o meu nome e meu email, e tem que dar um status code de _200_. agora vou testar mudar a minha senha, e para isso eu preciso informar a senha antiga, se eu não informar a senha antiga é para dar erro e aparecer a mensagem dizendo "Você precisa informar a senha antiga para definir uma nova senha". Mas se eu passar a senha antiga é para dar certo e apresentar um status code de _200_. E por fim se eu passar a senha antiga errada é para dar erro e dizer a mensagem "a senha antiga não confere"

Se tudo deu certo até aqui, então quer dizer que as rotas de usuário estão todas funcionando normalmente.

Agora vamos testar a rota de _notas_, para isso eu vou criar uma nova nota, e quando eu der um send é para dar tudo ok com um status code de _200_.
Vamos testar agora a rota que vai mostrar toda a nota do usuário _index_, lembrando que essa nota eu passei como uma _Query_, na hora que eu der um send, é para aparecer todas as informações da nota do usuário.

Nessa rota eu usei filtros de pesquisa para que o usuário opte por buscar pelo título ou pelas tags. Então se eu buscar pelo título para que as informações apareça e também se eu buscar pelas tags também é para que apareça.

Agora vamos testar a rota de exibir uma nota específica _show_, para isso eu passo o id do usuário como parâmetro e dou um send, e como resultado é para aparecer todas as informações da nota.

Agora vamos testar a rota de deletar uma nota específica _delete_, na hora que eu der um send é para que a minha nota seja deletada, e junto com a nota é para que as tags e links também sejam deletadas.

E tenho a rota de _tags_, e na hora que eu der um sendo é para que apareças todas as tags do usuário.

Se tudo até aqui funcionou, então quer dizer que a minha aplicação está completa.

## Conclusão e resumo de tudo que foi feito e aprendido.

Nessa aplicação nós desenvolvemos o beck-end de uma aplicação com o node.js, e aqui nós construímos uma API separada do nosso front-end, para que ela futuramente sirva para ser consumida em mobiles, desktops, web e isso é a vantagem de separar o beck do front.

Dentro do nosso beck-end criamos um arquivo chamado _server.js_ que é o arquivo principal da nossa aplicação, e quando falo isso não quer dizer que ele é o mais importante de todos, mas que ele vai ser o primeiro arquivo a ser executado quando rodarmos nossa aplicação. E dentro desse arquivo nós colocamos o _EXPRESS_, que é uma tecnologia que nos ajuda a lidar com requisições _HTTP_ como _POST, GET, DELETE, PUT.._.

E dentro do express aprendemos a fazer tratamento de exceções com o _Middleware_, na onde criamos um arquivo separado para exibir mensagens de erros para o usuário.

Dentro da nossa aplicação, criamos uma pasta de _rotas_ também. lá dentro do nosso servidor criamos uma porta que vai ficar ouvindo e prestando atenção em cada requisição, para que ele redirecione elas para as rotas (_routes_).

E nas rotas nós criamos uma conexão com os nossos _controllers_, na onde dentro da nossa rota criamos um endereço (_/user, /tags, /notes.._) que vai nos levar para cada controller, que é a parte do nosso beck que vai executar aquela funcionalidade.

E dentro de cada controller criamos funcionalidades para cada ação do cliente, como por exemplo o de cadastrar um usuário e também para atualizar um usuário já existente, entre outras. E dentro de cada uma dessas funcionalidades aprendemos a manipular o nosso banco de dados, e na nossa aplicação, utilizamos o _SQlite_ que é um _banco relacional_.

Dentro do banco aprendemos a manipular chaves primárias e estrangeiras, aprendemos a criar relacionamentos entre os bancos, a manipular os dados, etc. Para manipularmos os dados usamos o _SQL_ tudo manualmente, mas depois aprendemos a usar o _knex.js_ que é um _Query Builder_, que basicamente é uma biblioteca que gera códigos SQL de forma independente do banco, ou seja, se futuramente eu tenha que mudar de banco de dados, eu vou no arquivo de configuração do knex e mudo somente qual o banco de dados que estou usando e a conexão com ele.
