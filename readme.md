## API Documentation

API documentation is available in two different formats:

| Documentation type | Link                           |
| ------------------ | ------------------------------ |
| OpenAPI Swagger UI | http://localhost:8000/api-docs |

## Super Admin

"name": "SuperAdmin",

"email": "SuperAdmin@mail.com"

"password": "SuperAdmin123",

"role": "SuperAdmin",

### Enkripsi

"name": "SuperAdmin",

"password": "$2a$10$.O75CDdIpR8YLS6AknO.lehUhPgJ3VeQjfBw.52rQQx69tvrzCT96",

"role": "SuperAdmin",

"email": "SuperAdmin@mail.com"

## How To Use

```
npm seqielize-cli -g


npm init

npm install express

npm install --save sequelize

npm install --save pg pg-hstore

sequelize init

setting config => config.json

sequelize db:create

create table
sequelize model:generate --name Article --attributes title:string,body:text,approved:boolean

save model
sequelize db:migrate

add seeders
npx sequelize-cli seed:generate --name demo-user

add to db
sequelize-cli db:seed:all
```
