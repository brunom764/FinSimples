"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Calculator, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FormatAnalysisToSections } from "./ui/formatText"
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useInvestmentProjection } from "./hooks/investment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionResult {
  ticker: string
  predicted_return: number | null
  status: string
  analysis: string | null
  long_term_outlook: number | null
}

export default function Form() {
  const [ticker, setTicker] = useState("")
  const [years, setYears] = useState([3])
  const [investment, setInvestment] = useState<number | null>(null)
  const {
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
  } = useInvestmentProjection({ ticker, years, investment });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "completed":
      case "previsão realizada com sucesso":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
  
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">FinSimples</h1>
          </div>
          <p className="text-gray-600">Projeção Inteligente de Ativos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Analisar Ativo
            </CardTitle>
            <CardDescription>Insira o código do ativo, período e valor do investimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticker">Código do Ativo</Label>
              <Input
                id="ticker"
                placeholder="Ex: Digite um código de ativo"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="uppercase"
                maxLength={6}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    calcularProjecao()
                  }
                }}
              />
              <p className="text-xs text-gray-500">Ex: PETR4, VALE3, BBDC4, DIVO11</p>
            </div>

            <div className="space-y-3">
              <Label>
                Período de Projeção: {years[0]} {years[0] === 1 ? "ano" : "anos"}
              </Label>
              <Slider 
                value={years} 
                onValueChange={setYears} 
                max={5} 
                min={1} 
                step={1} 
                className="w-full" 
                disabled={resultado !== null}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 ano</span>
                <span>5 anos</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment">Valor do Investimento</Label>
              <Input
                id="investment"
                type="number"
                placeholder="Digite o valor do investimento"
                value={investment || ""}
                onChange={(e) => setInvestment(Number(e.target.value))}
              />
            </div>

            {erro && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            )}

            <Button onClick={calcularProjecao} className="w-full" disabled={loading || !ticker || !investment}>
              {loading ? "Analisando..." : "Analisar Ativo"}
            </Button>
          </CardContent>
        </Card>

        {resultado && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Projeção para {resultado.ticker}
                </CardTitle>
                <Badge className={getStatusColor(resultado.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(resultado.status || "")}
                  </div>
                </Badge>
              </div>
              <CardDescription>
                Período: {years[0]} {years[0] === 1 ? "ano" : "anos"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {simulatedValues.length > 0 && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <Line data={data} options={options} />
                </div>
              )}

                <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Retorno Previsto</p>
                    <p className={`text-3xl font-bold ${getReturnColor(resultado.predicted_return) || " "}`}>
                        {formatPercentage((resultado.predicted_return || 0) * 100)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        em 1 ano
                    </p>
                    </div>

                    {resultado.long_term_outlook !== null && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Perspectiva Longo Prazo</p>
                        <p className={`text-2xl font-bold ${getReturnColor(resultado.long_term_outlook)}`}>
                        {formatPercentage(resultado.long_term_outlook)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                        em {years[0]} {years[0] === 1 ? "ano" : "anos"}
                        </p>
                    </div>
                    )}
                </div>


              {resultado.analysis && (
                <FormatAnalysisToSections text={resultado.analysis} />
              )}

              <div className="text-xs text-gray-500 p-3 bg-yellow-50 rounded-lg">
                <p className="font-medium mb-1">⚠️ Importante:</p>
                <p>
                  Esta projeção é baseada em análise algorítmica e dados históricos. Investimentos envolvem riscos e
                  rentabilidade passada não garante resultados futuros.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-xs text-gray-500 pt-4">
          <p>Powered by FinSimples AI • Dados em tempo real</p>
        </div>
      </div>
    </div>
  )
}