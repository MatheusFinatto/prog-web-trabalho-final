# ADR: Todo-List


## Contexto

Estamos desenvolvendo uma aplicação web de lista de tarefas que permite que os usuários gerenciem e acompanhem suas tarefas. Precisamos escolher uma pilha front-end que permita um desenvolvimento eficiente, forneça uma interface de usuário robusta e responsiva e permita integração com nossa API back-end. Avaliamos diferentes opções e consideramos fatores como facilidade de uso, experiência do desenvolvedor, suporte da comunidade e compatibilidade do ecossistema.


Decidimos usar a seguinte pilha front-end para nossa aplicação de lista de tarefas:

-   Vite: Como ferramenta de compilação, fornecendo tempos rápidos de desenvolvimento e compilação com seu empacotamento nativo baseado em módulos ES.
-   React: Como biblioteca JavaScript para construir a interface do usuário, oferecendo uma abordagem baseada em componentes e um ecossistema vibrante.
-   TypeScript: Para tipagem estática e melhor experiência de desenvolvedor, melhorando a qualidade do código e fornecendo um melhor suporte de ferramentas.
-   Fetch API: Para realizar solicitações HTTP à API back-end, oferecendo uma forma moderna e padronizada de realizar operações de rede.
-   Vitest: Uma biblioteca de testes de unidade extremamente rápida e poderosa, que aproveita a infraestrutura e as vantagens do Vite. Ela fornece uma API compatível com o Jest, incluindo recursos comuns como mocking, snapshots e cobertura de código.

## Consequências

A pilha front-end escolhida oferece diversos benefícios:
- Os tempos rápidos de compilação e a substituição de módulo em tempo real do Vite aumentarão a produtividade do desenvolvedor e permitirão uma experiência de desenvolvimento tranquila.
- A arquitetura baseada em componentes do React permitirá a reutilização de código, facilitando a manutenção e a expansão da aplicação.
- A tipagem estática do TypeScript ajudará a identificar erros durante o desenvolvimento, melhorará a qualidade do código e fornecerá um melhor suporte de ferramentas.
- A Fetch API fornece uma forma moderna e padronizada de realizar solicitações HTTP, permitindo uma comunicação perfeita com a API back-end.

Também existem algumas compensações a serem consideradas:
- A curva de aprendizado para React e TypeScript pode ser mais acentuada para desenvolvedores que não estão familiarizados com essas tecnologias.
- O uso de recursos JavaScript modernos e da Fetch API pode exigir a inclusão de polyfills ou fallbacks adicionais para compatibilidade com navegadores mais antigos.

## Alternativas

As pilhas de tecnologias alternativas consideradas foram:
- Angular: Embora o Angular seja um framework abrangente com um ecossistema forte, optamos pelo React devido à sua simplicidade e facilidade de uso para este projeto.
- Vue.js: O Vue.js é outro framework JavaScript popular que oferece funcionalidades semelhantes ao React. No entanto, escolhemos o React devido à sua comunidade maior e ecossistema mais rico, que está mais alinhado com nossos requisitos de projeto.
- Jest: Uma biblioteca de testes de JavaScript amplamente adotada pela comunidade. Embora tenha sido considerada como uma opção alternativa, decidimos usar o Vitest devido à sua integração nativa com o Vite e ao seu desempenho superior, além de ser uma tecnologia nova.

## Decisões Relacionadas
[Faça referência a quaisquer decisões arquiteturais relacionadas que tenham sido tomadas no projeto. Se não houver dependências diretas de outras decisões, esta seção pode ser omitida.]

## Referências

- Documentação do Vite: [https://vitejs.dev/](https://vitejs.dev/)
- Documentação do React: [https://reactjs.org/](https://reactjs.org/)
- Documentação do TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- Documentação do Fetch API: [https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- Documentação do Vitest: [https://vitejs.dev/](https://vitest.dev/)
