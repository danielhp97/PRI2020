*PROJECTO PRI*

Criamos um **plataforma** que engloba três tipos de Users: **Admins**, **Produtores** e **Consumidores**.

Engloba um sistema de **partilha de recursos**, num formato próprio, de forma a funcionar como arquivo de informação.

Apenas os **Admins** e **Produtores** podem **upload de recursos**.

A todos os utilizadores é possível **ver**, fazer **download** e **comentar** sobre os recursos disponíveis.

A plataforma permite ao **admin gerir os utilizadores**. Cada utilizador pode gerir as **suas informações**.


Para este projecto **utilizamos**:
        
        - Uma **MongoDB no Atlas**, em servidores próprios;
        - 3 servidores: **Autenticação**, uma **API de Dados** e um para a **APP**.
        - Para a autenticação, usamos um **sistema de Tokens**.
        
**Credenciais de Admin:**

- username: admin
- password: admin

Além disso **é possível "Registar" utilizadores**, com menos permissões.


Para inicializar é necessário correr *npm install* em cada directoria (**app**,**auth**,**api**).

Depois, é só correr **cada servidor** com *npm start* e aceder através de um browser na porta **http://localhost:8003**.


Link da apresentação: https://docs.google.com/presentation/d/1LErtIaX76A5O2nDjQ0-8TAulsYulo7eSbRaISgtSqPk/edit?usp=sharing
