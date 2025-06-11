"use client";

import FullTask from "@/components/dashboard/FullTask";
import NavbarDashboard from "@/components/dashboard/NavBarDashboard";
import Task from "@/components/dashboard/Task";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { useEffect, useState } from "react";
import EditTask from "@/components/dashboard/EditTask";
import AddTask from "@/components/dashboard/AddTask";
import EditDate from "@/components/dashboard/EditDate";
import AiQuestion from "@/components/dashboard/AiQuestion";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useSession } from "next-auth/react";

type TaskType = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  idealDate: string; // Date ISO
  offset: number; 
  status: "À faire" | "En cours" | "Terminée";
  priority: string; 
  isCustom: boolean;
  visible: boolean;
}

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const [taches, setTaches] = useState<TaskType[]>([]);
    const [dateMariage, setDateMariage] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
    const [isEditing, setIsEditing] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [editDateOpen, setEditDateOpen] = useState(false);
    const [questionOpen, setQuestionOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterVisible, setFilterVisible] = useState<"true" | "false" | "">("");
    const [filterCategory, setFilterCategory] = useState<string>("");


    const refreshTasks = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist`);
            if (!response.ok) throw new Error("Erreur lors du rafraîchissement des tâches");
            const data = await response.json();
            setTaches(data.tasks);
        } catch (error) {
            console.error("Erreur lors du rafraîchissement des tâches:", error);
        }
    };

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

        const fetchOnBoarding = async () => { 
        if (!session) { 
            window.location.href = "/"; 
            return; 
        }
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });

            if (!response.ok) {
            throw new Error("Failed to fetch onboarding status");
            }

            const data = await response.json();
            setDateMariage(
                data.weddingDate
                    ? new Date(data.weddingDate).toLocaleDateString("fr-FR")
                    : ""
            );

        } catch (error) {
            console.error("Error fetching onboarding status:", error);
        }
        } 


        fetchTasks();
        fetchOnBoarding();
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
            tasks={taches}

        />
            <GridPattern width={30} height={30} x={-1} y={-1} className={"opacity-40 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"}/>


        <section className="font-inter flex flex-col items-center mt-8 md:mt-28">
            {!selectedTask && !addTask && !editDateOpen && !questionOpen && (
            <SparklesText className="px-10 text-center font-sans text-md md:text-lg font-medium tracking-widest mb-8">Bonjour {user?.name} - Mariage prévu le {dateMariage}</SparklesText> 
            )}

            {/* <div className="flex justify-between items-center w-full px-5 md:px-10">
                <h1 className="text-2xl md:text-3xl font-bold">Ma Checklist</h1>
                <button onClick={() => setAddTask(true)} className="text-xs text-white bg-pinkk px-4 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">Ajouter une tâche</button>
            {/* <AnimatedCircularProgressBar max={100} value={30} min={0} gaugePrimaryColor="#DB80FF" gaugeSecondaryColor="#E5E7EB" className="mt-10 w-[50px] h-[50px] text-md"/> */}

            {selectedTask && isEditing && !addTask && !editDateOpen && !questionOpen && (
                <EditTask task={selectedTask} onBack={() => setIsEditing(false)} />
            )}

           {selectedTask && !isEditing && !addTask && !editDateOpen && !questionOpen && (
                <FullTask
                    task={selectedTask}
                    onBack={() => {setSelectedTask(null); refreshTasks()}}
                    onEdit={() => setIsEditing(true)}
                    onQuestion={() => setQuestionOpen(true)}
                />
            )}

            {!selectedTask && !addTask && !editDateOpen && !questionOpen && (
                <div className="flex flex-col gap-10 md:gap-7 mb-10">
                    {filteredTasks.map(task => (
                        <Task
                        key={task.id}
                        task={task}
                        onSelect={() => {
                            setSelectedTask(task)
                            setIsEditing(false)
                        }}
                        onRefresh={refreshTasks}
                        />
                    ))}
                </div>
            )}

           {!selectedTask && addTask && !questionOpen && <AddTask onBack={() => {setAddTask(false); refreshTasks()}} />}
           {!selectedTask && editDateOpen && !questionOpen && <EditDate onBack={() => {setEditDateOpen(false); refreshTasks()}} />}

           {!isEditing && !editDateOpen && !addTask && questionOpen && selectedTask && <AiQuestion task={selectedTask} onBack={() => {setQuestionOpen(false)}}  />}

            {/* <Footer /> */}
        </section>



        
        </>
    )
}