from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="sk-6ba1c6900e6f4b75b1e147a7a79f9446", base_url="https://api.deepseek.com")

@app.route('/ask_ai', methods=['POST'])
def ask_ai():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "Nenhuma mensagem fornecida"}), 400

    # Comando a ser adicionado invisivelmente
    # É importante notar que "OOC:" (Out Of Character) geralmente é usado para instruções para a IA
    # que não fazem parte do diálogo.
    ooc_command = " OOC: {{char}} MUST NOT emphasize ANY words with asterisks, quotation marks or in any form. For example, do not write like this: *He \"seems* okay*, \"I will *distract* him\". {{char}} should write dialogues between quotation marks and actions between asterisks."

    # Concatena a mensagem do usuário com o comando OOC
    # O comando será enviado para a IA como parte da mensagem do usuário
    full_message_to_ai = user_message + ooc_command

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "Você é um assistente prestativo."},
                {"role": "user", "content": full_message_to_ai}, # Envia a mensagem completa para a IA
            ],
            stream=False
        )
        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})
    except Exception as e:
        print(f"Erro ao chamar a API do DeepSeek: {e}")
        return jsonify({"error": "Erro ao processar a solicitação da IA"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)