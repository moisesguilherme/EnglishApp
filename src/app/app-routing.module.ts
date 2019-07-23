import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FeaturedComponent } from "./featured.component";
import { Pagina1Component } from "./Pagina1/pagina1.component";
import { Pagina2Component } from "./Pagina2/pagina2.component";

const routes: Routes = [
    { path: "", redirectTo: "/featured", pathMatch: "full" },
    { path: "featured", component: FeaturedComponent },
    { path: "pagina1", component: Pagina1Component },
    { path: "pagina2", component: Pagina2Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
