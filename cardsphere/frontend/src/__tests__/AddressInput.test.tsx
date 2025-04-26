import { render, screen, fireEvent } from '@testing-library/react';
import AddressInput from '../components/AddressInput';

describe('AddressInput Component', () => {
  const mockOnAddressChange = jest.fn();
  const validAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const invalidAddress = '0x123';

  beforeEach(() => {
    mockOnAddressChange.mockClear();
  });

  test('renders with default props', () => {
    render(<AddressInput onAddressChange={mockOnAddressChange} />);
    
    expect(screen.getByPlaceholderText('Enter Ethereum address')).toBeInTheDocument();
    expect(screen.getByText('Wallet Address')).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    const customPlaceholder = 'Custom placeholder';
    const customLabel = 'Custom label';
    
    render(
      <AddressInput
        onAddressChange={mockOnAddressChange}
        placeholder={customPlaceholder}
        label={customLabel}
      />
    );
    
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  test('validates valid address on input', () => {
    render(<AddressInput onAddressChange={mockOnAddressChange} />);
    const input = screen.getByPlaceholderText('Enter Ethereum address');
    
    fireEvent.change(input, { target: { value: validAddress } });
    fireEvent.blur(input);
    
    expect(screen.getByText(`Valid address: ${validAddress.slice(0, 6)}...${validAddress.slice(-4)}`)).toBeInTheDocument();
    expect(mockOnAddressChange).toHaveBeenCalledWith(validAddress, true);
  });

  test('shows error for invalid address', () => {
    render(<AddressInput onAddressChange={mockOnAddressChange} />);
    const input = screen.getByPlaceholderText('Enter Ethereum address');
    
    fireEvent.change(input, { target: { value: invalidAddress } });
    fireEvent.blur(input);
    
    expect(screen.getByText('Please enter a valid Ethereum address')).toBeInTheDocument();
    expect(mockOnAddressChange).toHaveBeenCalledWith(invalidAddress, false);
  });

  test('initializes with valid initial value', () => {
    render(
      <AddressInput
        onAddressChange={mockOnAddressChange}
        initialValue={validAddress}
      />
    );
    
    expect(screen.getByDisplayValue(validAddress)).toBeInTheDocument();
    expect(mockOnAddressChange).toHaveBeenCalledWith(validAddress, true);
  });
}); 