import { useState } from "react";
import axios from "axios";

interface PredictionResult {
  ticker: string;
  predicted_return: number | null;
  status: string;
  analysis: string | null;
  long_term_outlook: number | null;
}

interface UseInvestmentProjectionProps {
  ticker: string;
  years: number[];
  investment: number | null;
}

export const useInvestmentProjection = ({ ticker, years, investment }: UseInvestmentProjectionProps) => {
  const [resultado, setResultado] = useState<PredictionResult | null>(null);
  const [simulatedValues, setSimulatedValues] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const validarTicker = (codigo: string): boolean => {
    const regex = /^[A-Z]{4}[0-9]{1,2}$/;
    return regex.test(codigo);
  };

  const calcularProjecao = async () => {
    setErro("");
    setResultado(null);

    if (!validarTicker(ticker.toUpperCase())) {
      setErro("Código do ativo inválido. Use o formato: PETR4, VALE3, etc.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = "api/predict";
      const response = await axios.post(API_URL, {
        ticker: ticker.toUpperCase(),
        years: years[0],
      });
      console.log("Resposta da API:", response.data);

      const data: PredictionResult = response.data;
      setResultado(data);

      if (investment !== null && data.predicted_return !== null && data.long_term_outlook !== null) {
        const retornoAnual = data.predicted_return;
        const retornoLongoPrazo = data.long_term_outlook / 100;

        const valoresSimulados = [
          investment,
          investment * (1 + retornoAnual),
          investment * (1 + retornoLongoPrazo),
        ];

        setSimulatedValues(valoresSimulados);
      }
    } catch (error) {
      console.error("Erro ao buscar projeção:", error);
      setErro("Erro ao buscar projeção. Verifique o código do ativo e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const data = {
    labels: ["Atual", "1 Ano", `${years[0]} Anos`],
    datasets: [
      {
        label: "Projeção de Investimento",
        data: simulatedValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Projeção de Retorno do Investimento",
      },
    },
  };


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
      case "previsão realizada com sucesso":
        return "bg-green-100 text-green-800";
      case "error":
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPercentage = (value: number | null): string => {
    if (value === null) return "N/A";
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getReturnColor = (value: number | null): string => {
    if (value === null) return "text-gray-600";
    return value > 0 ? "text-green-600" : "text-red-600";
  };

  return {
    resultado,
    simulatedValues,
    loading,
    erro,
    calcularProjecao,
    data,
    options,
    getStatusColor,
    formatPercentage,
    getReturnColor,
  };
};