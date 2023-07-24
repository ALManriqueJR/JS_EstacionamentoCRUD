- Snake Case p/ atributos do BD;
- Camel Case para variáveis e Postman Requests;
- Retorno em JSON;
- Node.js;
- Retornos do Protocolo HTTP para casos de Sucesso (como 200), e para Erros (como 400-499);


## EndPoints

*Veiculos*
	- ListaVeiculos -> GET localhost:8000/api/veiculos
	- AddVeiculos -> POST localhost:8000/api/veiculos
	- UpdateVeiculos -> PUT localhost:8000/api/veiculos/:id
	- DeleteVeiculos -> GET localhost:8000/api/veiculos/:id

Atividades
	- CheckIn -> POST localhost:8000/api/atividades/checkin
	- CheckOut -> PUT localhost:8000/api/atividades/checkout
	- ListaAtividade -> GET localhost:8000/api/atividades
	- DeleteAtividade -> DELETE localhost:8000/api/atividades/:id

## BD 

DER:

![[Pasted image 20230722132315.png]]

Outras info:
- Uso do driver sqlite3
- SQLite não tem tipo data, usado NUMERIC e realizado conversão utilizando Epoch (Unix Time)


## Escopo

- Entrada de veículos
- Saída de veículos
- Relatórios com datas (Epoch)