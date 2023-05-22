# NICEPLANET_Back-End 🌎

## Introdução

O objetivo deste projeto é criar uma API que permite cadastrar e gerenciar os produtores e as propriedades de sua carteira de clientes de forma eficiente e centralizada.

## Rodar o projeto

> Para executar as rotas você pode utilizar um software de sua preferência ou, com o servidor rodando utilize a rota do swagger pelo navegador:
> 
> [http://localhost:3000/docs/](http://localhost:3000/docs/)
> 
> Utileze o script do BD MySQL: BD_Script



<br>

1) Com os dados do BD prontos, faça o clone do projeto utilizando: git clone https://github.com/Feliipe014/NICEPLANET_Back-End

```

git clone https://github.com/Feliipe014/NICEPLANET_Back-End

```

2) Entre na pasta do projeto e execute: npm install

```

npm install

```

3) Para iniciar o projeto execute: npm start

```

npm start

```

## Testando o sistema de rotas

1) Teste a rota inicial para verificar se esta rodando: Tipo(GET)

    [http://localhost:3000/](http://localhost:3000)

2) Acesse a rota login para obter a chave JWT e ter acesso as outras rotas, passe um user e um password: Tipo(POST)

> Copie o token que foi gerado, mas lembre-se o token tem uma validade de 300 segundos (5 minutos).

   [http://localhost:3000/login](http://localhost:3000/login)
    
 ```json

{
	"user": "teste",
	"password": "12345"
}

```

Não esqueça de definir o headers:

![image](https://github.com/Feliipe014/NICEPLANET_Back-End/assets/86086389/b9d18965-d27c-4e04-a635-0e34a34a327f)


3) Copie o "token" que foi gerado para acessar as demais rotas

    Exemplo de saída:
    
 ```json

{
	"auth": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NDUyMTc4MywiZXhwIjoxNjg0NTIyMDgzfQ.DnaKvQQXTYpb_e5mvSO22--Nu_3srOL6VcPM9SoapgI"
}

```

4) Configure a rota cadastro adicione ao headers "Content-Type" e "x-access-token"(onde vai o token):

![image](https://github.com/Feliipe014/NICEPLANET_Back-End/assets/86086389/08beae1d-bf56-43f9-9118-4f89291fb07e)

5) Acesse a rota cadastro e passe o json com os campos correspondentes: Tipo(POST)

    [http://localhost:3000/cadastro](http://localhost:3000/cadastro)
    
```json

{
	"nomeProdutor": "Exmplo", 
	"cpfProdutor": "11111111111",
	"nomePropriedade": "Fazenda exemplo",
	"cadastroRural": "456798"
}

```

   Uma menssagem de confirmação ira mostrar que a query foi feita:
   
![image](https://github.com/Feliipe014/NICEPLANET_Back-End/assets/86086389/a9a1adc6-892d-4f94-a737-8cdca491142a)

6) Configure a rota buscar adicionando novamente ao headers o token gerado:

![image](https://github.com/Feliipe014/NICEPLANET_Back-End/assets/86086389/f44980ca-830b-4b86-87b9-eb94dabf24e9)

7) Acesse a rota buscar usando o ID como parametro: Tipo(GET)

[http://localhost:3000/buscar?idProdutor=1&idPropriedade=1](http://localhost:3000/buscar?idProdutor=1&idPropriedade=1)

Exemplo de saída:

```json

{
	"produtor": {
		"idProdutor": 1,
		"nomeProdutor": "Charmy Pappitson",
		"cpfProdutor": "12345678901"
	},
	"propriedade": {
		"idPropriedade": 1,
		"nomePropriedade": "Touros Negros",
		"cadastroRural": 111111
	}
}

```
  
   
   Para procurar somente por um produtor ou por uma propriedade, basta apagar o campo que contem a passagem do mesmo, por exemplo:

[http://localhost:3000/buscar?idProdutor=1](http://localhost:3000/buscar?idProdutor=1)

Exemplo de saída:

```json

{
	"produtor": {
		"idProdutor": 1,
		"nomeProdutor": "Charmy Pappitson",
		"cpfProdutor": "12345678901"
	}
}

```

8) Para realizar o logout basta configurar a rota com o token que irá ser deletado e acessar a rota: Tipo(POST)

[http://localhost:3000/logout](http://localhost:3000/logout)

![image](https://github.com/Feliipe014/NICEPLANET_Back-End/assets/86086389/293321e5-713e-4cd2-bdfc-1065d60ec35f)

   Uma menssagem de confirmação aparecera na tela:
   
```json

{
	"message": "Logout realizado com sucesso!"
}

```




