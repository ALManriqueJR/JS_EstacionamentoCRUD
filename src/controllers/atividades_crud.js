import { abrirGavetaDB } from "../database.js";


export const ListaAtividades = async (request, response) => {

    const db = await abrirGavetaDB();

    const atividades = await db.all(`SELECT * FROM atividades`);

    db.close();

    response.send(atividades);

};


export const CheckIn = async (request, response) => {

    const { placa } = request.body;

    const db = await abrirGavetaDB();

    const veiculo_exist = await db.get(`SELECT * FROM veiculos WHERE placa  = ?`, [placa]);

    if (veiculo_exist) {

        const check_in_epoch = (new Date()).getTime();

        const atividade = await db.run(`INSERT INTO atividades (id_veiculo, check_in) VALUES (?, ?)`, [veiculo_exist.id, check_in_epoch]);

        db.close();

        response.send({
            id_veiculo: veiculo_exist.id,
            check_in: check_in_epoch,
            message: `Veículo ${veiculo_exist.placa}: Entrou no estacionamento.`
        });
        return;
    }

    db.close();
    response.status(400).send({
        message: `Veículo não cadastrado. `
    });



};

export const CheckOut = async (request, response) => {

    const { placa, preco } = request.body;

    const db = await abrirGavetaDB();

    const veiculo_exist = await db.get(`
        SELECT * FROM veiculos WHERE placa = ?`,[placa]);

    if (veiculo_exist) {

        const still_in = await db.get(`
            SELECT * FROM atividades WHERE id_veiculo = ? AND check_out IS NULL`,[veiculo_exist.id]);

        if (still_in) {

            const check_out_epoch = (new Date()).getTime();

            const fechamento = await db.run(`
                UPDATE atividades SET check_out = ?, preco = ? WHERE id = ?`,[check_out_epoch, preco, still_in.id]);

            db.close();

            response.send({
                id_veiculo: veiculo_exist.id,
                check_out: check_out_epoch,
                preco: preco,
                message: `Veiculo ${veiculo_exist.placa} saiu do estacionamento` 
            });
            return;
            
        }

        db.close();
        response.status(400).send({
            message: `Veículo não realizou o check in. `
        });
        
    }


    db.close();
    response.status(400).send({
        message: `Veículo não cadastrado. `
    });

};


export const DeleteAtividade = async (request, response) => {

    const { id } = request.params;

    const db = await abrirGavetaDB();

    const data = await db.run(`
        DELETE FROM atividades WHERE id = ?
    `, [id]);

    db.close();

    response.send({
        id,
        message: `Atividade ${id} removida com sucesso.`
    });

};