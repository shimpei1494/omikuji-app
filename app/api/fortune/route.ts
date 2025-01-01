import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Gemini APIの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function GET() {
  try {
    // Geminiモデルの設定
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    // プロンプトの設定
    const prompt = `日本のおみくじの形式で運勢を生成してください。出力フォーマットの例を参考にしながら新しい内容で結果を作成してください。結果出力時には以下の要素を含めてください：
    - 総合運（大吉、吉、中吉、小吉、末吉、凶、大凶のいずれか）
    - 運勢の詳細な説明
    - 仕事運
    - 恋愛運
    - 健康運
    - ラッキーカラー
    - ラッキーナンバー
    - アドバイス
    ## 出力フォーマットの例
    総合運：大吉\n
    【総合運の詳細】勢いに乗る一歩手前。少しの勇気が、運気を大きく開花させます。迷いや不安を抱えていても、自分を信じて行動することで道が開けるでしょう。新しい挑戦や人との出会いが、思いもよらない幸運をもたらします。\n
    【仕事運】周囲からの評価が高まり、自然とリーダー的役割を任されることが増えそうです。これまでの努力が形になり始める時期でもあるので、謙虚さを忘れずに結果を出し続けることで、さらなる飛躍が期待できます。\n
    【恋愛運】思いやりの心が鍵となります。相手の気持ちに寄り添い、素直に感謝や好意を伝えることで、一層関係が深まるでしょう。シングルの方は、普段の生活圏から少しだけ足を延ばしてみると、思わぬ出会いがあるかもしれません。\n
    【健康運】体調はおおむね良好。気候の変化や生活スタイルの乱れに注意しながら、バランスの良い食事と適度な運動を心がけると、さらに活力が高まります。少し早めの就寝を心がけると、翌日のパフォーマンスが大きく向上するでしょう。\n
    【ラッキーカラー】赤\n
    【ラッキーナンバー】8\n
    【アドバイス】小さなチャンスほど見過ごさないようにアンテナを張っておきましょう。周囲の人々や身近な出来事から多くを学ぶ姿勢が、大きな成功への近道です。焦らず確実に積み重ねていくことが、今後の幸運をさらに引き寄せます。\n
    `

    // Gemini APIを呼び出し
    const result = await model.generateContent(prompt)
    const fortune = result.response.text()

    return NextResponse.json({ fortune })
  } catch (error) {
    console.error('Error generating fortune:', error)
    return NextResponse.json(
      { error: 'おみくじの生成に失敗しました' },
      { status: 500 },
    )
  }
}
