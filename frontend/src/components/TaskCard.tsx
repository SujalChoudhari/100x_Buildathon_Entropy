import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(true);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        opacity-30
        [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#75edff_100%)] p-2.5 h-[150px] min-h-[150px]  flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
            />
        );
    }

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="[background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#75edff_100%)] p-2.5 h-[150px] min-h-[150px] items-center flex flex-col rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
            >

                <p
                    className="
         border-none rounded bg-transparent text-black focus:outline-none
        "
                    // onBlur={toggleEditMode}
                    // onKeyDown={(e) => {
                    //     if (e.key === "Enter" && e.shiftKey) {
                    //         toggleEditMode();
                    //     }
                    // }}
                    // onChange={(e) => updateTask(task.id, e.target.value)}
                >
                    {task.content}
                </p>
                {/* <div className="flex  flex-end gap-2">
                    <div>
                        <Avatar>
                            <AvatarImage src={task.userpfp} />
                            <AvatarFallback>{task.userName}</AvatarFallback>

                        </Avatar>
                    </div>
                    <div>
                        <div className="mt-2 text-xs text-red-500">{task.role}</div>
                        <div className="text-sm">{task.userName}</div>
                    </div>
                </div> */}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="[background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#75edff_100%)] p-2.5 h-[150px] min-h-[150px]  flex flex-col rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <p className="my-auto flex-grow w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                {task.content}
            </p>
            <div className="flex gap-2">
                <div>
                    <Avatar>
                        <AvatarImage src={task.userpfp} />
                        <AvatarFallback>{task.userName}</AvatarFallback>

                    </Avatar>
                </div>
                <div>
                    <div className="mt-2 text-xs text-red-500">{task.role}</div>
                    <div className="text-sm">{task.userName}</div>
                </div>


            </div>


            {mouseIsOver && (
                <button
                    onClick={() => {
                        deleteTask(task.id);
                    }}
                    className="stroke-black absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
}

export default TaskCard;