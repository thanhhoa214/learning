import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BoxComponent } from './box/box.component';
import { TemplateComponent } from './template/template.component';
import { ProductListComponent } from './product-list/product-list.component';
import { createCustomElement } from '@angular/elements';

const components = [BoxComponent, TemplateComponent, ProductListComponent];
@NgModule({
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [TemplateComponent],
  declarations: components,
  entryComponents: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private _injector: Injector) {}

  ngDoBootstrap() {
    components.forEach((component, index) => {
      const element = createCustomElement(component, {
        injector: this._injector,
      });

      customElements.define('swd-' + index, element);
    });
  }
}
