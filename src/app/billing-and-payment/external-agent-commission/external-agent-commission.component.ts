import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-external-agent-commission',
  templateUrl: './external-agent-commission.component.html',
  styleUrls: ['./external-agent-commission.component.css']
})
export class ExternalAgentCommissionComponent implements OnInit {

  rows: any = [];
  columns: any = [];
  statusCheck2:any={};
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
    addNewCommsion2(statusCheck ) {
      // this.statusCheck = check;
      // this.router.navigateByUrl('/new-commission');
      this.router.navigate(['/new-commission'], { queryParams: { statusCheck: statusCheck  }  });
  
    };
  

}
