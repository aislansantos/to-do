import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg"

export interface TodoInstance extends Model {
    id: number;
    title: string;
    done: boolean;
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        set(value: string) {
            if (value === undefined || value === null) {
                return;
            }
            return this.setDataValue("title", value.toUpperCase());
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "todos",
    timestamps: false
});