
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function askExpert(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Eres un consultor senior en infectología pediátrica y epidemiología, una autoridad mundial en Morbillivirus (sarampión). 
        Tus respuestas deben ser exhaustivas, técnicas y basadas en la evidencia más reciente (OMS, CDC). 
        Utiliza terminología médica precisa (fisiopatología, inmunología, semiología). 
        Cuando hables de tratamientos, sé específico con las dosis de Vitamina A. 
        Cuando hables de complicaciones, explica el mecanismo biológico (ej. amnesia inmunológica). 
        Mantén un tono profesional, científico pero accesible para alguien que busca especializarse en el tema. 
        Si la pregunta no es estrictamente sobre salud pública, pediatría o infectología relacionada con el sarampión, redirige al usuario con autoridad médica.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error en el servidor de consulta epidemiológica. Los sistemas de datos están saturados. Intente nuevamente.";
  }
}
