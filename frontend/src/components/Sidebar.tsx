import { HeartPlus, Home, PawPrint, Clipboard } from "lucide-react"
import logotipo from '/images/logowtxt.png'

export function Sidebar() {
    const items = [
        {
            name: 'Home',
            path: '/',
            icon: Home
        },
        {
            name: 'Cadastro',
            path: '/cadastro',
            icon: PawPrint
        },
        {
            name: 'Nova Consulta',
            path: '/cadastroconsulta',
            icon: Clipboard
        },
        {
            name: 'Nova Cirurgia',
            path: '/cadastrocirurgia',
            icon: HeartPlus
        },
    ]

    const verifyPath = (path : string) => {
        const currentPath = location.pathname;
        return currentPath === path ? 'bg-green-300' : 'bg-green-200';
    }
    return (
        <div className="flex flex-col flex-1 fixed h-screen w-50 bg-green-200 p-4 items-center" >
            <a href="https://github.com/arthuracmm" className="flex items-center justify-center w-full">
            <img src={logotipo} alt="a" className="w-[80%] hover:scale-110 cursor-pointer transition-all hover:bg-green-300 p-2 box-content rounded-md"/>
            </a>
            <div className="flex flex-col gap-4 w-full mt-4">
                {items.map((item) => (
                    <a key={item.name} href={item.path} className={`flex items-center gap-2 p-2 rounded-md hover:bg-green-300 transition-all ${verifyPath(item.path)}`}>
                        <item.icon size={20} className="text-green-800" />
                        <span className="text-green-800">{item.name}</span>
                    </a>
                ))}
            </div>
            <p className="text-sm text-green-800 bottom-5 absolute">Desenvolvido por ACM ©</p>
        </div>
    )
}