// @ts-ignore
import api from "../services/api";
import { useEffect, useState } from "react"

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
        <form onSubmit={handleSubmit}>
            <select onChange={handleChange} name="animalId" value={form.animalId}>
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
            />
            <input
                name="horario"
                placeholder="Horário"
                value={form.horario}
                onChange={handleChange}
            />
            <input
                name="motivo"
                placeholder="Motivo"
                value={form.motivo}
                onChange={handleChange}
            />
            <input
                name="observacoes"
                placeholder="Observações"
                value={form.observacoes}
                onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar Consulta'}
            </button>
        </form>
    );
}