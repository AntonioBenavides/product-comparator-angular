# Comparador de Produtos - Angular

## 📋 Sobre o Projeto

Este é um aplicativo de comparação de produtos desenvolvido em Angular. Permite aos usuários comparar diferentes produtos lado a lado, visualizando suas especificações, preços e avaliações para tomar decisões de compra mais informadas.

O comparador apresenta uma interface intuitiva com visualização em cards e tabela, permitindo selecionar até 4 produtos para comparação simultânea.

## ✨ Demonstração

## 🚀 Tecnologias Utilizadas

- **Angular 16+** - Framework front-end
- **TypeScript** - Linguagem de programação
- **RxJS** - Biblioteca para programação reativa
- **Angular Standalone Components** - Componentes independentes sem módulos
- **CSS3** - Estilização avançada
- **Responsive Design** - Layout adaptável para dispositivos móveis

## 🔥 Funcionalidades

- **Comparação Visual** - Compare até 4 produtos simultaneamente
- **Visualização em Cards** - Visualize produtos em formato de cards
- **Visualização em Tabela** - Compare especificações técnicas em formato tabular
- **Seleção de Produtos** - Selecione quais produtos deseja comparar
- **Cálculo de Descontos** - Visualize preços originais e com desconto
- **Detalhes do Vendedor** - Informações sobre o vendedor de cada produto
- **Especificações Técnicas** - Compare características técnicas lado a lado
- **Design Responsivo** - Funciona em dispositivos desktop e móveis
- **Fallback de Dados** - Usa dados mockados quando a API não está disponível

## 📦 Requisitos

- Node.js 14.x ou superior
- npm 6.x ou superior
- Angular CLI 16.x ou superior

## 🛠️ Instalação e Configuração

### Clonando o Repositório

```bash
cd product-comparator-angular
```

### Instalando Dependências

```bash
npm install
```

### Executando o Projeto

```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200/`.

### Configurando a API

Por padrão, o aplicativo tenta se conectar a uma API em `http://localhost:8080/api/products/all`. 

Para usar sua própria API:

1. Edite o arquivo `src/app/services/product.service.ts`
2. Altere a URL da API conforme necessário:

```typescript
private apiUrl = 'http://localhost:8080/api/products/all'; // Altere para sua URL
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── product-comparator/
│   │       ├── product-comparator.component.ts
│   │       ├── product-comparator.component.html
│   │       └── product-comparator.component.css
│   ├── models/
│   │   └── product.interface.ts
│   ├── services/
│   │   └── product.service.ts
│   └── app.component.ts
├── assets/
│   └── produtos.json (opcional)
└── main.ts
```

## 🔌 API e Backend

### Formato de Dados

A API deve retornar um array de produtos no seguinte formato:

```json
[
  {
    "id": "product-id",
    "name": "Nome do Produto",
    "imageUrl": "url-da-imagem",
    "description": "Descrição do produto",
    "price": 1299.00,
    "discount": 5,
    "installments": 10,
    "freeShipping": true,
    "rating": {
      "rate": 4.9,
      "count": 254
    },
    "specs": {
      "battery": "6h (30h com estojo)",
      "bluetooth": "5.3",
      "waterproof": "IPX4"
    },
    "vendor": {
      "vendorName": "Nome do Vendedor",
      "vendorCategory": "OFICIAL",
      "vendorSales": 1000
    }
  }
]
```

### Configuração CORS no Backend (Para facilitar incluí a annotation @CrossOrigin(origins = ["*"]), não havendo necessidade de executar este passo.)

Se estiver usando Spring Boot, adicione a seguinte configuração para permitir requisições CORS:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## ⚠️ Troubleshooting

### Erro de CORS

Se você encontrar erros como `Http failure response: 0 undefined`, isso geralmente indica um problema de CORS.

**Solução:**
1. Configure o CORS no seu backend (veja a seção acima)
2. Verifique se o servidor está rodando
3. Confirme se a URL da API está correta

### API Não Disponível

O aplicativo usa dados mockados como fallback quando a API não está disponível.

Para usar apenas dados locais:
1. Crie um arquivo `produtos.json` na pasta `assets`
2. Adicione seus produtos no formato JSON especificado acima
3. Modifique o `ProductService` para carregar do arquivo local:

```typescript
getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>('/assets/produtos.json');
}
```

## 🔧 Personalização

### Alterando o Número Máximo de Produtos para Comparação

No arquivo `product-comparator.component.ts`, altere a propriedade `maxComparison`:

```typescript
maxComparison = 4; // Altere para o número desejado
```

### Alterando o Tema de Cores

As cores principais estão definidas no arquivo CSS do componente. Você pode alterá-las para personalizar o tema:

```css
.header-section {
  background: linear-gradient(135deg, #ffd700, #ffed4e); /* Altere para suas cores */
}

.btn-buy {
  background: #007bff; /* Cor principal dos botões */
}
```

## 📈 Melhorias Futuras

- [ ] Implementar filtros de produtos
- [ ] Adicionar sistema de favoritos
- [ ] Implementar busca de produtos
- [ ] Adicionar mais campos de comparação
- [ ] Implementar paginação para grandes listas de produtos
- [ ] Adicionar animações de transição
- [ ] Implementar tema escuro

## 📞 Contato

Para questões ou sugestões, entre em contato:

- Email: antonio.benavides.dias@gmail.com

---

Desenvolvido com ❤️ por Antonio Benavides

