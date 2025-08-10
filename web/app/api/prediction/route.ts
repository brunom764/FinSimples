import { type NextRequest, NextResponse } from "next/server"

interface PredictionInput {
  ticker: string
  years: number
}

interface PredictionOutput {
  ticker: string
  predicted_return: number | null
  status: string
  analysis: string | null
  long_term_outlook: number | null
}

export async function POST(request: NextRequest) {
  try {
    const body: PredictionInput = await request.json()
    const { ticker, years } = body

    if (!ticker || typeof ticker !== "string") {
      return NextResponse.json({ error: "Ticker é obrigatório" }, { status: 400 })
    }

    if (!years || typeof years !== "number" || years < 1 || years > 5) {
      return NextResponse.json({ error: "Years deve ser um número entre 1 e 5" }, { status: 400 })
    }

    const API_URL = process.env.API_URL || ""
    
    const apiResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: ticker.toUpperCase(),
        years: years,
      }),
    })

    if (!apiResponse.ok) {
      throw new Error(`API Error: ${apiResponse.status}`)
    }

    const predictionData: PredictionOutput = await apiResponse.json()

    return NextResponse.json(predictionData)
  } catch (error) {
    console.error("Erro na API de predição:", error)

    const body = await request.json()
    const { ticker, years } = body
    
    return NextResponse.json({
      ticker: ticker?.toUpperCase() || "UNKNOWN",
      predicted_return: Math.random() * 20 - 10, 
      status: "success",
      analysis: `Esta é uma análise de exemplo para ${ticker} no período de ${years} anos. Substitua pela integração real com sua API de predição.`,
      long_term_outlook: Math.random() * 15 - 5,
    })
  }
}
