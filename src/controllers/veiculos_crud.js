
import { abrirGavetaDB } from "../database.js";


export const ListaVeiculos = async (request, response) => {

    const db = await abrirGavetaDB();

    const veiculos = await db.all(`SELECT * FROM veiculos`);

    db.close();

    response.send(veiculos);
    
};

export const AddVeiculos = async (request, response) => {

    const { modelo, placa, tipo, dono, obs } = request.body;
    
    const db = await abrirGavetaDB();

    const data = await db.run(`
        INSERT INTO 
            veiculos (modelo, placa, tipo, dono, obs) 
            VALUES (?, ?, ?, ?, ?)`,
            [modelo, placa, tipo, dono, obs]);

    db.close();

    response.send({
        id: data.lastID,
        modelo, 
        placa, 
        tipo, 
        dono, 
        obs
    });

};

export const UpdateVeiculos = async (request, response) => {

    const { modelo, placa, tipo, dono, obs } = request.body;

    const { id } = request.params;

    const db = await abrirGavetaDB();

    const veiculo_exist = await db.get(`SELECT * FROM veiculos WHERE id = ?`,[id]);

    if (veiculo_exist) {

        const data = await db.run(`
            UPDATE veiculos 
                SET modelo = ?, 
                placa = ?, 
                tipo = ?, 
                dono = ?, 
                obs = ?
            WHERE id = ?
        `,  [modelo, placa, tipo, dono, obs,id]);

        db.close();

        response.send({
            id,
            modelo,
            placa,
            tipo, 
            dono, 
            obs
        });
        return;
    }

    db.close();
    response.status(400).send({
        message: `Veículo não encontrado. `
    });

};

export const DeleteVeiculos = async (request, response) => {

    const { id } = request.params;

    const db = await abrirGavetaDB();

    const veiculo_exist = await db.get(`SELECT * FROM veiculos WHERE id = ?`, [id]);

    if (veiculo_exist) {

        const data = await db.run(`DELETE FROM veiculos WHERE id = ?`,[id]);

        db.close();
    
        response.send({
            id,
            message: `Veículo de registro ${id}. excluído com sucesso. `
        });
        
    }

    db.close();
    response.status(400).send({
        message: `Veículo não encontrado. `
    });

};