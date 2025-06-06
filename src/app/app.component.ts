import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductComparatorComponent } from "./components/product-comparator.component"


@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ProductComparatorComponent],
  template: `
    <div class="app">
      <!-- <app-product-showcase></app-product-showcase> -->
      <app-product-comparator></app-product-comparator>
    </div>
  `,
  styles: [
    `
    .app {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
  `,
  ],
})
export class AppComponent {
  title = "angular-product-showcase"
}
