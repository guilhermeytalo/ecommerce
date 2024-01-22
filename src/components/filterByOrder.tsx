import { filterOptions, orderOptions } from '@/data/data';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface FilterByOrderProps {
  value: string;
  order: string;
  onChangeOrder: (value: string) => void;
  onChange: (value: string) => void;
}

export function FilterByOrder({ value, order, onChange, onChangeOrder }: FilterByOrderProps) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? filterOptions.find((options) => options.value === value)?.label
              : 'Selecione um filtro...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput className="h-9" />
            <CommandEmpty>Sem filtros correspondentes</CommandEmpty>
            <CommandGroup>
              {filterOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.icon && (
                    <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      { (value === 'price' || value === 'date') && (
        <Popover open={open2} onOpenChange={setOpen2}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open2}
              className="w-[200px] justify-between"
            >
              {order
                ? orderOptions.find((options) => options.value === order)?.label
                : 'Selecione um filtro...'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput className="h-9" />
              <CommandEmpty>Sem filtros correspondentes</CommandEmpty>
              <CommandGroup>
                {orderOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChangeOrder(currentValue);
                      setOpen2(false);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        order === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ) }
    </>
  );
}
