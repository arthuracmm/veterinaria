// @ts-ignore
import api from "../services/api";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";

export function Home() {
    const [animais, setAnimais] = useState([]);
    const [donos, setDonos] = useState<{ id: number; nome: string }[]>([]);

    useEffect(() => {
        const fetchAnimais = async () => {
            try {
                const response = await api.get('/animais');
                setAnimais(response.data);
            } catch (error) {
                console.error('Erro ao buscar animais:', error);
            }
        }
        fetchAnimais();
    }
        , []);

    useEffect(() => {
        const fetchDonos = async () => {
            try {
                const response = await api.get('/donos');
                setDonos(response.data);
            } catch (error) {
                console.error('Erro ao buscar donos:', error);
            }
        }
        fetchDonos();
    }
        , []);
    return (
        <div className="flex">

            <div className="flex">
                <Sidebar />
            </div>

            <div className="grid grid-cols-2 w-full gap-4 ml-52 h-full">
                {animais.map((animal: any) => (
                    <div key={animal.id} className="bg-green-200 p-4 m-2 rounded-md shadow-md w-auto flex flex-col items-center h-full justify-around">
                        <h2 className="text-lg font-bold text-green-800">{animal.nome}</h2>
                        <p className="text-green-800">Espécie: {animal.especie}</p>
                        <p className="text-green-800">Raça: {animal.raca}</p>
                        <p className="text-green-800">Idade: {animal.idade}</p>
                        <p className="text-green-800">Dono: {
                            donos.find(dono => dono.id === animal.donoId)?.nome || "Dono não registrado"
                        }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}