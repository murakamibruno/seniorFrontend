import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { v4 as uuidv4 } from 'uuid';


enum UnidadeType {
  Litro = 'Litro',
  Quilograma = 'Kg',
  Unidade = 'Unidade'
}



@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})

@Injectable()
export class NewItemComponent implements OnInit {

  item = {id: '', nome: '', unidade:'', quantidade:'', preco: '', isPerecivel: false, dataValidade:'', dataFabricacao: ''};

  // Make a variable reference to our Enum
  eUnidadeType = UnidadeType;
  isSaving = false;
  itemJson = {};

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editItem(params.id);
   });
  }

  formPersistence(itemForm) {
    if(this.checkFormValid(itemForm) && this.checkFabricationDate()) {
      this.checkValidateDate();
      this.storeOnLocalStorage(itemForm);
      itemForm.reset();
    }
  }

  checkFabricationDate() {
    if (this.item.isPerecivel && new Date(this.item.dataValidade) < new Date(this.item.dataFabricacao)) {
      alert('Data de fabricação não pode ser maior que a data de validade');
      return false;
    } else {
      return true;
    }
  }

  checkValidateDate() {
    let currentDate = new Date();
    if (new Date(this.item.dataValidade) < currentDate) {
      alert('O produto ' + this.item.nome + " se encontra com validade vencida");
    }
  }

  checkFormValid(itemForm) {
    if(itemForm.valid) {
      return true;
    } else {
      alert('Form não é válido');
      return false;
    }
  }

  editItem(id) {
    if (id) {
      this.item = this.storage.get(id);
    }
  }


  saveItem(itemForm:NgForm) {
    if (this.getIsSaving()) {
      this.formPersistence(itemForm);
    } else {
      this.router.navigate(['/list-item'])
    }
  }

  setIsSaving(isSaving:boolean) {
    this.isSaving = isSaving;
  }

  getIsSaving() {
    return this.isSaving;
  }

  public storeOnLocalStorage(itemForm): void {
          
    if (!this.item.id) { // insert uuid no registro
      this.item.id = uuidv4();
    }
    try {
      this.storage.set(this.item.id, this.item);
      alert("Registro " + this.item.nome + " cadastrado com sucesso");
    } catch (error) {
      alert("Registro " + this.item.nome + " cadastrado sem sucesso" + error);
    }
  }

  
}
