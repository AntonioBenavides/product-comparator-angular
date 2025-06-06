import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-product-comparator',
  standalone: true,
  //imports: [CommonModule, HttpClientModule],
  imports: [CommonModule],
  templateUrl: './product-comparator.component.html',
  styleUrls: ['./product-comparator.component.css'],
  providers: [ProductService]
})
export class ProductComparatorComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  viewMode: 'cards' | 'table' = 'cards';
  activeTab: 'resumen' | 'especificaciones' | 'medios' = 'especificaciones';
  maxComparison = 4;
  loading = true;
  error = '';

  // Dados mockados para demonstração
  private mockProducts: Product[] = [
    {
      id: "airpods-pro-2",
      name: "Teste Mockado",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Cancelamento ativo de ruído, som imersivo e modo ambiente adaptativo.",
      price: 1299.00,
      discount: 5,
      installments: 10,
      freeShipping: true,
      rating: {
        rate: 4.9,
        count: 254
      },
      specs: {
        battery: "6h (30h com estojo)",
        bluetooth: "5.3",
        waterproof: "IPX4"
      },
      vendor: {
        vendorName: "Apple",
        vendorCategory: "OFICIAL",
        vendorSales: 1000
      }
    },
    {
      id: "galaxy-buds2-pro",
      name: "Samsung Galaxy Buds2 Pro",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Som Hi-Fi, ANC inteligente e design ergonômico.",
      price: 899.00,
      discount: 6,
      installments: 5,
      freeShipping: true,
      rating: {
        rate: 4.8,
        count: 2541
      },
      specs: {
        battery: "5h (18h com estojo)",
        bluetooth: "5.3",
        waterproof: "IPX7"
      },
      vendor: {
        vendorName: "Samsung",
        vendorCategory: "OFICIAL",
        vendorSales: 10000
      }
    },
    {
      id: "sony-wf-1000xm5",
      name: "Sony WF-1000XM5",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Melhor cancelamento de ruído do mercado com áudio Hi-Res.",
      price: 1499.00,
      discount: 5,
      installments: 10,
      freeShipping: true,
      rating: {
        rate: 4.6,
        count: 1300
      },
      specs: {
        battery: "8h (24h com estojo)",
        bluetooth: "5.3",
        waterproof: "IPX4"
      },
      vendor: {
        vendorName: "Sony",
        vendorCategory: "OFICIAL",
        vendorSales: 2003
      }
    },
    {
      id: "jbl-live-free-nc",
      name: "JBL Live Free NC+",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Tecnologia JBL Signature Sound e cancelamento ativo de ruído.",
      price: 599.00,
      discount: 8,
      installments: 5,
      freeShipping: true,
      rating: {
        rate: 4.8,
        count: 2288
      },
      specs: {
        battery: "7h (21h com estojo)",
        bluetooth: "5.1",
        waterproof: "IPX7"
      },
      vendor: {
        vendorName: "JBL",
        vendorCategory: "OFICIAL",
        vendorSales: 3003
      }
    },
    {
      id: "anker-soundcore-liberty-4",
      name: "Anker Soundcore Liberty 4",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Áudio espacial e monitoramento de frequência cardíaca.",
      price: 799.00,
      discount: 2,
      installments: 5,
      freeShipping: true,
      rating: {
        rate: 4.5,
        count: 22
      },
      specs: {
        battery: "9h (28h com estojo)",
        bluetooth: "5.3",
        waterproof: "IPX4"
      },
      vendor: {
        vendorName: "Tecno Shop",
        vendorCategory: "MERCADO LÍDER",
        vendorSales: 3003
      }
    },
    {
      id: "beats-fit-pro",
      name: "Beats Fit Pro",
      imageUrl: "/placeholder.svg?height=120&width=120",
      description: "Chip Apple H1, ANC e som poderoso com encaixe seguro.",
      price: 1199.00,
      discount: 17,
      installments: 10,
      freeShipping: true,
      rating: {
        rate: 4.8,
        count: 22
      },
      specs: {
        battery: "6h (24h com estojo)",
        bluetooth: "5.0",
        waterproof: "IPX4"
      },
      vendor: {
        vendorName: "Tecno Shop",
        vendorCategory: "MERCADO LÍDER",
        vendorSales: 3003
      }
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    // Tentar carregar do JSON primeiro, se falhar usar dados mockados
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.selectedProducts = products.slice(0, this.maxComparison);
        this.loading = false;
      },
      error: (error) => {
        console.warn('Erro ao carregar produtos do JSON, usando dados mockados:', error);
        // Usar dados mockados como fallback
        this.products = this.mockProducts;
        this.selectedProducts = this.mockProducts.slice(0, this.maxComparison);
        this.loading = false;
      }
    });
  }

  toggleProductSelection(product: Product): void {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else if (this.selectedProducts.length < this.maxComparison) {
      this.selectedProducts.push(product);
    }
  }

  isProductSelected(product: Product): boolean {
    return this.selectedProducts.some(p => p.id === product.id);
  }

  calculateDiscountedPrice(product: Product): number {
    return product.price * (1 - product.discount / 100);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  generateStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }

  setViewMode(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }

  setActiveTab(tab: 'resumen' | 'especificaciones' | 'medios'): void {
    this.activeTab = tab;
  }
}