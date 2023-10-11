# API - FILMES

Esse é um desafio proporciado no curso explorer da rockseat, basi

## 🚀 Começando

Este projeto é uma aplicação em Node.js onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.

Um desafio proporcionado no curso explorer da rockseat

### 📋 Pré-requisitos

```
- Node v20.5.0
```

### 🔧 Instalação

Instalando dependencias

```
npm install
```

Criando Tabelas no banco de dados

```
npm run migrate
```

Iniciando o servidor

```
npm run dev
```

## ⚙️ Requisições

Cadastrando Usuario :

```
method: post
http://localhost:3333/users

```

Atualizando Usuario :

```
method: put
http://localhost:3333/users/id

```

Deletando Usuario :

```
method: delete
http://localhost:3333/users/id

```

## 🛠️ Construído com

- Express
- Knex
