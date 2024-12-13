import { render, screen, fireEvent } from '@testing-library/react';
import SelectedFilters from '../SelectedFilters';

describe('SelectedFilters component', () => {
  const mockHandleRemoveFilter = jest.fn();
  const mockHandleClearFilters = jest.fn();

  it('calls handleRemoveFilter when the close button is clicked on filter chip', () => {
    const mockAppliedFilters = { brand: ['Toyota'] };
    const mockPriceFilter = { min: 50000, max: 150000 };

    render(
      <SelectedFilters
        appliedFilters={mockAppliedFilters}
        priceFilter={mockPriceFilter}
        handleRemoveFilter={mockHandleRemoveFilter}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    fireEvent.click(screen.getByLabelText('Remove filter Toyota'));
    expect(mockHandleRemoveFilter).toHaveBeenCalledWith('brand', 'Toyota');
  });

  it('calls handleClearFilters when the "Limpiar filtros" button is clicked', () => {
    const mockAppliedFilters = { brand: ['Toyota'] };
    const mockPriceFilter = { min: 50000, max: 150000 };

    render(
      <SelectedFilters
        appliedFilters={mockAppliedFilters}
        priceFilter={mockPriceFilter}
        handleRemoveFilter={mockHandleRemoveFilter}
        handleClearFilters={mockHandleClearFilters}
      />
    );

    fireEvent.click(screen.getByText('Limpiar filtros'));
    expect(mockHandleClearFilters).toHaveBeenCalled();
  });
});