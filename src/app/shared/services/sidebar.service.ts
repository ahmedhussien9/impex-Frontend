import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ICONS } from '../constants';

export interface NavItem {
  icon?: string;
  route?: string;
  nameDictionary: {
    ar: string;
    en: string;
  };
  children?: NavItem[];
  isExpand?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isFilterOpen = new Subject();

  navItems: NavItem[] = [
    {
      icon: ICONS.contract,
      nameDictionary: {
        ar: 'أصول ومصارف الوقف',
        en: 'Endowment assets and banks',
      },
    },
    {
      icon: ICONS.pieChart,
      nameDictionary: {
        ar: 'الاستثمارات الوقفية',
        en: 'Endowment investment',
      },
      children: [
        {
          route: 'endowment-investment/endowment-report',
          nameDictionary: {
            ar: 'تقرير قسائم الوقف',
            en: 'Endowment vouchers ',
          },
        },
        {
          route: 'endowment-investment/revenue-report',
          nameDictionary: {
            ar: 'تقرير الإيرادات',
            en: 'Revenue report',
          },
        },
      ],
    },
    {
      icon: ICONS.mosque,
      nameDictionary: {
        ar: 'إدارة المساجد',
        en: 'Mosques management report',
      },
      children: [
        {
          route: 'mosque-management',
          nameDictionary: {
            ar: 'تقرير المساجد',
            en: 'Mosques management report',
          },
        },
        {
          route: 'mosque-management/qualified-workers',
          nameDictionary: {
            ar: 'العاملون وفق المؤهلات العلمية',
            en: 'Qualified workers',
          },
        },
        {
          route: 'mosque-management/mosque-statistics',
          nameDictionary: {
            ar: 'احصائيات المساجد حسب السعة',
            en: 'Mosques statistics by capacity',
          },
        },
      ],
    },
    {
      icon: ICONS.email,
      nameDictionary: {
        ar: 'نظام التراسل الإلكتروني',
        en: 'Email system',
      },
      children: [
        {
          route: 'users-report',
          nameDictionary: {
            ar: 'تقرير المستخدمين',
            en: 'Users report',
          },
        },
        {
          route: 'users-report/messages-by-users',
          nameDictionary: {
            ar: 'الرسائل حسب المستخدمين',
            en: 'Messages by users',
          },
        },
        {
          route: 'email-system',
          nameDictionary: {
            ar: 'تقرير نظام التراسل الإلكتروني',
            en: 'Email system reports',
          },
        },
      ],
    },
  ];

  constructor() {}
}
