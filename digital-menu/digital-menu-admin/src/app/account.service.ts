import { Injectable } from '@angular/core';
import { AccountReadDto } from 'src/generated';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getAccount(): AccountReadDto {
    return JSON.parse(localStorage.getItem('accountInfor') ?? '{}');
  }
  setAccount(account: AccountReadDto): void {
    localStorage.setItem('accountInfor', JSON.stringify(account));
  }
}
