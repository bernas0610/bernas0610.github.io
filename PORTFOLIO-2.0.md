# Portfólio 2.0 — primeira implementação

Revisão local em 18/10/2026. Sem commit, push, deploy, contas ou serviços novos. O repositório e o deploy do NexusGest foram apenas consultados.

## Análise e direção visual

O original contém um único `index.html`, com CSS/JS embutidos, `foto.jpg` e `curriculo.pdf`. Não há framework, package.json, pipeline de build, linter ou suíte de testes. O checkout fornecido é uma pasta extraída, sem diretório `.git`. Nenhum AGENTS.md foi encontrado no caminho da pasta de trabalho.

Preservados: arquivos originais byte a byte, fontes Bricolage Grotesque/JetBrains Mono, paleta navy/azul/menta/papel, foto, currículo, e-mail, GitHub e LinkedIn. O layout anterior tem breakpoint em 820px; a nova versão tem ajustes em 1100, 760 e 370px.

Direção: abertura navy com tipografia expressiva, seção clara de projetos, NexusGest em card amplo, projetos secundários assimétricos, trajetória em linha e tecnologias ligadas a projetos concretos. As ilustrações tipográficas dos cards secundários são elementos gráficos, não capturas de interfaces.

## Arquivos novos e modificados

- `.gitignore`: permite o futuro versionamento de `v2/`, `scripts/` e deste relatório; ignora `review/`.
- `v2/index.html`: as sete áreas solicitadas, conteúdo e metadados de revisão (`noindex, nofollow`).
- `v2/styles.css`: identidade, temas, layouts, foco e movimento reduzido.
- `v2/theme.js`: preferência de tema antes da pintura, com chave própria.
- `v2/app.js`: tema, menu responsivo, Escape, foco e abertura dos detalhes do NexusGest.
- `v2/assets/favicon.svg`: marca tipográfica BM.
- `v2/assets/nexusgest-login.jpg`: captura real da tela pública, feita nesta revisão; nenhuma conta criada e nenhum login efetuado.
- `scripts/check.mjs`: preservação por SHA-256, referências locais, IDs, atributos de imagens, h1 e sintaxe JS.
- `scripts/build.mjs`: executa checagens e prepara uma cópia estática em `review/site/`.
- `PORTFOLIO-2.0.md`: análise, fontes, verificação e revisão.

`index.html`, `foto.jpg` e `curriculo.pdf` da raiz não foram modificados. O build mantém os caminhos `/` e `/v2/` e não promove automaticamente a versão nova à página inicial.

## Evidências e decisões editoriais

