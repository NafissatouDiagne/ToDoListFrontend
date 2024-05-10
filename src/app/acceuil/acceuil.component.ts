import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  afficher:boolean=false;
  taches:any=''
  terminer:number=0
  allTaches:any[]=[]

  listes=[
    {
      id:0,
      name:"Aujourd'hui",
      bgcolor:'blue',
      icon:'book',
      end:this.terminer

    },
    {
      id:1,
      name:"Taches Terminer",
      bgcolor:'yellow',
      icon:'book'

    }, {
      id:2,
      name:"Taches En Cours",
      bgcolor:'red',
      icon:'book'

    }, {
      id:3,
      name:"Tous",
      bgcolor:'green',
      icon:'book',
      end:this.allTaches.length

    },
  ]
  formatDate(date: string): string {
    return date.split('T')[0]; // Renvoie uniquement la date sans les heures
  }

  formatTime(time: string): string {
    return time.split('T')[1].split(':')[0] + ':' + time.split('T')[1].split(':')[1];
    // Renvoie uniquement l'heure et les minutes sans les secondes
  }
  names: string[] = [''];
  newTaches={
   title:'',
   name:'',
   dateEnd:'',
   hour:'',

  }
 today=Date.now();

  addNewNameField() {
    this.names.push('');
  }


  addNameField(event: any, index: number) {
    if (index === this.names.length - 1 && event.target.value !== '') {
      this.addNewNameField();
    }
  }
  constructor(private apiservices:ApiService){}
  ngOnInit(): void {
this.loadAllTasks();
      this.apiservices.getAlltache().subscribe((response)=>{
        this.allTaches=response.all;
        return this.allTaches;
      })
  }
  Affich(i:number){
this.afficher=true;
this.taches=this.allTaches[i];
console.log('this.taches[i]', this.taches)
  }

  SubmitTaches(form:NgForm){
    console.log('this.newTaches', this.newTaches)


    this.apiservices.postTache(this.newTaches).subscribe((response)=>{
      console.log('taches ajouter avec  succes',response)
      this.apiservices.getAlltache().subscribe((response)=>{
        this.allTaches=response.all;
        return this.allTaches;
      })
    },
    (error)=>{
  console.log('error', error)
    }
  )
}
delete(id:number){
  this.apiservices.delTaches(id).subscribe((response)=>{
    console.log('response:', response);
    this.afficher=false;
    const completedTasks = JSON.parse(localStorage.getItem('terminer') || '[]');
      const index = completedTasks.indexOf(id);
      if (index > -1) {
        completedTasks.splice(index, 1); // Supprime l'ID de la tâche terminée du stockage local
      }
      localStorage.setItem('terminer', JSON.stringify(completedTasks));
     this.loadAllTasks()
    this.apiservices.getAlltache().subscribe((response)=>{
      this.allTaches=response.all;
      return this.allTaches;
    })
  },(error)=>{
    console.log('error', error)
  });
}
loadAllTasks(): void {
  this.apiservices.getAlltache().subscribe((response) => {
    this.allTaches = response.all;


    this.terminer = JSON.parse(localStorage.getItem('terminer') || '[]').length;

    // Mettre à jour le nombre de tâches d'aujourd'hui
    const today = new Date();
    const todayTasks = this.allTaches.filter((task: any) => {
      return new Date(task.dateEnd).toDateString() === today.toDateString();
    });

    // Mettre à jour le nombre de tâches d'aujourd'hui dans la catégorie "Aujourd'hui"
    this.listes[0].end = todayTasks.length;
    this.listes[1].end= this.terminer;
this.listes[2].end=this.allTaches.length- todayTasks.length;

    // Mettre à jour le nombre de tâches dans la catégorie "Tous"
    this.listes[3].end = this.allTaches.length;

  }, (error) => {
    console.error('Erreur lors du chargement des tâches:', error);
  });
}


}
