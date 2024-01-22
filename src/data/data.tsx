import {
  CalendarDaysIcon,
  CreditCardIcon
} from 'lucide-react';

export const filterOptions = [
  {
    value: 'price',
    label: 'Preço',
    icon: CreditCardIcon,
  },
  {
    value: 'date',
    label: 'Data',
    icon: CalendarDaysIcon,
  },
];

export const orderOptions = [
  {
    value: 'asc',
    label: 'Crescente',
  },
  {
    value: 'desc',
    label: 'Decrescente',
  },
]
