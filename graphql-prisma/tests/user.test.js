import { getFirstName, isValidPassword } from '../src/utils/user';
test('Should return first name when given full name', () => {
    const firstName = getFirstName('Misael Burboa');
    expect(firstName).toBe('Misael');
});

test('Should return first name when given first name', () => {
    const firstName = getFirstName('Misael');
    expect(firstName).toBe('Misael');
});

test('Should reject password shorter than 8 characters', () => {
    const validPassword = isValidPassword('abc123');
    expect(validPassword).toBe(false);
});

test('Should reject password that contains word password', () => {
    const isValid = isValidPassword('abcPassword');
    expect(isValid).toBe(false);
});

test('Should correctly validate a valid password', () => {
    const isValid = isValidPassword('abc123def');
    expect(isValid).toBe(true);
});