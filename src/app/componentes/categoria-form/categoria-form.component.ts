import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, first } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaHttpService } from 'src/app/services/httpService/categoria/categoria-http.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria!: Categoria;
  editar = false;

  constructor(
    private service: CategoriaHttpService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categoria = new Categoria();
  }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];

    if (id) {
      this.service.buscarPorId(id)
        .pipe(first()).subscribe(dados => {
          this.categoria = dados;

          this.editar = true;
        })
    }

  }

  onSubmit() {

    let observable = new Observable<Categoria>();

    if (this.categoria.id)
      observable = this.service.editar(this.categoria)
    else
      observable = this.service.cadastrar(this.categoria!)

    observable.pipe(first())
      .subscribe((dados: Categoria) => {
        this.toast.success(`Categoria ${dados.nome} ${(this.categoria.id ? 'editada' : 'cadastrada')} com sucesso`, "Sucesso");
        this.router.navigate(['categorias/listar'])
      })

  }

  voltar() {
    this.router.navigate(['listar'], { relativeTo: this.route.parent })
  }
}

