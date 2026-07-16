from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

import os
import json

# -----------------------------------------
# Load .env
# -----------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

dotenv_path = BASE_DIR / ".env"

load_dotenv(dotenv_path)

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY not found in .env"
    )

client = Groq(
    api_key=api_key
)

SYSTEM_PROMPT = """
You are an expert multilingual translator.

Rules:
1. Translate ONLY the JSON values.
2. NEVER translate JSON keys.
3. Preserve the JSON structure exactly.
4. Return ONLY raw JSON.
5. Do NOT wrap the response in markdown.
6. Do NOT explain anything.
"""

def translate_strings(
    language: str,
    strings: dict,
):
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": f"""
Translate every JSON value into {language}.

Return ONLY valid JSON.

JSON:

{json.dumps(strings, ensure_ascii=False, indent=2)}
""",
            },
        ],
    )

    content = (
        completion.choices[0]
        .message.content
        .strip()
    )

    print("\n========== RAW GROQ RESPONSE ==========")
    print(content)
    print("=======================================\n")

    # Remove markdown if present
    if content.startswith("```"):
        content = (
            content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    try:
        return json.loads(content)

    except json.JSONDecodeError as e:
        print(content)
        raise RuntimeError(
            f"Groq returned invalid JSON: {e}"
        )