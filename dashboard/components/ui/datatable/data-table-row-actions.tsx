'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps {
  row: Row<any>;
  onPressEdit?: () => void;
  onPressView?: () => void;
  onPressDelete?: (id: string) => void;
  id?: string;
  items?: React.ReactNode | React.ReactNode[]
}

export function DataTableRowActions({
  row,
  onPressEdit,
  onPressView,
  onPressDelete,
  id='',
  items,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={onPressEdit}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={onPressView}>Ver</DropdownMenuItem>
        {items}
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onPressDelete && onPressDelete(id)}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
