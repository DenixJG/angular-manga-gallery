import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/interfaces/Dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    dashboardInfo: Dashboard;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.dashboardService.getDashboardInfo().subscribe(
            (res) => {
                this.dashboardInfo = res;
                console.log(this.dashboardInfo);
            },
            (err) => console.log(err)
        );
    }
}
