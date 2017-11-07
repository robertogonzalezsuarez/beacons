import { Component } from '@angular/core';

import { RewardsPage } from '../rewards/rewards';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RewardsPage;
  tab3Root = ContactPage;
  tab4Root = HomePage;

  constructor() {

  }
}
