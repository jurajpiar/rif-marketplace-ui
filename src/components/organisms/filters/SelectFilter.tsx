import React from 'react';
import { Accordion } from 'rifui';
import FilterCheckboxCard from 'rifui/components/molecules/FilterCheckboxCard';
import { LabeledCheckboxProps } from 'rifui/components/molecules/LabeledCheckbox';

export interface SelectFilterProps {
    className?: string;
    title: string;
    items: LabeledCheckboxProps[];
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SelectFilter = ({ className = '', title, ...rest }: SelectFilterProps) => {
    return <Accordion
        id={title.toLocaleLowerCase()}
        className={`${title} ${className}`}
        expanded={true}
        title={title}>
        <FilterCheckboxCard {...rest} />
    </Accordion>
}

export default SelectFilter;