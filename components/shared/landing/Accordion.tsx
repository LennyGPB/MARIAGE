import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async  function AccordionComponent() {


  return (
    <>
    <article id="faq" className="mt-24 z-50 font-sans flex flex-col justify-center items-center tracking-wide mb-20">
    <h2 className="tracking-widest font-light text-3xl md:text-4xl">Foire aux <span className="font-medium">questions</span></h2>
    <Accordion type="single" collapsible className="mt-10 w-full max-w-2xl mx-auto px-5 md:px-0">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-md md:text-xl">Comment ça fonctionne ?</AccordionTrigger>
            <AccordionContent>
                Notre application <strong>simplifie l’organisation</strong>  de votre mariage en quatre étapes : <br /><br />
                1️⃣ Répondez à un court questionnaire (date, style, budget…) pour que l’IA comprenne vos besoins. <br /><br />
                2️⃣ Générez votre checklist intelligente, adaptée à votre mariage et prête à l’emploi.<br /><br />
                3️⃣ Accédez à votre dashboard privé pour suivre l’avancement, modifier les tâches, ou ajouter vos propres idées.<br /><br />
                4️⃣ Posez vos questions à l’IA directement dans chaque tâche, pour obtenir des conseils personnalisés.<br /><br />

                💡 <strong>Tout est centralisé dans un espace privé et sécurisé</strong>, pensé pour vous accompagner à chaque étape de votre projet.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-md md:text-xl">Comment ma checklist est-elle générée ?</AccordionTrigger>
            <AccordionContent>
            ✅ Notre IA crée une checklist unique à partir de ta date, ton style et ton budget. Tu obtiens des tâches claires, 
            classées par priorité et organisées pour t’aider à planifier ton mariage sereinement.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="text-md md:text-xl">Puis-je modifier les tâches de la checklist ?</AccordionTrigger>
            <AccordionContent>
                ✅ Oui ! Chaque tâche peut être modifiée, masquée ou complétée manuellement. Tu restes maître de ton organisation à 100 % !
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="text-md md:text-xl">Que se passe-t-il si je change la date de mon mariage ?</AccordionTrigger>
            <AccordionContent>
                ✅ Pas de panique ! Notre IA recalcule automatiquement les dates idéales de chaque tâche pour s’adapter à ta nouvelle date. Ta checklist reste toujours à jour, sans effort.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
            <AccordionTrigger className="text-md md:text-xl">Est-ce que je peux ajouter mes propres tâches ?</AccordionTrigger>
            <AccordionContent>
                ✅ Oui ! Tu peux facilement ajouter des tâches personnalisées à ta checklist pour qu’elle corresponde parfaitement à ton mariage.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
            <AccordionTrigger className="text-md md:text-xl">Combien de temps faut-il pour créer ma checklist ?</AccordionTrigger>
            <AccordionContent>
                ✅ Moins d’une minute ! Il vous suffit de répondre à quelques questions, et l’IA génère automatiquement votre checklist personnalisée.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
            <AccordionTrigger className="text-md md:text-xl">Mes données sont-elles sécurisées ?</AccordionTrigger>
            <AccordionContent>
                ✅ Oui, toutes vos données sont stockées de façon sécurisée et confidentielle. Nous utilisons des technologies fiables et respectons les bonnes pratiques de protection des informations personnelles. Rien n’est partagé sans votre accord.            </AccordionContent>
        </AccordionItem>
        
     </Accordion>
     </article>
    </>
  );
}
