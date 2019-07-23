import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
	selector: "Featured",
	moduleId: module.id,
	templateUrl: "./featured.component.html",
	styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions) {
	}

	ngOnInit(): void {
	}
}