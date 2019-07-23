import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FeaturedComponent } from "./featured.component";
import { Pagina1Component } from "./Pagina1/pagina1.component";
import { Pagina2Component } from "./Pagina2/pagina2.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        FeaturedComponent,
        Pagina1Component,
        Pagina2Component, 
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
