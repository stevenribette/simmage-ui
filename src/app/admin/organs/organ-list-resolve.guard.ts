import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import '../../rxjs_operators';

import { OrganService } from '../../shared/organ.service';
import { DbOrganization } from '../../db-models/organ';

export class OrganListData {
  internal: DbOrganization[];
  external: DbOrganization[];
}

@Injectable()
export class OrganListResolve implements Resolve<OrganListData[]> {

  constructor(private organService: OrganService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return Observable.zip(
      this.organService.loadOrganizations(true),
      this.organService.loadOrganizations(false),
      (internal: DbOrganization[], external: DbOrganization[]) => ({
        internal: internal,
        external: external
      }));
  }
}
