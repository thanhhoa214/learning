import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';
import { TokenService } from 'src/app/token.service';
import { AccountReadDto } from 'src/generated';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';
interface TreeNode {
  name: string;
  icon: string;
  children?: TreeNode[];
  route?: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  treeData = [];
  selectedNode: TreeNode;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const account: AccountReadDto = this.accountService.getAccount();

    if (account.roleId === 1) {
      this.treeData = [
        {
          name: 'Templates',
          route: '/templates',
          icon: 'web',
        },
        {
          name: 'Screens',
          route: '/screens',
          icon: 'cast',
        },
        {
          name: 'Displays',
          route: '/displays',
          icon: 'screen_share',
        },
        {
          name: 'Products',
          route: '/products',
          icon: 'view_list',
        },
      ];
    } else if (account.roleId === 3) {
      this.treeData = [
        {
          name: 'Templates',
          route: '/templates',
          icon: 'web',
        },
        {
          name: 'Stores',
          route: '/stores',
          icon: 'storefront',
        },
        {
          name: 'Accounts',
          route: '/accounts',
          icon: 'account_circle',
        },
      ];
    }
    this.selectedNode = this.treeData[0];
  }

  setSelectedNode(node: TreeNode): void {
    this.selectedNode = node;
  }

  hasSelectedChild(node: TreeNode): boolean {
    return node.children?.some((c) => c.route === this.selectedNode.route);
  }
  logout() {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'mat-snack-bar-success',
      data: { title: 'Success !', message: 'Logout successfully' },
    });
    this.tokenService.removeAccessToken();

    this.router.navigateByUrl('/auth');
  }
}
