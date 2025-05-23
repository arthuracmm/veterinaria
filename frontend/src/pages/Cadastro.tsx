// @ts-ignore
import api from "../services/api";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react"
import logotipotxt from '/images/logotxt.png'

export function Cadastro() {
    const [donos, setDonos] = useState([]);
    const [form, setForm] = useState({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        peso: '',
        donoId: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação simples
        if (!form.nome || !form.especie || !form.raca || !form.idade || !form.peso || !form.donoId) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/animais', form);
            alert('Animal cadastrado com sucesso!');
            setForm({
                nome: '',
                especie: '',
                raca: '',
                idade: '',
                peso: '',
                donoId: ''
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
                const response = await api.get('/donos');
                setDonos(response.data);
            } catch (error) {
                console.error('Erro ao buscar donos:', error);
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
                    <h1 className="font-bold text-4xl mb-4">Cadastro de Pets</h1>
                    <input
                        name="nome"
                        placeholder="Nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <select
                        name="especie"
                        value={form.especie}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    >
                        <option value="">Selecione a Espécie</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                    </select>
                    <input
                        name="raca"
                        placeholder="Raça"
                        value={form.raca}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <input
                        name="idade"
                        placeholder="Idade"
                        value={form.idade}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <input
                        name="peso"
                        placeholder="Peso"
                        value={form.peso}
                        onChange={handleChange}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none"
                    />
                    <select
                        onChange={handleChange}
                        name="donoId"
                        value={form.donoId}
                        className="p-2 border-1 border-zinc-400 rounded-lg w-70 outline-none">
                        <option value="">Selecione o dono</option>
                        {donos.map((dono: any) => (
                            <option key={dono.id} value={dono.id}>
                                {dono.nome}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all cursor-pointer w-70 mt-5">
                        {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
                    </button>
                </form>

                <p className="text-sm text-green-800">Aqui voce cadastra o pet no seu sistema!</p>

            </div>

        </div>
    );
}