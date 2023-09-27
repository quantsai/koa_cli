const REGS = {
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    username: /^[a-zA-Z][a-zA-Z0-9_.]*$/,
    password: /^[A-Za-z\d@_!#$%]{6,20}$/,
};

export default REGS;
