function validateEmail(email) {
    if (!email) return false;
    const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailPattern.test(email);
}

test('رفض الإيميل الفارغ', () => {
    expect(validateEmail('')).toBe(false);
});

test('تقبل الإيميل الصحيح', () => {
    expect(validateEmail('test@example.com')).toBe(true);
});

test('رفض الإيميل بدون @', () => {
    expect(validateEmail('testexample.com')).toBe(false);
});

function validatePassword(password) {
    if (!password) return false;
    return password.length >= 6;
}

test('تُرفض كلمة مرور أقل من 6 أحرف ', () => {
    expect(validatePassword('12345')).toBe(false);
});

test('تٌقبل كلمة مرور 6 أحرف أو أكثر ', () => {
    expect(validatePassword('123456')).toBe(true);
});
