import { Component, OnInit } from '@angular/core';
import {CommandesService} from '../../services/commandes.service';
import {FournisseursService} from '../../services/fournisseurs.service';
import {ArticlesService} from '../../services/articles.service';
import {ClientService} from '../../services/client.service';
import {Commande} from '../../models/Commande.models';
import {Fournisseur} from '../../models/Fournisseur.models';
import {Article} from '../../models/Article.models';
import {Client} from '../../models/Client.models';
import {ChartType, LegendItem} from '../../lbd/lbd-chart/lbd-chart.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  commandeCount = 0;
  fournisseurCount = 0;
  articleCount = 0;
  clientCount = 0;

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];

  constructor(public commandeService: CommandesService,
              public fournisseurService: FournisseursService,
              public articleService: ArticlesService,
              public clientService: ClientService) { }

  ngOnInit(): void {
    this.commandeService.count().subscribe(
        (commandes: Commande[]) => {
          this.commandeCount = commandes.length;
        }
    );
    this.fournisseurService.count().subscribe(
        (fournisseurs: Fournisseur[]) => {
          this.fournisseurCount = fournisseurs.length;
        }
    );
    this.articleService.count().subscribe(
        (articles: Article[]) => {
          this.articleCount = articles.length;
        }
    );
    this.clientService.count().subscribe(
        (clients: Client[]) => {
          this.clientCount = clients.length;
        }
    );

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      ]
    };

    this.hoursChartOptions = {
      low: 0,
      high: 800,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      showLine: false,
      showPoint: false,
    };
    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
  }

}
