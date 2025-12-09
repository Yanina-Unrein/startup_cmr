import { Component } from '@angular/core';
import { Header } from "@/app/layout/header/header";
import { Navbar } from "@/app/shared/components/navbar/navbar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Header, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {

}
