import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { log } from "console";


export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll({
        order: [
            ["id", "ASC"]
        ]
    });
    return res.json({ list })
}


export const add = async (req: Request, res: Response) => {
    let { title } = req.body;
    if (!title) {
        return res.status(500).json({ error: "Dados não enviados." });
    }
    const todoExists = await Todo.findOne({
        where: {
            title: title.toUpperCase()
        }
    });
    if (todoExists) {
        return res.status(500).json({ error: "Tarefa ja existe na base." });
    }
    const newTodo = await Todo.create({
        title
    })
    return res.json({ newTodo });
}


export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let title: string = req.body.title;
    let done: string = req.body.done;

    let todo = await Todo.findByPk(id);
    if (!todo) {
        return res.status(500).json({ error: "Registro não encontrado!" })
    }

    if (title) {
        todo.title = title;
    }
    if (done) {
        switch (done.toLowerCase()) {
            case "true":
            case "1":
                todo.done = true;
                break;
            case "false":
            case "0":
                todo.done = false;
                break;
        }
    }


    await todo.save();

    return res.json({
        item: todo
    })
}


export const remove = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let todo = await Todo.findByPk(id);
    if (!todo) {
        return res.json({ error: "Registro não encontrado." })
    }

    await todo.destroy();
    
    return res.json({});
} 