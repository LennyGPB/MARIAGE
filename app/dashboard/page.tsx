"use client";

import FullTask from "@/components/dashboard/FullTask";
import NavbarDashboard from "@/components/dashboard/NavBarDashboard";
import Task from "@/components/dashboard/Task";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { useEffect, useState } from "react";
import EditTask from "@/components/dashboard/EditTask";
import AddTask from "@/components/dashboard/AddTask";
import EditDate from "@/components/dashboard/EditDate";

type TaskType = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  idealDate: string; // Date ISO
  offset: number; 
  status: "todo" | "in_progress" | "done"
  priority: string; 
  isCustom: boolean;
  visible: boolean;
}

export default function Dashboard() {
    const [taches, setTaches] = useState<TaskType[]>([]);
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
    const [isEditing, setIsEditing] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [editDateOpen, setEditDateOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterVisible, setFilterVisible] = useState<"true" | "false" | "">("");
    const [filterCategory, setFilterCategory] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist`);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setTaches(data.tasks); 
            } catch (error) {
            console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const filteredTasks = taches.filter(task => {
    // Status
    if (filterStatus && task.status !== filterStatus) return false;
    // Visible
    if (filterVisible && String(task.visible) !== filterVisible) return false;
    // Category
    if (filterCategory && task.category !== filterCategory) return false;

    return true;
    });


    
    return (
        <>
        <NavbarDashboard
            onAddTask={() => {
                setSelectedTask(null); 
                setIsEditing(false);  
                setEditDateOpen(false);
                setAddTask(true);
            }}
            onEditDate={() => {
                setSelectedTask(null);
                setIsEditing(false);
                setAddTask(false);
                setEditDateOpen(true);
            }}
            onStatusChange={(status) => setFilterStatus(status)}
            onVisibleChange={(visible) => setFilterVisible(visible as "true" | "false" | "")}
            onCategoryChange={(category) => setFilterCategory(category)}

        />
            <GridPattern width={30} height={30} x={-1} y={-1} className={"opacity-40 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"}/>


        <section className="font-inter flex flex-col items-center mt-32">
            {/* <SparklesText className="font-sans text-xl font-medium tracking-[2px]">Bonjour Hîden - Mariage prévu le 12/10/2025</SparklesText> */}
            {/* <AnimatedCircularProgressBar max={100} value={30} min={0} gaugePrimaryColor="#DB80FF" gaugeSecondaryColor="#E5E7EB" className="mt-10 w-[50px] h-[50px] text-md"/> */}

            {selectedTask && isEditing && !addTask && !editDateOpen && (
                <EditTask task={selectedTask} onBack={() => setIsEditing(false)} />
            )}

           {selectedTask && !isEditing && !addTask && !editDateOpen && (
                <FullTask
                    task={selectedTask}
                    onBack={() => setSelectedTask(null)}
                    onEdit={() => setIsEditing(true)}
                />
            )}

            {!selectedTask && !addTask && !editDateOpen && (
                <div className="flex flex-col gap-7 md:gap-4 mb-10">
                    {filteredTasks.map(task => (
                        <Task
                        key={task.id}
                        task={task}
                        onSelect={() => {
                            setSelectedTask(task)
                            setIsEditing(false)
                        }}
                        />
                    ))}
                </div>
            )}

           {!selectedTask && addTask && <AddTask onBack={() => setAddTask(false)} />}
           {!selectedTask && editDateOpen && <EditDate onBack={() => setEditDateOpen(false)} />}

        </section>



        
        </>
    )
}