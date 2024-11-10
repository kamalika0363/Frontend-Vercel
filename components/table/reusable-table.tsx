import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from '@nextui-org/react';
import {ChevronUpIcon, ChevronDownIcon} from '@radix-ui/react-icons';

interface Column {
    key: any;
    label: string;
    sortable?: boolean;
}

type CustomSortDescriptor = {
    column: any;
    direction: "ascending" | "descending";
};

interface ReusableTableProps {
    columns: Column[];
    items: any[];
    selectedKeys: Set<React.Key>;
    handleSelectionChange: (keys: Set<React.Key>) => void;
    sortDescriptor: CustomSortDescriptor;
    setSortDescriptor: (descriptor: CustomSortDescriptor) => void;
    renderCell: (item: any, columnKey: string) => React.ReactNode;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
                                                         columns,
                                                         items,
                                                         selectedKeys,
                                                         handleSelectionChange,
                                                         sortDescriptor,
                                                         setSortDescriptor,
                                                         renderCell
                                                     }) => {
    return (
        <Table
            aria-label="Order history table with pagination"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            sortDescriptor={sortDescriptor}
            onSortChange={(descriptor: CustomSortDescriptor) => setSortDescriptor(descriptor)}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        allowsSorting={column.sortable}
                    >
                        {column.label}
                        {column.sortable && column.key === sortDescriptor.column && (
                            sortDescriptor.direction === "ascending" ? (
                                <ChevronUpIcon className="ml-1 hidden"/>
                            ) : (
                                <ChevronDownIcon className="inline ml-1"/>
                            )
                        )}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey: any) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};


export default ReusableTable;
