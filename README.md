# Voice Recognition Web App

Aplicacao web de reconhecimento de voz utilizando a Web Speech API.

Browser-based speech recognition application using the Web Speech API.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License-MIT](https://img.shields.io/badge/License--MIT-yellow?style=for-the-badge)


[Portugues](#portugues) | [English](#english)

---

## Portugues

### Visao Geral

Aplicacao web que utiliza a Web Speech API nativa do navegador para reconhecimento de voz em tempo real:

- **Transcricao em tempo real** com resultados intermediarios e finais
- **Multi-idioma**: Suporte a Ingles, Portugues, Espanhol, Frances, Alemao e outros
- **Alternativas de reconhecimento** com niveis de confianca
- **Analise de transcricao**: Contagem de palavras, frequencia e confianca media

### Arquitetura

```mermaid
graph LR
    A[Microfone] --> B[Web Speech API]
    B --> C[VoiceRecognitionApp]
    C --> D[Resultados Intermediarios]
    C --> E[Resultados Finais]
    E --> F[Transcricao Completa]
    E --> G[Analise de Texto]
    G --> H[Frequencia de Palavras]
    G --> I[Estatisticas de Confianca]

    style B fill:#0d1117,color:#c9d1d9,stroke:#58a6ff
    style C fill:#161b22,color:#c9d1d9,stroke:#8b949e
```

### Inicio Rapido

```bash
git clone https://github.com/galafis/Voice-Recognition-Web-App.git
cd Voice-Recognition-Web-App

# Abrir index.html no navegador ou servir localmente
npx serve .
```

### Estrutura do Projeto

```
Voice-Recognition-Web-App/
├── main.js           # Classe VoiceRecognitionApp
├── index.html        # Interface web
├── tests/
│   └── main.test.js  # Testes
├── package.json
├── LICENSE
└── README.md
```

---

## English

### Overview

Web application using the browser native Web Speech API for real-time voice recognition:

- **Real-time transcription** with interim and final results
- **Multi-language**: Support for English, Portuguese, Spanish, French, German and more
- **Recognition alternatives** with confidence levels
- **Transcript analysis**: Word count, frequency and average confidence

### Architecture

```mermaid
graph LR
    A[Microphone] --> B[Web Speech API]
    B --> C[VoiceRecognitionApp]
    C --> D[Interim Results]
    C --> E[Final Results]
    E --> F[Full Transcript]
    E --> G[Text Analysis]
    G --> H[Word Frequency]
    G --> I[Confidence Stats]

    style B fill:#0d1117,color:#c9d1d9,stroke:#58a6ff
    style C fill:#161b22,color:#c9d1d9,stroke:#8b949e
```

### Quick Start

```bash
git clone https://github.com/galafis/Voice-Recognition-Web-App.git
cd Voice-Recognition-Web-App
npx serve .
```

---

## Autor / Author

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-demetrios-lafis)

## Licenca / License

MIT License - veja [LICENSE](LICENSE) / see [LICENSE](LICENSE).
