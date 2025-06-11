

export default function Footer() {

    return (
        <>
            <footer className="w-full bottom-0 left-0 font-sans mt-10">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-center ">
                    <p className="text-xs text-gray-600">© {new Date().getFullYear()} EasyWed. Tous droits réservés.</p>
                    <p className="text-xs text-gray-500">Made with ❤️ by InTheGleam</p>
                </div>

                <div className="text-[10px] flex flex-wrap gap-2 justify-center items-center mt-2 mb-4 sm:mb-2">
                    <a href="/obligation/mentions" className="text-gray-500 hover:text-gray-700">Mentions légales</a>
                    <span className="text-xs text-gray-500">|</span>
                    <a href="/obligation/politique" className=" text-gray-500 hover:text-gray-700">Politique de confidentialité</a>
                    <span className="text-xs text-gray-500">|</span>
                    <a href="/obligation/cgv" className=" text-gray-500 hover:text-gray-700">Conditions générales de vente</a>
                </div>
            </footer>    
        </>
    )
}