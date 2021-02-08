import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


export interface Item {
  nome: string;
  unidade: string;
  quantidade: number;
  preco: number;
  isPerecivel: boolean;
  dataValidade: Date;
  dataFabricacao: Date;
}


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})

@Injectable()
export class ListItemComponent implements OnInit {

  // key that is used to access the data in local storageconst

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,    
    @Inject(DOCUMENT) private _document: Document,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['nome', 'unidade', 'quantidade', 'preco', 'isPerecivel', 'dataValidade', 'dataFabricacao', 'editar', 'excluir'];
  dataSource = this.getDataSource(this.storage);

  getDataSource(storage) {
    let jsonKeys = Object.keys(storage.storage);
    let jsonList = [];
    jsonKeys.forEach(key => {
       jsonList.push(this.storage.get(key));
    });
    return jsonList;
  }

  deleteItem(item) {
    if (window.confirm("Deseja excluir o registro de nome " + item.nome + "?")) {
      try {
        this.storage.remove(item.id);
        alert("Registro " + item.nome + " excluído com sucesso");
        this._document.defaultView.location.reload();
      } catch (error) {
        alert("Registro " + item.nome + " não excluido" + error);
      }
    }
  }

  editItemRedirect(item) {
    this.router.navigate(['/new-item', {id:item.id} ]);
  }

  novoItem() {
    this.router.navigate(['/new-item']);
  }

}
