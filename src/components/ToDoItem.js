import { useState } from "react";
import { supabase } from "../lib/api";


const ToDoItem = ({ todo, onDelete }) => {
    const [taskCompleted, setIsCompleted] = useState(todo.is_complete);

    const toggleCompleted = async () => {
        const { data, error } = await supabase
            .from("todos") // from todos table
            .update({is_complete: !taskCompleted})
            .eq("id", todo.id)
            .single()
        
        if (error) {
            console.error(error)
        }
        setIsCompleted(data.is_complete); // sets the data to is_complete bool
    
    }; // end of ToDo()

    
    return (
        <div
            className={"p-3 max-h-14 flex align-center justify-between border"}
        >
            <span className={"truncate flex-grow"}>
                <input
                    className="cursor-pointer mr-2"
                    onChange={toggleCompleted}
                    type="checkbox"
                    checked={taskCompleted ? true : ""}
                />
                <span
                    className={`w-full flex-grow ${
                        taskCompleted ? "line-through" : ""
                    }`}
                >
                    {todo.task}
                </span>
            </span>
            <button
                className={"font-mono text-red-500 text-xl border px-2"}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
            >
                X
            </button>
        </div>
    );








}

