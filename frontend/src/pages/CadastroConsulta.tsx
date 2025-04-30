// @ts-ignore
import api from "../services/api";
import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar";
import logotipotxt from '/images/logotxt.png'

export function CadastroConsulta() {

    const [animais, setAnimais] = useState([]);

    const [form, setForm] = useState({
        animalId: '',
        data: '',
        horario: '',
        motivo: '',
        observacoes: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação simples
        if (!form.animalId || !form.data || !form.horario || !form.motivo || !form.observacoes) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/consultas', form);
            alert('Consulta cadastrada com sucesso!');
            setForm({
                animalId: '',
                data: '',
                horario: '',
                motivo: '',
                observacoes: '',
            });
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Erro ao cadastrar animal.');
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="flex">

            <div className="flex">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col items-center justify-around ml-52 h-screen">
                <a href="/" className="flex items-center justify-center w-full">
                    <img src={logotipotxt} alt="a" className="w-50 cursor-pointer p-2 box-content rounded-md" />
                </a>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                    <h1 className="font-bold text-4xl mb-4">Nova Consulta</h1>
                    <select
                        onChange={handleChange}
                        name="animalId"
                        value={form.animalId}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    >
                        <option value="">Selecione o pet</option>
                        {animais.map((animal: any) => (
                            <option key={animal.id} value={animal.id}>
                                {animal.especie === 'Cão' ? '🐶 ' : animal.especie === 'Gato' ? '🐱 ' : ''}
                                {animal.nome}
                            </option>
                        ))}
                    </select>
                    <input
                        name="data"
                        type="date"
                        value={form.data}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <input
                        name="horario"
                        placeholder="Horário"
                        value={form.horario}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <input
                        name="motivo"
                        placeholder="Motivo"
                        value={form.motivo}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <input
                        name="observacoes"
                        placeholder="Observações"
                        value={form.observacoes}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all cursor-pointer w-70 mt-5"
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar Consulta'}
                    </button>
                </form>

                <p className="text-sm text-green-800">Aqui voce cria as consultas dos pets!</p>


            </div >
        </div>
    );
}