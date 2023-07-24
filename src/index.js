import express from 'express';
import { testPing } from './controllers/test_api.js';
import { ListaVeiculos, AddVeiculos, UpdateVeiculos, DeleteVeiculos } from './controllers/veiculos_crud.js';
import { ListaAtividades, CheckIn, CheckOut, DeleteAtividade} from './controllers/atividades_crud.js';

const app = express();

app.use(express.json());

//TEST API (Is it up?)

app.get('/api/ping', testPing);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...");
});

//Test Done

//________ENDPOINTS VEICULOS___________

app.get('/api/veiculos', ListaVeiculos);

app.post('/api/veiculos', AddVeiculos);

app.put('/api/veiculos/:id', UpdateVeiculos); 

app.delete('/api/veiculos/:id', DeleteVeiculos);


//________ENDPOINTS VEICULOS___________

app.get('/api/atividades', ListaAtividades);

app.post('/api/atividades/checkin', CheckIn);

app.put('/api/atividades/checkout', CheckOut); 

app.delete('/api/atividades/:id', DeleteAtividade);