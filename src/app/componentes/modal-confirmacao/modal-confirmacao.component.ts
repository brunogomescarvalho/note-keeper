import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css'],

})
export class ModalConfirmacaoComponent {

  @Input() titulo!: string
  @Input() msg!: string
  @Input() question?: string
  @Input() btnOk: string = 'ok'
  @Input() btnCancelar: string = 'cancel'

  constructor(public activeModal: NgbActiveModal) {
  }



}


