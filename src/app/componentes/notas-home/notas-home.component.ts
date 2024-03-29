import { Component, OnInit } from '@angular/core';
import { NotasHttpService } from 'src/app/services/httpService/notas/notas-http.service';
import { Nota } from '../../models/nota';
import { first } from 'rxjs';

@Component({
  selector: 'app-notas-home',
  templateUrl: './notas-home.component.html',
  styleUrls: ['./notas-home.component.css']
})
export class NotasHomeComponent implements OnInit {

  notas: Nota[] = []

  constructor(private serviceHttp: NotasHttpService) { }

  ngOnInit(): void {
    this.obterListaNotas();
  }

  private obterListaNotas() {
    this.serviceHttp.selecionarTodos(false)
      .pipe(
        first()
      )
      .subscribe((dados) => {
        this.notas = dados;
      });
  }
}