- **NexusGest:** [README](https://github.com/bernas0610/nexusgest/blob/main/README.md), [frontend](https://github.com/bernas0610/nexusgest/blob/main/docs/frontend.md) e [implantação](https://github.com/bernas0610/nexusgest/blob/main/deploy/README.md), consultados com acesso autorizado de leitura. Repositório privado: não é apresentado como link público para código. Arquitetura Java/Spring Boot, React/TypeScript e PostgreSQL; JWT, multi-tenancy e agenda documentados. A [tela pública](https://nexusgest.pages.dev/) confirmou o aviso de recuperação de senha indisponível. Os limites de suspensão, retomada e cotas são descritos como limitações da infraestrutura gratuita, sem inventar latência ou disponibilidade medida. A página pública foi inspecionada sem cadastrar usuários ou alterar dados. Fluxos autenticados não foram homologados nesta tarefa.
- **Transcreve:** [README](https://github.com/bernas0610/projeto_sistema_transcricao/blob/main/README.md), SHA `d524b7df5ad6bb5e3c0f21630c642af372c3d7d5`, árvore e `TranscricaoService.java` consultados. Processamento assíncrono, FFmpeg, Gemini e checkpoints documentados; serviço encaminha o trabalho ao processador em segundo plano. A documentação informa execução local e ausência de URL pública. Não foi afirmada qualidade de transcrição ou disponibilidade comercial.
- **FlowRoom:** nome solicitado pelo proprietário; o [repositório da squad](https://github.com/squad27-accenture/Gerenciador-de-salas) usa **RoomFlow**, diferença explicitada no card. README confirma salas, reservas, Java/Spring, JWT e PostgreSQL. Contexto de Residência de Software II com acompanhamento da Accenture fornecido pelo proprietário. Não é apresentado como emprego. A participação no backend já constava no portfólio original.
- Formação em ADS/UNIT, localização e busca pela primeira oportunidade preservadas do site existente; sem datas acadêmicas, métricas, clientes ou empregos inventados.
- Não foram encontradas capturas raster dos projetos secundários na inspeção. Optou-se por elementos gráficos em CSS, sem simular screenshots. A imagem do NexusGest é ampliável e identificada como tela de login.

## Verificação executada

`node scripts/check.mjs` e `node scripts/build.mjs` aprovados. Build é preparação estática, sem dependências e sem publicação; checagem sintática não equivale a ESLint ou a um linter CSS/HTML completo. Não existia suíte de testes a executar no original.

| Verificação em navegador | Resultado |
| --- | --- |
| Desktop 1440 × 900 | Duas colunas no hero; NexusGest amplo; projetos secundários assimétricos. |
| Tablet 768 × 1024 e 1024 × 768 | Conteúdo e cards dentro da viewport; stack em duas colunas. |
| Mobile 390 × 844 | Hero e projetos empilhados; menu recolhível. |
| Mobile estreito 320 × 740 | Sem elementos de conteúdo ultrapassando a largura; stack em uma coluna. |
| Tema claro/escuro | Clique e Enter funcionais; preferência mantida após recarregar. |
| Menu mobile | Abre; Escape fecha e devolve foco; link fecha menu e move foco à seção. |
| Detalhes NexusGest | Link abre o disclosure; summary nativo permite interação por teclado. |
| Referências locais | 23 âncoras/arquivos válidos; imagens e currículo presentes. |
| Estrutura | Um h1, um main, imagens com alt/dimensões, links com nome acessível. |
| Movimento reduzido | Regra CSS elimina animações/transições e rolagem suave. |
| Contraste | Checagem de 115 elementos de texto renderizados no tema escuro: sem falhas nos limiares 4,5:1/3:1 aplicáveis. Não é auditoria WCAG completa. |
| Console | Sem erros ou avisos na consulta da sessão local. |
| Preservação | SHA-256 dos três arquivos originais idênticos aos valores iniciais. |

As verificações de layout usam o navegador incorporado com viewport ajustada. Não substituem teste em dispositivos físicos, Safari, Firefox ou leitores de tela. As URLs externas de contato foram preservadas; não houve envio de e-mail nem teste autenticado no LinkedIn. Não foram executados testes dos backends dos projetos.

## Revisar localmente

Na pasta do projeto, com Python instalado:

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4174/v2/` para a nova versão e `http://127.0.0.1:4174/` para o original. O servidor é local; encerre com Ctrl+C. O `v2/index.html` também pode ser aberto diretamente no navegador. As fontes externas precisam de internet e têm fallback de sistema.

Para repetir as checagens e preparar a cópia estática:

```powershell
node scripts/check.mjs
node scripts/build.mjs
```

Capturas completas e vistas iniciais estão em `review/`: `desktop-full.jpg`, `tablet.jpg`, `mobile-full.jpg`, `desktop.jpg`, `mobile.jpg` e `desktop-light.jpg`. São artefatos de revisão ignorados pelo Git.

Antes de uma eventual publicação, revisar textos, nomenclatura FlowRoom/RoomFlow, currículo e exposição da demonstração experimental. Após aprovação, uma tarefa posterior pode promover `/v2/` à raiz e revisar metadados de indexação/compartilhamento. Esta entrega não autoriza nem executa essa promoção.
